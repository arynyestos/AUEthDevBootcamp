import React, { useState } from 'react';
import { Button, Input, Box, Text } from '@chakra-ui/react';

function RegisterWorkerForm({ handleRegisterWorker, isProcessing }) {
  const [workerAddress, setWorkerAddress] = useState('');
  const [city, setCity] = useState('');

  return (
    <Box m={4}>
        <Text align="center" fontWeight="bold" fontSize="xl" mb={'0.5rem'}>
            Register new employee with their Ethereum address and city
        </Text>
        <Box className='container' style={styles.container}>
          <Input
              className='input'
              placeholder="Worker Ethereum Address"
              value={workerAddress}
              onChange={(e) => setWorkerAddress(e.target.value)}
          />
          <Input
              className='input'
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
          />
          <Button
              className='button'
              style={styles.button}
              onClick={() => handleRegisterWorker(workerAddress, city)}
              disabled={isProcessing}
          >
              {isProcessing ? 'Processing...' : 'Register Worker'}
          </Button>
        </Box>
    </Box>
  );
}

const styles = {
  button: {
    padding: '0.7rem',
  },
};

export default RegisterWorkerForm;