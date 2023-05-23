import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

// No he encontrado la manera de usarlo, otra vez será

function useENSResolution(ensName) {
  const [resolvedAddress, setResolvedAddress] = useState('');
  useEffect(() => {
        const resolveENSName = async () => {
            try {
                const config = {
                apiKey: import.meta.env.ALCHEMY_API_KEY,
                network: Network.ETH_MAINNET,
                };
                const alchemy = new Alchemy(config);
                const resolved = await alchemy.core.resolveName(ensName);
                setResolvedAddress(resolved);
            } catch (error) {
                console.log('Error resolving ENS name:', error);
                setResolvedAddress('');
            }
        };

        resolveENSName();

  }, [ensName]);

  return resolvedAddress;

}

export default useENSResolution;
