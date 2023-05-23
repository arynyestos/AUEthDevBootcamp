import React, { useState } from 'react';
import { Input, Box, Button, Heading, Text } from '@chakra-ui/react';

const TokenSearchInput = ({ onType, onSearch, connectedAccount, isValidAddress, isEthereumSupported }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
    onType(event.target.value);
  };

  const handleSearch = () => {
    onSearch();
  };  
  

  return (
    <>
      <Heading mt={42}>
        Get all the ERC-20 token balances of this address:
      </Heading>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        color="black"
        w="600px"
        textAlign="center"
        p={4}
        bgColor="white"
        fontSize={24}
        placeholder={connectedAccount}
      />
      <Button fontSize={20} onClick={handleSearch} mt={36} bgColor="blue" disabled={!isEthereumSupported}>
        Check ERC-20 Token Balances
      </Button>
      {!isValidAddress && (
        <Box p={4} bg="yellow.200" color="red" textAlign="center">
          <Text>Please, input a valid address.</Text>
        </Box>
      )}
    </>
  );
};

export default TokenSearchInput;
