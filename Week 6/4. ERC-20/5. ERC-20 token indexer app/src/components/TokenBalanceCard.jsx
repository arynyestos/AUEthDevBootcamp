import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Utils } from 'alchemy-sdk';

const TokenBalanceCard = ({ tokenData, tokenBalance }) => {
  return (
    <Flex flexDir="column" color="white" bg="blue" w="80%" h="80%" p={2} alignItems="center">
      <Box>
        <b>Symbol:</b> ${tokenData.symbol}&nbsp;
      </Box>
      <Box>
        <b>Balance:</b>&nbsp;
        {(Utils.formatUnits(
            tokenBalance,
            tokenData.decimals) > 1000000 ||
          (Utils.formatUnits(
            tokenBalance,
            tokenData.decimals) < 0.0001 &&
          Utils.formatUnits(
            tokenBalance,
            tokenData.decimals) > 0)) && parseFloat(
          Utils.formatUnits(
            tokenBalance,
            tokenData.decimals
          )
        ).toExponential(2)}

        {Utils.formatUnits(
            tokenBalance,
            tokenData.decimals
          ).toString().length <= 10 && Utils.formatUnits(
            tokenBalance,
            tokenData.decimals
          )}

        {(Utils.formatUnits(
            tokenBalance,
            tokenData.decimals) < 1000000 &&
          Utils.formatUnits(
            tokenBalance,
            tokenData.decimals) > 0.0001) && 
          Utils.formatUnits(
            tokenBalance,
            tokenData.decimals
          ).toString().length > 8 && Utils.formatUnits(
            tokenBalance,
            tokenData.decimals
          ).substring(0, 8)}
      </Box>
      <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
        <Image src={tokenData.logo} w="70%" h="70%" objectFit="contain" />
      </Flex>
    </Flex>
  );
};

export default TokenBalanceCard;
