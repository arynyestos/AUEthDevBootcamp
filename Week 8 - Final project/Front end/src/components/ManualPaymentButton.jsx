import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';

function ManualPaymentButton({ handlePayManually, isProcessing }) {
  return (
    <Box>
      <Button className='button' style={styles.button} onClick={handlePayManually} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Manually'}
      </Button>
    </Box>
  );
}

const styles = {
    button: {
      height: '120px',
    },
}

export default ManualPaymentButton;