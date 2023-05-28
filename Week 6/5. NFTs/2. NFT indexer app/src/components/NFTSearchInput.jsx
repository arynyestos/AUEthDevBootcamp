import React from 'react';
import { Input, Button, Flex, Heading, Box, Text } from '@chakra-ui/react';

// function NFTSearchInput({ onChange, onClick, connectedAddress, isValidAddress, isEthereumSupported }) {}
function NFTSearchInput({ onChange, onClick, connectedAddress, isValidAddress }) {
  return (
    <Flex w="100%" flexDirection="column" alignItems="center" justifyContent={'center'}>
      <Heading mt={42}>Get all the ERC-721 tokens of this address:</Heading>
      <Input
        onChange={onChange}
        color="black"
        w="600px"
        textAlign="center"
        p={4}
        bgColor="white"
        fontSize={24}
        placeholder={connectedAddress}
      />
      {/* <Button fontSize={20} onClick={onClick} mt={36} bgColor="blue" disabled={!isEthereumSupported}> */}
      <Button fontSize={20} onClick={onClick} mt={36} bgColor="blue" disabled={!isValidAddress}>
        Fetch NFTs
      </Button>
      {!isValidAddress && (
        <Box p={4} bg="yellow.200" color="red" textAlign="center">
          <Text>Please, input a valid address or ENS.</Text>
        </Box>
      )}
    </Flex>
  );
}

export default NFTSearchInput;
