import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';

function WithdrawEthButton({ handleWithdrawEth, isProcessing }) {
  return (
    <Box>
      <Button className='button big-button' onClick={handleWithdrawEth} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Withdraw ETH'}
      </Button>
    </Box>
  );
}


export default WithdrawEthButton;