import React from 'react';
import { Flex, Box, Grid, GridItem, Text } from '@chakra-ui/react';
import RegisterWorkerForm from './RegisterWorkerForm';
import DeregisterWorkerForm from './DeregisterWorkerForm';
import SetUpkeepForm from './SetUpkeepForm';
import ManualPaymentButton from './ManualPaymentButton';
import WithdrawEthButton from './WithdrawEthButton';
import { paymentsContractHandlers } from '../utils/paymentsContractHandlers';
import useLatestPayments from '../hooks/useLatestPayments';

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

  const latestPayments = useLatestPayments();

  return (
    <Flex width="70%" mt={'0.25rem'} p={'0.25rem'}  backgroundColor="#f5f5f5" borderRadius="8px" boxShadow="md" marginBottom="20px" justifyContent="center" alignItems="center">
      <Box width="100%" maxW="1200px" mt={'0.25rem'} p={'0.25rem'}  backgroundColor="#f5f5f5" borderRadius="20px" boxShadow="md" marginBottom="20px">
        <Grid templateColumns="repeat(2, 1fr)" gap={40} mt={'0.25rem'} height={'26rem'}>
          <GridItem style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Flex flexDirection="column" height={'15.5rem'}>
              <RegisterWorkerForm handleRegisterWorker={handleRegisterWorker} isProcessing={isProcessing} />
            </Flex>
            <Flex flexDirection="column" height={'10rem'}>
              <DeregisterWorkerForm handleDeregisterWorker={handleDeregisterWorker} isProcessing={isProcessing} />
            </Flex>
          </GridItem>
          <GridItem style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Flex flexDirection="row" justifyContent="space-evenly" alignItems="center" height={'15.5rem'}>
                  <ManualPaymentButton handlePayManually={handlePayManually} isProcessing={isProcessing} />     
                  <WithdrawEthButton handleWithdrawEth={handleWithdrawEth} isProcessing={isProcessing} />
              </Flex>
              <Flex flexDirection="column" height={'10rem'}>
                <SetUpkeepForm handleSetUpkeepAddress={handleSetUpkeepAddress} isProcessing={isProcessing} />
              </Flex>
          </GridItem>
        </Grid>
        <Flex flexDirection="column" height={'10rem'} mt={'2rem'}>
          <Text align="center" fontWeight="bold" fontSize="xl" mb={4}>Latest events</Text>
          <Box p={'0.25rem'}  borderWidth="10px" borderRadius="20px" overflowY="auto" height="100px" backgroundColor="white">
            {resultMessage && (
              <Text>{resultMessage}</Text>
            )}
            {latestPayments.map((payment, index) => (
              <Text key={index} mt={2}>{payment}</Text>
            ))}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );

};

export default Body;