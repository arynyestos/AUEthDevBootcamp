import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

export function resolveENS() {
  
    const [resolvedAddress, setResolvedAddress] = useState('');
    const resolveENSName = async (ensName) => {
        try {
            const config = {
            apiKey: import.meta.env.ALCHEMY_API_KEY,
            network: Network.ETH_MAINNET,
            };
            const alchemy = new Alchemy(config);
            const resolved = await alchemy.core.resolveName(ensName);
            setResolvedAddress(resolved);
            console.log(resolved)
        } catch (error) {
            console.log('Error resolving ENS name:', error);
            setResolvedAddress("");
        }

        return resolvedAddress;
    };        

  return {
    resolveENSName,
    setResolvedAddress,
    resolvedAddress
  };

}
