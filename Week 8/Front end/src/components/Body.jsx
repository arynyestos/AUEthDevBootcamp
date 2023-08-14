import React from 'react';
import { Flex, Box, Grid, GridItem, Text } from '@chakra-ui/react';
import RegisterWorkerForm from './RegisterWorkerForm';
import DeregisterWorkerForm from './DeregisterWorkerForm';
import SetUpkeepForm from './SetUpkeepForm';
import ManualPaymentButton from './ManualPaymentButton';
import WithdrawEthButton from './WithdrawEthButton';
import { paymentsContractHandlers } from '../utils/paymentsContractHandlers';

const Body = () => {
  const {
    isProcessing,
    resultMessage,
    handleRegisterWorker,
    handleDeregisterWorker,
    handleSetUpkeepAddress,
    handlePayManually,
    handleWithdrawEth
  } = paymentsContractHandlers();

  return (
    <Flex width="70%" mt={4} p={4} backgroundColor="#f5f5f5" borderRadius="8px" boxShadow="md" marginBottom="20px" justifyContent="center" alignItems="center">
      <Box width="90%" maxW="1200px" mt={4} p={4} backgroundColor="#f5f5f5" borderRadius="20px" boxShadow="md" marginBottom="20px">
        <Grid templateColumns="1fr 1fr" gap={40} align="flex-start">
          <GridItem>
              <Flex flexDirection="column" gap={4} justifyContent="center" alignItems="stretch" alignContent="space-between" padding="0px" mt="11px">
                <RegisterWorkerForm handleRegisterWorker={handleRegisterWorker} isProcessing={isProcessing} />
                <DeregisterWorkerForm handleDeregisterWorker={handleDeregisterWorker} isProcessing={isProcessing} />
              </Flex>
          </GridItem>
          <GridItem>
            <Flex flexDirection="column" gap={4} justifyContent="center" alignItems="stretch" alignContent="space-between" padding="0px" mt="10px">
              <Flex flexDirection="row" justifyContent="center" gap={60} alignItems="center" padding="50px" mt="10px" mb="-10px">
                <ManualPaymentButton handlePayManually={handlePayManually} isProcessing={isProcessing} />
                <WithdrawEthButton handleWithdrawEth={handleWithdrawEth} isProcessing={isProcessing} />
              </Flex>
              <SetUpkeepForm handleSetUpkeepAddress={handleSetUpkeepAddress} isProcessing={isProcessing} />
            </Flex>
          </GridItem>
        </Grid>
        <Text align="center" fontWeight="bold" fontSize="xl" mb={4}>Last transaction result</Text>
        <Box p={4} borderWidth="10px" borderRadius="20px" overflowY="auto" height="60px" backgroundColor="white">
          {resultMessage && (
            <Text>{resultMessage}</Text>
          )}
        </Box>
      </Box>

    </Flex>
  );
};

export default Body;