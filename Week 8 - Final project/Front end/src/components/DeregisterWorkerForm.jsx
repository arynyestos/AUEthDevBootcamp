import React, { useState } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';

function DeregisterWorkerForm({ handleDeregisterWorker, isProcessing }) {
  const [workerAddress, setWorkerAddress] = useState('');

  return (
    <Box>
        <Text align="center" fontWeight="bold" fontSize="xl" mb={'0.5rem'}>
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
    </Box>
    // </>
    );
}

const styles = {
  button: {
    padding: '0.7rem',
  },
};

export default DeregisterWorkerForm;