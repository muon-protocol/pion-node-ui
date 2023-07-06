import { useCallback } from 'react';
import { BONALICE_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { writeContract } from '@wagmi/core';
import BONALICE_ABI from '../abis/BonALICE.json';

const useMerge = (tokenId1: number | null, tokenId2: number | null) => {
  const merge = useCallback(async () => {
    const { hash } = await writeContract({
      abi: BONALICE_ABI,
      address: BONALICE_ADDRESS[getCurrentChainId()],
      functionName: 'merge',
      args: [tokenId1, tokenId2],
    });

    return hash;
  }, [tokenId1, tokenId2]);

  return { merge };
};

export default useMerge;