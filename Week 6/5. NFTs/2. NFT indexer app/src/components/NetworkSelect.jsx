import React from 'react';
import { Flex, Select, Text, Box } from '@chakra-ui/react';
import { Network } from 'alchemy-sdk';

const NetworkSelect = ({ selectedNetwork, onChange }) => {
  return (
    <Box
      position="absolute"
      top={4} // Ajustamos la posición superior
      right={4} // Ajustamos la posición derecha
      zIndex={1} // Ajustamos el índice de apilamiento para que esté por encima del contenido principal
    >
      <Flex alignItems="center" mt={2}>
        <Text mr={2}>Network:</Text>
        <Select
          value={selectedNetwork}
          onChange={(e) => onChange(e.target.value)}
          width="200px"
          fontSize={16}
          css={{
            '&::-webkit-select-more-button': {
              display: 'none',
            },
          }}
        >
          <option value={Network.ETH_MAINNET}>Ethereum</option>
          <option value={Network.ARB_MAINNET}>Arbitrum</option>
          <option value={Network.MATIC_MAINNET}>Polygon</option>
          <option value={Network.OPT_MAINNET}>Optimism</option>
          {/* <option value={Network.POLYGONZKEVM_MAINNET}>Polygon ZKEVM</option> */}
          <option value={Network.ETH_GOERLI}>Ethereum Goerli</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default NetworkSelect;
