import { useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import {handleAddressTyping} from './handleAddressTyping';

export function getNFTs() {
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [nftDataObjects, setNftDataObjects] = useState([]);
  const { userAddress, setUserAddress, handleUserAddressChange, isValidAddress } = handleAddressTyping();
  const [nftCache, setNftCache] = useState({});
  const [isError, setIsError] = useState(false);

  async function fetchNFTs(connectedAddress, selectedNetwork) {

    // Check if data is already in local cache
    const cacheKey = `${selectedNetwork}-${userAddress}`;
    if (cacheKey in nftCache) {
      // console.log("Data already in local cache")
      setResults(nftCache[cacheKey].data);
      setNftDataObjects(nftCache[cacheKey].tokenData);
      setHasQueried(true);
      setIsError(false);
      // console.log(cacheKey)
      return;
    }

    const config = {
      apiKey: import.meta.env.ALCHEMY_API_KEY,
      network: selectedNetwork,
    };

    const alchemy = new Alchemy(config);
    
    try {

      const data = 
        userAddress === ''
          ? await alchemy.nft.getNftsForOwner(connectedAddress)
          : await alchemy.nft.getNftsForOwner(userAddress);
      setResults(data);
      // console.log("Getting:", selectedNetwork)
      // console.log("NFTs fetched!")

      const tokenDataObjects = await fetchTokenDataObjects(data.ownedNfts, alchemy.nft);
      setNftDataObjects(tokenDataObjects);
      setHasQueried(true);
      setIsError(false);
      
        // Save data in local cache
        setNftCache(prevCache => ({
          ...prevCache,
          [cacheKey]: {
            data,
            tokenData: tokenDataObjects,
          },
        }));
      } catch (error) {
        console.log('Error while fetching NFTs:', error);
        setHasQueried(true);
        setIsError(true);
      }
    }

    async function fetchTokenDataObjects(ownedNfts, nftService) {
      const tokenDataPromises = ownedNfts.map((nft) =>
        nftService.getNftMetadata(nft.contract.address, nft.tokenId)
      );
      return await Promise.all(tokenDataPromises);
    }
  

  return {
    userAddress,
    setUserAddress,
    handleUserAddressChange,
    results,
    setResults,
    hasQueried,
    setHasQueried,
    nftDataObjects,
    fetchNFTs,
    isValidAddress,
    isError
  };
}
