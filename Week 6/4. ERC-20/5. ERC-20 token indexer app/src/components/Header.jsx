import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Header = ({ isEthereumSupported }) => {
  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <Heading mb={0} fontSize={36}>
        ERC-20 Token Indexer
      </Heading>
      <Text>
        Plug in an address or ENS to see all of its ERC-20 token balances! Default search is connected wallet!
      </Text>
      {!isEthereumSupported && (
      <Box p={4} bg="yellow.200" color="red" textAlign="center">
        <Text>
          No wallet extensions installed. Please install MetaMask or any other to use the full
          functionality of this application.
        </Text>
      </Box>
      )}
    </Flex>
  );
};

export default Header;
