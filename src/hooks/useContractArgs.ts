import { ALICE_ADDRESS, LP_TOKEN_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';
import { useMemo } from 'react';

export const useLockArgs = ({
  tokenId,
  ALICEAmount,
  LPTokenAmount,
  ALICEAllowance,
  LPTokenAllowance,
}: {
  tokenId: number | null;
  ALICEAmount: W3bNumber;
  LPTokenAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
  LPTokenAllowance: W3bNumber | null;
}) => {
  // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]
  return useMemo(() => {
    if (
      !tokenId ||
      !ALICEAmount ||
      !ALICEAllowance ||
      ALICEAmount.dsp === 0 ||
      ALICEAmount.dsp > ALICEAllowance.dsp
    )
      return null;

    const tokens = [ALICE_ADDRESS[getCurrentChainId()]];
    const amounts = [ALICEAmount.big];

    if (LPTokenAmount.dsp > 0) {
      if (!LPTokenAllowance || LPTokenAmount.dsp > LPTokenAllowance.dsp)
        return null;
      tokens.push(LP_TOKEN_ADDRESS[getCurrentChainId()]);
      amounts.push(LPTokenAmount.big);
    }

    return [tokenId, tokens, amounts];
  }, [tokenId, ALICEAmount, LPTokenAmount, ALICEAllowance, LPTokenAllowance]);
};
