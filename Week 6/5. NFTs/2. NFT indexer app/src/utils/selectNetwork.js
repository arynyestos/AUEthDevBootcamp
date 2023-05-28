import { useState } from 'react';
import { Network } from 'alchemy-sdk';

export function selectNetwork() {
    
    const [hasQueried, setHasQueried] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState(Network.ETH_MAINNET);
    const handleNetworkChange = (network) => {
    setHasQueried(false); 
    setSelectedNetwork(network);
    };  

    return {
        selectedNetwork,
        setSelectedNetwork,
        handleNetworkChange,
        hasQueried
    };

}