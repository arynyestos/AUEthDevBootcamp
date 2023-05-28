import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import Header from './components/Header';
import NFTGrid from './components/NFTGrid';
import NFTSearchInput from './components/NFTSearchInput';
import NetworkSelect from './components/NetworkSelect';
import { getNFTs } from './utils/getNFTs';
import { selectNetwork } from './utils/selectNetwork';
import { useGetConnectedAddress } from './hooks/useGetConnectedAddress';
import { useEthereumProvider } from './hooks/useEthereumProvider';
import { useEffect } from 'react';

function App() {
  const connectedAddress = useGetConnectedAddress();
  useEffect(() => {
    setUserAddress(connectedAddress);
  }, [connectedAddress]);
  const { userAddress, setUserAddress, handleUserAddressChange, results, setResults, hasQueried, setHasQueried, nftDataObjects, fetchNFTs, isValidAddress, isError } = getNFTs();
  const { selectedNetwork, setSelectedNetwork, handleNetworkChange } = selectNetwork();
  const { provider } = useEthereumProvider();
  useEffect(() => {
    setHasQueried(false);
    setResults([]);
  }, [selectedNetwork]);

  return (
    <Box w="100vw">
      <NetworkSelect
        selectedNetwork={selectedNetwork}
        onChange={handleNetworkChange}
      />
      <Header isEthereumSupported={provider !== null} />
      <NFTSearchInput 
        onChange={(e) => handleUserAddressChange(e.target.value, connectedAddress)}
        onClick={() => {
          setHasQueried(false);
          fetchNFTs(connectedAddress, selectedNetwork)
        }}
        connectedAddress={connectedAddress} 
        isValidAddress={isValidAddress} />
      <NFTGrid results={results} nftDataObjects={nftDataObjects} hasQueried={hasQueried} isError={isError} />
    </Box>
  );
}

export default App;