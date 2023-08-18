import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box width="100%" py={2}>
  <Flex justifyContent="center" alignItems="center" maxW="1200px" mx="auto">
    <Flex alignItems="center" justifyContent="center" flex={4}>
      <Image src="/logo-chainlink.png" alt="Chainlink Logo" height="4em" />
    </Flex>
    <Flex alignItems="center" justifyContent="center" flex={1}>
      <Image src="/logo-ethereum.png" alt="Ethereum Logo" height="4em" />
    </Flex>
    <Flex alignItems="center" justifyContent="center" flex={4}>
      <Image src="/logo-alchemy.png" alt="Alchemy Logo" height="4em" />
    </Flex>
  </Flex>
</Box>

  );
};

export default Footer;
