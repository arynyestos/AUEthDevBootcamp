import { ethers } from 'ethers';
import paymentsContractABI from '../abis/paymentsContractABI.json';

export function interactWithPaymentsContract() {
  const paymentsContractAddress = '0x014211CA975a62fB4c3c74001fBd7e6D5Fc92a11';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const paymentsContract = new ethers.Contract(paymentsContractAddress, paymentsContractABI, signer);

  async function registerWorker(ethereumAddress, city) {
    try {
      const tx = await paymentsContract.registerWorker(ethereumAddress, city);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        return { success: true };
      } else {
        return { success: false, error: 'Transaction failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function deregisterWorker(ethereumAddress, city) {
    try {
      const tx = await paymentsContract.deregisterWorker(ethereumAddress);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        return { success: true };
      } else {
        return { success: false, error: 'Transaction failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function setUpKeepAddress(ethereumAddress) {
    try {
      const tx = await paymentsContract.setUpKeepAddress(ethereumAddress);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        return { success: true };
      } else {
        return { success: false, error: 'Transaction failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function payWorkersMan() {
    try {
      const tx = await paymentsContract.payWorkersMan();
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        return { success: true };
      } else {
        return { success: false, error: 'Transaction failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function withdrawEth() {
    try {
      const tx = await paymentsContract.withdrawEth();
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        return { success: true };
      } else {
        return { success: false, error: 'Transaction failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  return {
    registerWorker,
    deregisterWorker,
    setUpKeepAddress,
    payWorkersMan,
    withdrawEth,
  };
}