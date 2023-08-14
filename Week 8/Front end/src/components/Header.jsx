import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex 
      width="70%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor="#878383" 
      color="white"             
      p={4}                     
      borderRadius="8px"       
      boxShadow="md"            
      mb={4}              
    >
      <Heading fontSize={56}>
        Automatic Payments System Management App
      </Heading>
    </Flex>
  );
};

export default Header;
