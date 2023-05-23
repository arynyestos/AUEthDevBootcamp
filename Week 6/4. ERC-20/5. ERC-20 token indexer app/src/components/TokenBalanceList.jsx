import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import TokenBalanceCard from './TokenBalanceCard';

function TokenBalanceList({ results, tokenDataObjects, isQuerying, hasQueried }) {
  return (
    <>
      <Heading my={36}>ERC-20 token balances</Heading>
      <Box>
        {(!isQuerying && hasQueried) ? (
          <SimpleGrid w={'90vw'} columns={[2, 3, 6]} spacing={4}>
            {results.tokenBalances.map((tokenBalanceObject, i) => (
              <Flex
                key={tokenBalanceObject.id}
                flexDir="column"
                color="white"
                bg="blue"
                w="100%"
                h="100%"
                alignItems="center"
              >
                <TokenBalanceCard tokenData={tokenDataObjects[i]} tokenBalance={tokenBalanceObject.tokenBalance}/>  
              </Flex>
            ))}
          </SimpleGrid>
        ) : (isQuerying ? (
          <Text>Loading token balances. Please, wait...</Text>
        ) : (
          <Text>Please, make a query! This may take a few seconds...</Text>
        ))}
      </Box>
    </>
  );
}

export default TokenBalanceList;
