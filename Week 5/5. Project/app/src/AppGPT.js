import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import getContractAddresses from './getContractAddresses';
import EscrowJSON from './artifacts/contracts/Escrow.sol/Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

//ESTO ESTÁ PROBADO Y FUNCIONA
// let connectedAddress = ''
// let contractAddresses = [];
// let depositors = [];
// let arbiters = [];
// let beneficiaries = [];
// let weiValues = [];

// async function fetchContractAddresses(connectedAddress) {
//   console.log(await provider.getSigner().getAddress())
//   connectedAddress = await provider.getSigner().getAddress();
//   contractAddresses = await getContractAddresses(connectedAddress);
//   console.log(contractAddresses);
// }

// fetchContractAddresses().then(() => {
//   const escrowContractABI = EscrowJSON.abi;

//   Promise.all(contractAddresses.map(async contractAddress => {
//     const contract = new ethers.Contract(contractAddress, escrowContractABI, provider);

//     depositors.push(connectedAddress)
//     arbiters.push(await contract.arbiter());
//     beneficiaries.push(await contract.beneficiary());
//     const balance = await provider.getBalance(contractAddress) 
//     weiValues.push(balance.toBigInt());
//     console.log('Depositors', depositors);
//     console.log('Arbiters', arbiters);
//     console.log('Beneficiaries', beneficiaries);
//     console.log('Balances', weiValues);
//   }));
// });

// ESTO ESTÁ SIN PROBAR
// async function listContracts() {
    
//   const escrowContract = await deploy(signer, arbiter, beneficiary, weiValue);
//   const escrow = {
//     address: escrowContract.address,
//     arbiter,
//     beneficiary,
//     value: weiValue.toString(),
//     handleApprove: async () => {
//       escrowContract.on('Approved', () => {
//         document.getElementById(escrowContract.address).className =
//           'complete';
//         document.getElementById(escrowContract.address).innerText =
//           "✓ It's been approved!";
//       });

//       await approve(escrowContract, signer);
//     },
//   };

//   setEscrows([...escrows, escrow]);
// }

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [allContractsFetched, setAllContractsFetched] = useState(false);
  const [deployedContracts, setDeployedContracts] = useState([]);
  const [weiValues, setWeiValues] = useState([]);
  
  const escrowContractABI = EscrowJSON.abi;

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, []);

  useEffect(() => {
    async function fetchContractAddresses() {
      const contractAddresses = await getContractAddresses(await signer.getAddress());
      console.log(contractAddresses);
      return contractAddresses;
    }

    fetchContractAddresses().then(async (contractAddresses) => {
      const contracts = await Promise.all(contractAddresses.map(async contractAddress => {
        const contract = new ethers.Contract(contractAddress, escrowContractABI, provider);
        const arbiter = await contract.arbiter();
        const beneficiary = await contract.beneficiary();
        const balance = await provider.getBalance(contractAddress);
        return { contract, arbiter, beneficiary, balance };
      }));

      setDeployedContracts(contracts);
      setWeiValues(contracts.map(c => c.balance));
      setAllContractsFetched(true);
    });
  }, [signer, escrowContractABI]);

  useEffect(() => {
    async function listContracts() {
      const escrows = deployedContracts.map(({ contract, arbiter, beneficiary, balance }, i) => ({
        address: contract.address,
        arbiter,
        beneficiary,
        value: weiValues[i].toString(),
        handleApprove: async () => {
          contract.on('Approved', () => {
            document.getElementById(contract.address).className =
              'complete';
            document.getElementById(contract.address).innerText =
              "✓ It's been approved!";
          });
    
          await approve(contract, signer);
        },
      }));

      setEscrows(escrows);      
    }

    if (allContractsFetched) {
      listContracts();
    }
  }, [allContractsFetched, deployedContracts, weiValues]);

  const handleNewContract = async (beneficiary, weiValue) => {
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
          'Approved';
        });
        await escrowContract.approve({gasLimit: 1000000});
        },
        handleReject: async () => {
        escrowContract.on('Rejected', () => {
        document.getElementById(escrowContract.address).className =
        'rejected';
        document.getElementById(escrowContract.address).innerText =
        'Rejected';
        });
        await escrowContract.reject({gasLimit: 1000000});
        },
        };
        setEscrows((prevEscrows) => [...prevEscrows, escrow]);
        };
        
        const handleInputChange = (event) => {
        setBeneficiaryAddress(event.target.value);
        };
        
        const handleValueChange = (event) => {
        setEscrowValue(event.target.value);
        };
        
        return (
        <div>
        <div className='title'>
        <h1>Escrow DApp</h1>
        </div>
        <div className='input-container'>
        <div className='input-item'>
        <label>Beneficiary Address:</label>
        <input type='text' onChange={handleInputChange} />
        </div>
        <div className='input-item'>
        <label>Escrow Value (in wei):</label>
        <input type='text' onChange={handleValueChange} />
        </div>
        <button onClick={() => handleNewContract(beneficiaryAddress, escrowValue)}>
        Create Escrow
        </button>
        </div>
        <div className='escrows-container'>
        {escrows.map((escrow, index) => (
        <div
        className={escrow ${escrow.approved ? 'complete' : escrow.rejected ? 'rejected' : ''}}
        id={escrow.address}
        key={index}>
        <p>Address: {escrow.address}</p>
        <p>Arbiter: {escrow.arbiter}</p>
        <p>Beneficiary: {escrow.beneficiary}</p>
        <p>Value: {escrow.value}</p>
        <button onClick={escrow.handleApprove}>Approve</button>
        <button onClick={escrow.handleReject}>Reject</button>
        </div>
        ))}
        </div>
        </div>
        );
        };
        
        export default App;
