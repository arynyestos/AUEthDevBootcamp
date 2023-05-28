import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { resolveENS } from '../utils/resolveENS';

export function handleAddressTyping() {
  const [userAddress, setUserAddress] = useState('');
  const [connectedAddress, setConnectedAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { resolveENSName } = resolveENS();

  const [ensCache, setEnsCache] = useState({});

  useEffect(() => {
    let isMounted = true;

    const resolveAddress = async () => {
      // console.log("In cache", ensCache[inputValue])
      if (inputValue !== '' && ethers.utils.isAddress(inputValue)) {
        setIsValidAddress(true);
      } else if (inputValue.endsWith('.eth')) {
        if (inputValue in ensCache) {
          const resolvedAddress = ensCache[inputValue];
          setUserAddress(resolvedAddress);
          setIsValidAddress(true);
        } else {
          const resolvedAddress = await resolveENSName(inputValue);
          // console.log(resolvedAddress)
          if (resolvedAddress !== '') {
            setEnsCache((prevCache) => ({ ...prevCache, [inputValue]: resolvedAddress }));
            setUserAddress(resolvedAddress);
            // console.log("Setting userAddress as", resolveAddress)
            setIsValidAddress(true);
          } else {
            setIsValidAddress(false);
          }
        }
      } else if (inputValue === '') { 
        setIsValidAddress(true);
        if(connectedAddress !== ''){
          setUserAddress(connectedAddress);
        }
      } else {
        setIsValidAddress(false);
      }
    };

    if (isMounted) {
      resolveAddress();
    }

    return () => {
      isMounted = false;
    };
  }, [inputValue, resolveENSName, ensCache]);

  const handleUserAddressChange = (input, connectedAddress) => {
    setInputValue(input);
    setConnectedAddress(connectedAddress);
  };

  return {
    userAddress,
    setUserAddress,
    handleUserAddressChange,
    isValidAddress,
    ensCache,
  };
}
