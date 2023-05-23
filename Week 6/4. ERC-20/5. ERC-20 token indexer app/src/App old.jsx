import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Select,
  Text,
} from '@chakra-ui/react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

let provider = null;
let isEthereumSupported = false;
if (window.ethereum) { 
  provider = new ethers.providers.Web3Provider(window.ethereum);
  isEthereumSupported = true;
  console.log(isEthereumSupported)
}

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(Network.ETH_MAINNET);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true); 
  const [tokenCache, setTokenCache] = useState({});


  useEffect(() => {
    if(isEthereumSupported){
      async function getAccounts() {
        try {
          const accounts = await provider.send('eth_requestAccounts', []);
          console.log(accounts[0]);
          setConnectedAccount(accounts[0]);
        } catch (error) {
          console.log("Account fetching failed:", error);
        }
      }
      window.ethereum.on("accountsChanged", getAccounts);
      getAccounts();
    }
  }, []);
  
  async function resolveENSName(name) {
    try {
      const config = {
        apiKey: import.meta.env.ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET
      };
      const alchemy = new Alchemy(config);
      // const resolved = await provider.resolveName(name);
      const resolved = await alchemy.core.resolveName(name);
      console.log("Resolved:", resolved)
      return resolved;
    } catch (error) {
      console.log('Error resolving ENS name:', error);
      return null;
    }
  }
  
  async function getTokenBalance() {
    
    // Check if data is already in local cache
    const cacheKey = `${selectedNetwork}-${userAddress}`;
    if (cacheKey in tokenCache) {
      console.log("Data already in local cache")
      setResults(tokenCache[cacheKey].data);
      setTokenDataObjects(tokenCache[cacheKey].tokenData);
      setHasQueried(true);
      return;
    }

    try {

      if (userAddress !== "" && !ethers.utils.isAddress(userAddress)) {
        setIsValidAddress(false);
        return;
      } else setIsValidAddress(true);

      const config = {
        apiKey: import.meta.env.ALCHEMY_API_KEY,
        network: selectedNetwork
        // network: Network.ETH_GOERLI,
      };
      const alchemy = new Alchemy(config);
      const data = userAddress === "" ? await alchemy.core.getTokenBalances(connectedAccount) : await alchemy.core.getTokenBalances(userAddress);

      setResults(data);

      const tokenDataPromises = [];

      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
      }

      setTokenDataObjects(await Promise.all(tokenDataPromises));
      setHasQueried(true);

      // Save data in local cache
      setTokenCache(prevCache => ({
        ...prevCache,
        [cacheKey]: {
          data,
          tokenData: tokenDataObjects,
        },
      }));

    } catch (error) {
      console.log("Error while fetching token balances:", error);
    }
  }

  return (
    <Box w="100vw">
      <Center>
        <Box
          position="absolute"
          top={4} // Ajustamos la posición superior
          right={4} // Ajustamos la posición derecha
          zIndex={1} // Ajustamos el índice de apilamiento para que esté por encima del contenido principal
        >
          <Flex alignItems="center" mt={2}>
            <Text mr={2}>Network:</Text>
            <Select
              value={selectedNetwork} 
              onChange={(e) => setSelectedNetwork(e.target.value)} 
              width="200px"
              fontSize={16}  
              css={{
                // Ocultar la segunda flecha hacia abajo
                '&::-webkit-select-more-button': {
                  display: 'none',
                },
              }}
            >
              <option value={Network.ETH_MAINNET}>Ethereum</option>
              <option value={Network.ARB_MAINNET}>Arbitrum</option>
              <option value={Network.MATIC_MAINNET}>Polygon</option>
              <option value={Network.OPT_MAINNET}>Optimism</option>
              <option value={Network.POLYGONZKEVM_MAINNET}>Polygon ZKEVM</option>
              <option value={Network.ETH_GOERLI}>Ethereum Goerli</option>
            </Select>
          </Flex>
        </Box>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address to see all of its ERC-20
            token balances! Default search is connected wallet!
          </Text>
        </Flex>
      </Center>
      {!isEthereumSupported && (
        <Box p={4} bg="yellow.200" color="red" textAlign="center">
          <Text>
            No wallet extensions installed. Please install MetaMask or any other to use the full
            functionality of this application.
          </Text>
        </Box>
      )}
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>
        <Input
          onChange={async (e) => {
            const enteredAddress = e.target.value;
            const resolvedAddress = await resolveENSName(enteredAddress);
            setUserAddress(resolvedAddress || enteredAddress);
          }}
          // onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
          placeholder={connectedAccount}
        />
        <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue" disabled={!isEthereumSupported}>
          Check ERC-20 Token Balances
        </Button>
        {!isValidAddress && (
          <Box p={4} bg="yellow.200" color="red" textAlign="center">
            <Text>
              Please, input a valid address.
            </Text>
          </Box>
        )}

        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <SimpleGrid w={'90vw'} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={'column'}
                  color="white"
                  bg="blue"
                  w={'20vw'}
                  h={'20vw'}
                  key={e.id}                  
                  alignItems="center"
                >
                  <Box>
                    <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {(Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals) > 1000000 ||
                      (Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals) < 0.0001 &&
                      Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals) > 0)) && parseFloat(
                      Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      )
                    ).toExponential(2)}

                    {Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      ).toString().length <= 10 && Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      )}

                    {(Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals) < 1000000 &&
                      Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals) > 0.0001) && 
                      Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      ).toString().length > 8 && Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      ).substring(0, 8)}
                  </Box>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    h="100%"
                  >
                    <Image src={tokenDataObjects[i].logo} w="70%" h="70%"/>
                  </Flex>
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;
