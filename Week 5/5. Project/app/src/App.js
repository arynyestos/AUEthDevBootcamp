import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import getContractAddresses from './getContractAddresses';
import EscrowJSON from './artifacts/contracts/Escrow.sol/Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(); 
  const [deployedContracts, setDeployedContracts] = useState([]);  
  const [isFetchingContracts, setIsFetchingContracts] = useState(false);  
  const escrowContractABI = EscrowJSON.abi;
  const [depositor, setDepositor] = useState('');
  const [isValidDepositor, setIsValidDepositor] = useState(false);
  const [beneficiary, setBeneficiary] = useState('');
  const [isValidBeneficiary, setIsValidBeneficiary] = useState(false);
  const [arbiter, setArbiter] = useState('');
  const [isValidArbiter, setIsValidArbiter] = useState(false);
  const [weiValue, setWeiValue] = useState();
  const [ethValue, setEthValue] = useState('');
  const [isValidEthValue, setIsValidEthValue] = useState(false);
  const [isGoerliSelected, setIsGoerliSelected] = useState(false);
  const isValidEthereumAddress = (address) => {
    const regex = /^0x([A-Fa-f0-9]{40})$/;
    return regex.test(address);
  };

  const isValidEthereumAmount = (amount) => {
    const regex = /^[0-9]+([.][0-9]+)?$/;
    return regex.test(amount);
  };

  useEffect(() => {
      const checkNetwork = async () => {
        const provider = window.ethereum;
        const chainId = "0x5"; // Goerli chain ID
        const selectedChainId = await provider.request({
          method: "eth_chainId"
        });
    
        if (selectedChainId !== chainId) {
            setIsGoerliSelected(false);
          } else {
          setIsGoerliSelected(true);
        }
      };

    checkNetwork();
    window.ethereum.on("chainChanged", checkNetwork);
  }, []);

  useEffect(() => {
    async function switchNetwork(){
      if (window.ethereum.networkVersion !== "5") { // If MM selected network is not Goerli
        setIsGoerliSelected(false);
        const result = await window.ethereum.request({ // null if the request was successful, an error otherwise
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
        // Si el usuario rechaza la solicitud, result.error será una cadena con un mensaje de error
        if (result !== null) {
            console.log('Resultado: ', result);
            setIsGoerliSelected(false);
          } else {
            setIsGoerliSelected(true);
            console.log('Cambio a Goerli correcto')  
          }
         
        } else {
          console.log('La red ya era Goerli')  
        setIsGoerliSelected(true);
      }
    }

    switchNetwork();
    // window.ethereum.on("chainChanged", switchNetwork);
  }, [depositor, account]);
  

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      // console.log(accounts[0]);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
      // await checkNetwork();
    }

    window.ethereum.on("accountsChanged", getAccounts);
    getAccounts();
  }, []);

  useEffect(() => {
    console.log('Depositor changed to', depositor)
    if(depositor !== '' && isGoerliSelected){
      setIsFetchingContracts(true)
      async function fetchContractAddresses() {
        // const contractAddresses = await getContractAddresses(await signer.getAddress());
      try {
        const contractAddresses = await getContractAddresses(depositor);
        return contractAddresses;
      } catch (error) {
          // console.error('Error fetching contract addresses:', error);
          // console.log(`Retrying in 0.5 seconds...`);
          // await new Promise(resolve => setTimeout(resolve, 0.5 * 1000));
          // return fetchContractAddresses();
        }
      }
  
      console.log("Let's fetch those contracts!")
      fetchContractAddresses().then(async contractAddresses => {
        console.log('Inside then...')
          const contracts = await Promise.all(contractAddresses.map(async contractAddress => {
            if(isGoerliSelected){
            const contract = new ethers.Contract(contractAddress, escrowContractABI, provider);
            const arbiter = await contract.arbiter();
            const beneficiary = await contract.beneficiary();
            const balance = await provider.getBalance(contractAddress);
            console.log('Fetched...', contract)
            return { contract, arbiter, beneficiary, balance };
            }
          }));
        
      setDeployedContracts(contracts);
      // await checkNetwork();
      });
    }
  // }, [signer, escrowContractABI]);
  }, [depositor, weiValue, isGoerliSelected]);
  
  useEffect(() => {
    console.log("Deployed contracts:", deployedContracts)
    async function listContracts() {
      const escrowList = deployedContracts.map(({ contract, arbiter, beneficiary, balance }) => ({
        address: contract.address,
        arbiter,
        beneficiary,
        value: balance.toString(),
        handleApprove: async () => {
          contract.on('Approved', () => {
            document.getElementById(contract.address).className =
              'complete';
            document.getElementById(contract.address).innerText =
              "✓ It's been approved!";
          });
    
          await approve(contract, signer);
        }
      }));
      
      setEscrows(escrowList);      
      // setEscrows([...escrows, escrowList]);   //Esto por algún extraño motivo da error Uncaught Error: invalid BigNumber value 
 
    }

    listContracts();
    setIsFetchingContracts(false)
  // }, [signer, deployedContracts, account]);
  }, [deployedContracts, isGoerliSelected]);

  useEffect(() => {
    // console.log("Depositor:", depositor)
    setIsValidDepositor(isValidEthereumAddress(depositor));
    setIsValidArbiter(isValidEthereumAddress(arbiter));
    setIsValidBeneficiary(isValidEthereumAddress(beneficiary));
    setIsValidEthValue(isValidEthereumAmount(ethValue));
  }, [depositor, arbiter, beneficiary, ethValue]);

  async function newContract() {
    
    const escrowContract = await deploy(signer, arbiter, beneficiary, weiValue);
    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: weiValue.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      }
    };

    setEscrows([...escrows, escrow]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setWeiValue(ethers.utils.parseEther(ethValue).toBigInt());
  };

  useEffect(() => {
    newContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weiValue]);

  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "10vh", marginTop: "0.5rem"  }}>
      <h1 className="centerTitle">Escrow contract dApp</h1>
      {!isGoerliSelected && (
        <span style={{ display: "block", color: "red", fontSize: "1rem", marginTop: "0rem" }}>
          Switch to Goerli to use dApp
        </span>
      )}
    </div>
    <div className="columns-container">
      <div className="contract">
        <h1> Contract deployer </h1>

        <label> 
          Depositor Address
          <input 
          type="text" placeholder="0x..."
          id="depositor"  
          autoComplete='on'        
          onChange={(e) => isValidEthereumAddress(e.target.value) ?  setDepositor(e.target.value) : null} /> 
          {depositor.toLowerCase() !== account.toLowerCase() && depositor !== '' && (
            <span style={{ display: "block", color: "red", fontSize: "0.6rem" }}>
              Switch to depositor wallet to deploy
            </span>
          )}
        </label>
      </div>

      <div className="contract">
        <h1> New contract </h1>

        <form autoComplete='on' onSubmit={handleSubmit}>
          <label>
            Arbiter address
            <input
              type="text" id="arbiter" placeholder="0x..."
              value={arbiter}
              onChange={(e) => setArbiter(e.target.value)}
            />
          </label>

          <label>
            Beneficiary address
            <input
              type="text" id="beneficiary" placeholder="0x..."
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
            />
            {beneficiary === arbiter && beneficiary !== '' && (
              <span style={{ display: "block", color: "red", fontSize: "0.7rem" }}>
                Cannot be the same as arbiter
              </span>
            )}
          </label>          

          <label>
            Deposit amount (in ETH)
            <input
              type="text" id="eth"
              value={ethValue}
              onChange={(e) => setEthValue(e.target.value)}
            />
          </label> 

          <button
            className="button"
            type="submit"
            id="deploy"
            disabled={
              !isValidDepositor || 
              !isValidArbiter || 
              !isValidBeneficiary || 
              !isValidEthValue || 
              arbiter === beneficiary || 
              arbiter === depositor || 
              depositor.toLowerCase() !== account.toLowerCase() ||
              !isGoerliSelected
            }
          >
            Deploy 
          </button> 
        </form>
      </div>
      <div className="existing-contracts-box">
        <h1> Escrow contracts </h1>
            {!isFetchingContracts && depositor === '' && (deployedContracts.length === 0 || !escrows.some(escrow => escrow.value > 0)) && <label>Input depositor address to view contracts</label>}
            {!isFetchingContracts && depositor !== '' && (deployedContracts.length === 0 || !escrows.some(escrow => escrow.value > 0)) && isGoerliSelected && <label>No contracts to approve</label>}
            {!isFetchingContracts && depositor !== '' && (deployedContracts.length === 0 || !escrows.some(escrow => escrow.value > 0)) && !isGoerliSelected && <label>Wrong network</label>}
            {isFetchingContracts && <label>Fetching contracts...</label>}
            {!isFetchingContracts && deployedContracts.length > 0 && escrows.some(escrow => escrow.value > 0) && <label>Connect arbiter wallet to approve</label>}

        <div className={!isFetchingContracts && deployedContracts.length > 0 && escrows.some(escrow => escrow.value > 0) ? "existing-contracts" : ""}>
          <div id="container">
            {!isFetchingContracts && escrows.map((escrow) => {
              return escrow.value > 0 ? (
                <Escrow 
                  key={escrow.address} 
                  connectedAccount={account}
                  isGoerliSelected={isGoerliSelected}
                  {...escrow} 
                />) : null;
            })}
          </div>
        </div>
      </div>
    </div>
    </> 
  );
}

export default App; 
