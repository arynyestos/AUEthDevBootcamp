import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Heading, SimpleGrid, Text, Spinner } from '@chakra-ui/react';
import { videoChecker } from '../utils/videoChecker';

function NFTGrid({ results, nftDataObjects, hasQueried, isError }) {
  const [isVideoMap, setIsVideoMap] = useState({});

  useEffect(() => {
    const checkVideoType = async (metaDataURL, isIPFSUrl) => {
      try {
        const url = isIPFSUrl ? `https://ipfs.io/ipfs/${metaDataURL.slice(7)}` : metaDataURL;
        const isVideo = await videoChecker(url);
        setIsVideoMap(prevState => ({
          ...prevState,
          [metaDataURL]: isVideo
        }));
      } catch (error) {
        console.error('Error checking file type:', error);
      }
    };

    if (results && results.ownedNfts) {
      results.ownedNfts.forEach((nft, i) => {
        const tokenData = nftDataObjects[i];
        const metaDataURL = tokenData?.rawMetadata?.image;
        const isIPFSUrl = metaDataURL && metaDataURL.startsWith('ipfs://');

        if (metaDataURL && !isVideoMap[metaDataURL]) {
          checkVideoType(metaDataURL, isIPFSUrl);
        }
      });      
    }
  }, [results, nftDataObjects]);

  const renderNFTs = () => {
    return (
      <SimpleGrid w="90vw" columns={4} spacing={24}>
        {results.ownedNfts.map((nft, i) => {
          const tokenData = nftDataObjects[i];
          const metaDataURL = tokenData?.rawMetadata?.image;
          const isIPFSUrl = metaDataURL && metaDataURL.startsWith('ipfs://');
          const isVideo = isVideoMap[metaDataURL] || false;

          return (
            <Flex flexDir="column" color="white" bg="blue" w="100%" h="100%" key={nft.contract.address + '-' + nft.tokenId}>
              <Box>
                <b>Name:</b>{' '}
                {tokenData?.title?.length === 0 ? 'No Name' : tokenData?.title}
              </Box>
              {isIPFSUrl ? (
                // Render IPFS image or video
                isVideo ? (
                  <video src={`https://ipfs.io/ipfs/${metaDataURL.slice(7)}`} controls autoPlay loop />
                ) : (
                  <img
                    src={`https://ipfs.io/ipfs/${metaDataURL.slice(7)}`}
                    alt="Image"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                )
              ) : (             
                // Render HTTPS image or video   
                isVideo ? (
                  <video src={metaDataURL || 'https://via.placeholder.com/200'} controls autoPlay loop />
                ) : (
                <Image
                  src={metaDataURL || 'https://via.placeholder.com/200'}
                  alt="Image"
                />
                )
              )}

            </Flex>
          );
        })}
      </SimpleGrid>
    );
  };

  const renderInitialMessage = () => {
    return (
      <Text>Please make a query! The query may take a few seconds...</Text>
    );
  };

  const renderNoneFound = () => {
    return (
      <Text>No NFTs were found for this address on this network.</Text>
    );
  };

  const renderLoading = () => {
    return (
      <>
        <Flex alignItems="center" justifyContent="center" height="150px">
          <Spinner
            className="loading-spinner"
            thickness='4px'
            speed='0.7s'
            color='blue.500'
            size='xl'
          />
        </Flex>
      </>
    );
  };

  return (
    <Flex w="100%" flexDirection="column" alignItems="center" justifyContent="center">
      <Heading my={36}>Here are your NFTs:</Heading>
      {isError ? (
        <Text>Error occurred while fetching NFTs. Please try again.</Text>
      ) : hasQueried ? (
        results.ownedNfts.length === 0 ? renderNoneFound() : renderNFTs()
      ) : (
        results.length === 0 ? renderInitialMessage() : renderLoading()
      )}
    </Flex>
  );
}

export default NFTGrid;
