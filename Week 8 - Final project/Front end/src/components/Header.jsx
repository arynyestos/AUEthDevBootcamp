import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex 
      width="70%"
      alignItems="center"
      flexDirection="column"
      backgroundColor="#878383" 
      color="white"             
      p={'0.25rem'}                     
      borderRadius="0.5rem"       
      boxShadow="md"            
      mb={'0.25rem'}
      mt={'3rem'}
    >
      {/* <Heading fontSize={'2.75rem'}> */}
      <Heading className="my-heading">
        SummerPay: Smart Temperature-Adjusted Payments System
      </Heading>
    </Flex>
  );
};

export default Header;
