import React, { useState } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';

function SetUpkeepForm({ handleSetUpkeepAddress, isProcessing }) {
  const [upkeepAddress, setUpkeepAddress] = useState('');

  return (
    <>
        <Text align="center" fontWeight="bold" fontSize="xl" mb={4}>
            Set up Chainlink automation contract
        </Text>
        <Box className='container' style={styles.container}>
        <Input
            className='input'
            placeholder="Upkeep Contract Address"
            value={upkeepAddress}
            onChange={(e) => setUpkeepAddress(e.target.value)}
        />
        <Button
            className='button'
            style={styles.button}
            onClick={() => handleSetUpkeepAddress(upkeepAddress)}
            disabled={isProcessing}
        >
            {isProcessing ? 'Processing...' : 'Set Upkeep Contract'}
        </Button>
        </Box>
    </>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
  },
};

export default SetUpkeepForm;
