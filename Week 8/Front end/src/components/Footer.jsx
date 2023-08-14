import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box width="100%" py={4} bg="gray.100">
      <Flex justifyContent="center" alignItems="center" maxW="1200px" mx="auto">
        <Image src="/logo-alchemy.png" alt="Alchemy Logo" height="80px" />
        <Image src="/logo-ethereum.png" alt="Ethereum Logo" height="80px" />
        <Image src="/logo-chainlink.png" alt="Chainlink Logo" height="80px" />
      </Flex>
    </Box>
  );
};

export default Footer;
