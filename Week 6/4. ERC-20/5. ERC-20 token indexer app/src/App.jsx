import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import NetworkSelect from './components/NetworkSelect';
import TokenBalanceList from './components/TokenBalanceList';
import TokenSearchInput from './components/TokenSearchInput';
import getProvider from './utils/ethersProvider';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

let provider = null;
let isEthereumSupported = false;
if (window.ethereum) { 
  provider = getProvider();
  isEthereumSupported = true;
  console.log(isEthereumSupported)
}

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState(Network.ETH_MAINNET);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [tokenCache, setTokenCache] = useState({});
  const [userAddress, setUserAddress] = useState('');
  const [hasQueried, setHasQueried] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [results, setResults] = useState([]);
  const [stateCacheKey, setStateCacheKey] = useState('');

  useEffect(() => {
    console.log(stateCacheKey)
    if (stateCacheKey in tokenCache) {
      console.log("Estaba en cache!!")
      getTokenBalance();
      setIsQuerying(false);
      setHasQueried(true);
    }
  }, [stateCacheKey]);

  useEffect(() => {
    if(userAddress === ""){
      setStateCacheKey(`${selectedNetwork}-${connectedAccount}`);
    } else {
      setStateCacheKey(`${selectedNetwork}-${userAddress}`);
    }
  }, [selectedNetwork]);

  const handleNetworkChange = (network) => {
    setHasQueried(false); // Restablecer hasQueried a false al cambiar la red
    setSelectedNetwork(network);
  };  

  useEffect(() => {
    if (provider) {
      async function getAccounts() {
        try {
          const accounts = await provider.send('eth_requestAccounts', []);
          console.log(accounts[0]);
          setConnectedAccount(accounts[0]);
        } catch (error) {
          console.log('Account fetching failed:', error);
        }
      }
      window.ethereum.on('accountsChanged', getAccounts);
      getAccounts();
    }
  }, []);

  const resolveENSName = async (name) => {
    console.log("En App.jsx:", name);
    try {
      const config = {
        apiKey: import.meta.env.ALCHEMY_API_KEY,
        network: selectedNetwork,
      };
      const alchemy = new Alchemy(config);
      const resolved = await alchemy.core.resolveName(name);
      if(ethers.utils.isAddress(resolved)){
        setUserAddress(resolved);
      } else {
        setUserAddress(name);
      }
    } catch (error) {
      console.log('Error resolving ENS name:', error);
    }
  };

  const getTokenBalance = async () => {
    const cacheKey = userAddress === ''
    ? `${selectedNetwork}-${connectedAccount}`
    : `${selectedNetwork}-${userAddress}`;
    console.log("En getTokenBalance:", cacheKey);
    setStateCacheKey(cacheKey);
    if (cacheKey in tokenCache) {
      console.log('Data already in local cache');
      console.log('Cache:', tokenCache[cacheKey])
      setResults(tokenCache[cacheKey].data);
      setTokenDataObjects(tokenCache[cacheKey].tokenDataObjects);
      setIsQuerying(false);
      setHasQueried(true);
      return;
    }

    setIsQuerying(true);

    try {
      if (userAddress !== '' && !ethers.utils.isAddress(userAddress)) {
        setIsValidAddress(false);
        return;
      } else setIsValidAddress(true);

      const config = {
        apiKey: import.meta.env.ALCHEMY_API_KEY,
        network: selectedNetwork,
      };
      const alchemy = new Alchemy(config);
      const data =
        userAddress === ''
          ? await alchemy.core.getTokenBalances(connectedAccount)
          : await alchemy.core.getTokenBalances(userAddress);

      setResults(data);

      const tokenDataPromises = [];

      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
      }

      Promise.all(tokenDataPromises)
      .then((resolvedTokenDataObjects) => {
        setTokenDataObjects(resolvedTokenDataObjects);
        setIsQuerying(false);
        setHasQueried(true);
    
        setTokenCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: {
            data,
            tokenDataObjects: resolvedTokenDataObjects,
          },
        }));
      })      
      .catch((error) => {
        console.log('Error while fetching token metadata:', error);
      });
    } catch (error) {
      console.log('Error while fetching token balances:', error);
    }
  };

  return (
    <Box w="100vw">
        <Center>
          <NetworkSelect
            selectedNetwork={selectedNetwork}
            onChange={handleNetworkChange}
          />
              <Header isEthereumSupported={isEthereumSupported} />
        </Center>
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TokenSearchInput
            onType={resolveENSName}
            onSearch={getTokenBalance}
            connectedAccount={connectedAccount}
            isValidAddress={isValidAddress}
            isEthereumSupported={isEthereumSupported}
          />
          <TokenBalanceList
            results={results}
            tokenDataObjects={tokenDataObjects}
            isQuerying={isQuerying}
            hasQueried={hasQueried}
          />
        </Flex>
    </Box>
  );
}

export default App;
