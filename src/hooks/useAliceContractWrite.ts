import { StateMessages } from '../types';
import { useMemo, useState } from 'react';
import { waitForTransaction, writeContract } from '@wagmi/core';
import toast from 'react-hot-toast';

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
  const [isMetamaskLoading, setIsMetamaskLoading] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const callback = useMemo(() => {
    if (!abi || !address || !functionName || !args || !chainId) return null;

    return async (stateMessage: StateMessages) => {
      setIsMetamaskLoading(true);
      try {
        const { hash } = await writeContract({
          abi: abi,
          address: address,
          functionName: functionName,
          args: args,
          chainId: chainId,
        });
        setIsMetamaskLoading(false);
        if (!hash) throw new Error('No hash returned from writeContract');
        setIsTransactionLoading(true);
        setTransactionHash(hash);
        const transaction = waitForTransaction({ hash });

        await toast.promise(transaction, {
          loading: stateMessage.pending,
          success: stateMessage.success,
          error: stateMessage.failed,
        });
        setIsTransactionLoading(false);
      } catch (error) {
        setIsMetamaskLoading(false);
        setIsTransactionLoading(false);
        console.log(error);
      }
    };
  }, [abi, address, functionName, args, chainId]);
  return { callback, isMetamaskLoading, isTransactionLoading, transactionHash };
};

export default useAliceContractWrite;
