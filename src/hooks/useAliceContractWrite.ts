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
      console.log('1');
      setIsMetamaskLoading(true);
      console.log('2');
      try {
        console.log('3', {
          abi: abi,
          address: address,
          functionName: functionName,
          args: args,
          chainId: chainId,
        });

        const { hash } = await writeContract({
          abi: abi,
          address: address,
          functionName: functionName,
          args: args,
          chainId: chainId,
        });
        console.log('4');
        setIsMetamaskLoading(false);
        console.log('5');
        if (!hash) throw new Error('No hash returned from writeContract');
        console.log('6');
        setIsTransactionLoading(true);
        console.log('7');
        setTransactionHash(hash);
        console.log('8');
        const transaction = waitForTransaction({ hash });
        console.log('9');

        await toast.promise(transaction, {
          loading: stateMessage.pending,
          success: stateMessage.success,
          error: stateMessage.failed,
        });
        console.log('10');
        setIsTransactionLoading(false);
        console.log('11');
      } catch (error) {
        console.log('12');
        setIsMetamaskLoading(false);
        console.log('13');
        setIsTransactionLoading(false);
        console.log(error);
      }
    };
  }, [abi, address, functionName, args, chainId]);
  return { callback, isMetamaskLoading, isTransactionLoading, transactionHash };
};

export default useAliceContractWrite;
