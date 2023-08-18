import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import paymentsContractABI from '../abis/paymentsContractABI.json';

const useLatestPayments = () => {
  const paymentsContractAddress = '0x014211CA975a62fB4c3c74001fBd7e6D5Fc92a11';
  const [latestPayments, setLatestPayments] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(paymentsContractAddress, paymentsContractABI, provider);

    const handlePaymentProcessed = async (workerAddress, paymentAmount, event) => {
      const timestamp = (await provider.getBlock(event.blockNumber)).timestamp;
      const paymentDate = new Date(timestamp * 1000); // Convert timestamp to milliseconds
      const formattedDate = paymentDate.toLocaleTimeString() + ', on ' + paymentDate.toLocaleDateString();
      const paymentMessage = `${ethers.utils.formatEther(paymentAmount)} ETH paid to employee with address ${workerAddress} at ${formattedDate}.`;
      setLatestPayments(prevPayments => [...prevPayments, paymentMessage]);
    };

    contract.on('PaymentProcessed', handlePaymentProcessed);

    return () => {
      contract.off('PaymentProcessed', handlePaymentProcessed);
    };
  }, []);

  return latestPayments;
};

export default useLatestPayments;
