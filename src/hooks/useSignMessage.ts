import { signMessage } from '@wagmi/core';
import { useCallback } from 'react';

const useSignMessage = (message: string) => {
  const signMessageMetamask = useCallback(async () => {
    const signature = await signMessage({
      message: message,
    });

    return signature;
  }, [message]);

  return { signMessageMetamask };
};

export default useSignMessage;
