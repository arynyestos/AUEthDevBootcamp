import React, { useState } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';

function DeregisterWorkerForm({ handleDeregisterWorker, isProcessing }) {
  const [workerAddress, setWorkerAddress] = useState('');

  return (
    <>
        <Text align="center" fontWeight="bold" fontSize="xl" mb={4} mt="11px">
            Remove employee from the contract
        </Text>
        <Box className='container' style={styles.container}>
        <Input
            className='input'
            placeholder="Worker Ethereum Address"
            value={workerAddress}
            onChange={(e) => setWorkerAddress(e.target.value)}
        />
        <Button
            className='button'
            style={styles.button}
            onClick={() => handleDeregisterWorker(workerAddress)}
            disabled={isProcessing}
        >
            {isProcessing ? 'Processing...' : 'Remove Worker'}
        </Button>
        </Box>
    </>
    );
}

const styles = {
  container: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
  },
};

export default DeregisterWorkerForm;