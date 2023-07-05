import { StateMessages } from '../types';
import { useMemo } from 'react';
import { waitForTransaction, writeContract } from '@wagmi/core';

const useAliceContractWrite = ({
  abi,
  address,
  functionName,
  args,
  chainId,
}: {
  abi: any;
  address: `0x${string}`;
  functionName: any;
  args: any;
  chainId: number;
}) => {
  console.log(
    'useAliceContractWrite',
    abi,
    address,
    functionName,
    args,
    chainId,
  );

  const callback = useMemo(() => {
    if (!abi || !address || !functionName || !args || !chainId) return null;

    return async (stateMessage: StateMessages) => {
      console.log('useAliceContractWrite callback', stateMessage);

      try {
        const { hash } = await writeContract({
          abi,
          address,
          functionName,
          args,
          chainId,
        });

        if (!hash) throw new Error('No hash returned from writeContract');
        console.log('useAliceContractWrite hash', hash);
        const response = await waitForTransaction({ hash });

        console.log('useAliceContractWrite response', response);
      } catch (error) {
        console.error('Failed to write contract', error);
      }
    };
  }, [abi, address, functionName, args, chainId]);
  return { callback };
};

export default useAliceContractWrite;
