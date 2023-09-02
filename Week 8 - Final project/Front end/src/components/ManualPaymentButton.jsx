import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';

function ManualPaymentButton({ handlePayManually, isProcessing }) {
  return (
    <Box>
      <Button className='button big-button' onClick={handlePayManually} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Manually'}
      </Button>
    </Box>
  );
}

export default ManualPaymentButton;