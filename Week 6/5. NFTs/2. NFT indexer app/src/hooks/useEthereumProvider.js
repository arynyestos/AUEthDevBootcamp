import { useEffect, useState } from 'react';
import getProvider from '../utils/ethersProvider';

export function useEthereumProvider() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = getProvider();
      setProvider(provider);
    }
  }, []);

  return { provider };
}
