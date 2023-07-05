import { useCallback, useMemo } from 'react';
import { writeContract } from '@wagmi/core';
import { BONALICE_ABI } from '../abis/BonALICE.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { BonALICE } from '../types';

const useSplit = (bonALICE: BonALICE | null, percentage: number) => {
  const args = useMemo(() => {
    if (!bonALICE) return [];

    // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]

    const tokens = [ALICE_ADDRESS[getCurrentChainId()]];
    const amounts = [
      (bonALICE.ALICELockAmount.big * BigInt(percentage)) / BigInt(100),
    ];

    if (bonALICE.LPTokenLockAmount.dsp > 0) {
      tokens.push(LP_TOKEN_ADDRESS[getCurrentChainId()]);
      amounts.push(
        (bonALICE.LPTokenLockAmount.big * BigInt(percentage)) / BigInt(100),
      );
    }

    return [bonALICE.tokenId, tokens, amounts];
  }, [bonALICE, percentage]);

  const split = useCallback(async () => {
    const { hash } = await writeContract({
      abi: BONALICE_ABI,
      address: BONALICE_ADDRESS[getCurrentChainId()],
      functionName: 'split',
      args: args,
    });

    return hash;
  }, [args]);

  return { split };
};

export default useSplit;
