import { useCallback, useMemo } from 'react';
import { writeContract } from '@wagmi/core';
import BONALICE_ABI from '../abis/BonALICE.json';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';

const useLock = (
  tokenId: number | null,
  ALICEAmount: W3bNumber,
  LPTokenAmount: W3bNumber,
) => {
  const args = useMemo(() => {
    // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]

    const tokens = [ALICE_ADDRESS[getCurrentChainId()]];
    const amounts = [ALICEAmount.big];

    if (LPTokenAmount.dsp > 0) {
      tokens.push(LP_TOKEN_ADDRESS[getCurrentChainId()]);
      amounts.push(LPTokenAmount.big);
    }

    return [tokenId, tokens, amounts];
  }, [ALICEAmount, LPTokenAmount, tokenId]);

  const lock = useCallback(async () => {
    const { hash } = await writeContract({
      abi: BONALICE_ABI,
      address: BONALICE_ADDRESS[getCurrentChainId()],
      functionName: 'lock',
      args: args,
    });

    return hash;
  }, [args]);

  return { lock };
};

export default useLock;
