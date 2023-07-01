import ALICE_API from '../abis/ALICE.json';
import { BONALICE_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';
import { useCallback } from 'react';
import { writeContract } from '@wagmi/core';

const useApprove = (tokenAddress: `0x${string}`, approveAmount: W3bNumber) => {
  const approve = useCallback(async () => {
    const { hash } = await writeContract({
      abi: ALICE_API,
      address: tokenAddress,
      functionName: 'approve',
      args: [BONALICE_ADDRESS[getCurrentChainId()], approveAmount.big],
      chainId: getCurrentChainId(),
    });

    return hash;
  }, [approveAmount, tokenAddress]);

  return { approve };
};

export default useApprove;
