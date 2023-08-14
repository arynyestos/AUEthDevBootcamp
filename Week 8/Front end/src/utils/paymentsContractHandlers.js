import { useState } from 'react';
import { interactWithPaymentsContract } from './interactWithPaymentsContract';
import { ethers } from 'ethers';

export function paymentsContractHandlers() {
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const paymentsContractInterface = interactWithPaymentsContract();

  const handleRegisterWorker = async (workerAddressAdd, city) => {
    setIsProcessing(true);
    setResultMessage('');

    if (ethers.utils.isAddress(workerAddressAdd)) {
      const { success, error } = await paymentsContractInterface.registerWorker(workerAddressAdd, city);
  
      if (success) {
        setResultMessage('Worker registered successfully');
        setWorkerAddressAdd("");
        setCity("");
      } else {
        setResultMessage(`Failed to register worker: ${error}`);
      }
  
      setIsProcessing(false);
    } else{
      setResultMessage('Failed to register worker, please enter a valid Ethereum address.');
      setIsProcessing(false);
    }

  };

  const handleDeregisterWorker = async (workerAddressRemove) => {
    setIsProcessing(true);
    setResultMessage('');

    if (ethers.utils.isAddress(workerAddressRemove)) {
      const { success, error } = await paymentsContractInterface.deregisterWorker(workerAddressRemove);
  
      if (success) {
        setResultMessage('Worker removed successfully');
        setWorkerAddressRemove("");
      } else {
        setResultMessage(`Failed to remove worker: ${error}`);
      }
  
      setIsProcessing(false);
    } else{
      setResultMessage('Failed to deregister worker, please enter a valid Ethereum address.');
      setIsProcessing(false);
    }
    
  };

  const handleSetUpkeepAddress = async (upkeepAddress) => {
    setIsProcessing(true);
    setResultMessage('');

    if (ethers.utils.isAddress(upkeepAddress)) {
      const { success, error } = await paymentsContractInterface.setUpKeepAddress(upkeepAddress);
  
      if (success) {
        setResultMessage('Upkeep contract set successfully');
      } else {
        setResultMessage(`Failed to remove worker: ${error}`);
      }
  
      setIsProcessing(false);
    } else{
      setResultMessage('Failed to set upkeep contract address, please enter a valid Ethereum address.');
      setIsProcessing(false);
    }
    
  };

  const handlePayManually = async () => {
    setIsProcessing(true);
    setResultMessage('');

    const { success, error } = await paymentsContractInterface.payWorkersMan();

    if (success) {
      setResultMessage('Payment successful');
    } else {
      setResultMessage(`Payment failed: ${error}`);
    }

    setIsProcessing(false);
  };

  const handleWithdrawEth = async () => {
    setIsProcessing(true);
    setResultMessage('');

    const { success, error } = await paymentsContractInterface.withdrawEth();

    if (success) {
      setResultMessage('ETH withdrawn successfully');
    } else {
      setResultMessage(`Failed to withdraw ETH: ${error}`);
    }

    setIsProcessing(false);
  };
  
    return {
      isProcessing,
      resultMessage,
      handleRegisterWorker,
      handleDeregisterWorker,
      handleSetUpkeepAddress,
      handlePayManually,
      handleWithdrawEth,
    };
  }  