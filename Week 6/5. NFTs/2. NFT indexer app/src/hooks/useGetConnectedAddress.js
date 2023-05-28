import { useEffect, useState } from 'react';

export function useGetConnectedAddress() {
  const [connectedAddress, setConnectedAddress] = useState('');

  useEffect(() => {
    async function getAccounts(provider) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setConnectedAddress(accounts[0]);
      } catch (error) {
        console.log('Account fetching failed:', error);
      }
    }

    if (window.ethereum) {
      const { ethereum } = window;
      getAccounts(ethereum);

      ethereum.on('accountsChanged', (accounts) => {
        setConnectedAddress(accounts[0] || '');
      });

      return () => {
        ethereum.removeAllListeners('accountsChanged');
      };
    }
  }, []);

  return connectedAddress;
}
