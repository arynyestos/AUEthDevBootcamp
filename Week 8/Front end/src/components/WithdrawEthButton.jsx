import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';

function WithdrawEthButton({ handleWithdrawEth, isProcessing }) {
  return (
    <Box>
      <Button className='button' style={styles.button} onClick={handleWithdrawEth} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Withdraw ETH'}
      </Button>
    </Box>
  );
}

const styles = {
  button: {
    height: '120px',
  },
}

export default WithdrawEthButton;