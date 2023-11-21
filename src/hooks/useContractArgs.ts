import { ALICE_ADDRESS, LP_TOKEN_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';
import { useMemo } from 'react';
import { BonALICE } from '../types';

export const useLockArgs = ({
  tokenId,
  ALICEAmount,
  ALICEAllowance,
}: {
  tokenId: number | null;
  ALICEAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
}) => {
  // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]
  return useMemo(() => {
    if (
      !tokenId ||
      !ALICEAmount ||
      !ALICEAllowance ||
      ALICEAmount.big === BigInt(0) ||
      ALICEAmount.dsp > ALICEAllowance.dsp
    )
      return undefined;

    const tokens = [ALICE_ADDRESS[getCurrentChainId()]];
    const amounts = [ALICEAmount.big];

    return [tokenId, tokens, amounts];
  }, [tokenId, ALICEAmount, ALICEAllowance]);
};

export const useLockToBondedTokenArgs = ({
  tokenId,
  ALICEAmount,
  ALICEAllowance,
}: {
  tokenId: number | null;
  ALICEAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
}) => {
  // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]
  return useMemo(() => {
    if (
      !tokenId ||
      !ALICEAmount ||
      !ALICEAllowance ||
      ALICEAmount.big === BigInt(0) ||
      ALICEAmount.dsp > ALICEAllowance.dsp
    )
      return undefined;

    const tokens = [ALICE_ADDRESS[getCurrentChainId()]];
    const amounts = [ALICEAmount.big];

    return [tokenId, tokens, amounts];
  }, [tokenId, ALICEAmount, ALICEAllowance]);
};

export const useLockUSDCArgs = ({
  tokenId,
  LPTokenAmount,
  LPTokenAllowance,
}: {
  tokenId: number | null;
  LPTokenAmount: W3bNumber;
  LPTokenAllowance: W3bNumber | null;
}) => {
  return useMemo(() => {
    if (
      !tokenId ||
      !LPTokenAmount ||
      !LPTokenAllowance ||
      LPTokenAmount.big === BigInt(0) ||
      LPTokenAmount.big > LPTokenAllowance.big
    )
      return undefined;

    return [tokenId, LPTokenAmount.big];
  }, [tokenId, LPTokenAmount, LPTokenAllowance]);
};

export const useApproveArgs = ({
  spenderAddress,
  approveAmount,
}: {
  spenderAddress: `0x${string}`;
  approveAmount: W3bNumber;
}) => {
  return useMemo(() => {
    if (!spenderAddress || !approveAmount || approveAmount.big === BigInt(0))
      return undefined;

    return [spenderAddress, approveAmount.big];
  }, [spenderAddress, approveAmount]);
};

export const useMintArgs = ({
  walletAddress,
  ALICEAmount,
  ALICEAllowance,
  ALICEAddress,
}: {
  walletAddress: `0x${string}` | null | undefined;
  ALICEAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
  ALICEAddress: `0x${string}`;
}) => {
  // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]
  return useMemo(() => {
    if (
      !walletAddress ||
      !ALICEAmount ||
      !ALICEAllowance ||
      ALICEAmount.big === BigInt(0) ||
      ALICEAmount.dsp > ALICEAllowance.dsp
    )
      return undefined;

    const tokens = [ALICEAddress];
    const amounts = [ALICEAmount.big];

    return [tokens, amounts, walletAddress];
  }, [walletAddress, ALICEAmount, ALICEAllowance, ALICEAddress]);
};

export const useCreateAndBoostArgs = ({
  ALICEAmount,
  ALICEAllowance,
  LPTokenAmount,
  LPTokenAllowance,
}: {
  ALICEAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
  LPTokenAmount: W3bNumber;
  LPTokenAllowance: W3bNumber | null;
}) => {
  return useMemo(() => {
    if (
      !ALICEAmount ||
      !ALICEAllowance ||
      !LPTokenAmount ||
      !LPTokenAllowance ||
      ALICEAmount.big === BigInt(0) ||
      ALICEAmount.dsp > ALICEAllowance.dsp ||
      LPTokenAmount.big === BigInt(0) ||
      LPTokenAmount.dsp > LPTokenAllowance.dsp
    )
      return undefined;

    return [ALICEAmount.big, LPTokenAmount.big];
  }, [ALICEAmount, ALICEAllowance, LPTokenAmount, LPTokenAllowance]);
};

export const useBoostArgs = ({
  tokenId,
  boostAmount,
}: {
  tokenId: number | null;
  boostAmount: W3bNumber;
}) => {
  return useMemo(() => {
    if (!tokenId || !boostAmount || boostAmount.big === BigInt(0))
      return undefined;

    return [tokenId, boostAmount.big];
  }, [tokenId, boostAmount]);
};

export const useMergeArgs = ({
  tokenId1,
  tokenId2,
}: {
  tokenId1: number | null;
  tokenId2: number | null;
}) => {
  return useMemo(() => {
    if (!tokenId1 || !tokenId2) return undefined;

    return [tokenId1, tokenId2];
  }, [tokenId1, tokenId2]);
};

export const useClaimRewardArgs = ({
  rewardAmount,
  signature,
  connectedWalletAddress,
  stakingAddress,
}: {
  rewardAmount: W3bNumber;
  signature: string | null;
  connectedWalletAddress: `0x${string}` | null | undefined;
  stakingAddress: `0x${string}` | null | undefined;
}) => {
  if (!rewardAmount || !signature) return undefined;
  if (connectedWalletAddress !== stakingAddress) return undefined;

  return [rewardAmount.big, signature];
};

export const useSplitArgs = ({
  bonALICE,
  percentage,
}: {
  bonALICE: BonALICE | null;
  percentage: number;
}) => {
  if (!bonALICE) return undefined;
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
};

export const useAddNodeArgs = ({
  nodeAddress,
  peerID,
  tokenId,
}: {
  nodeAddress: string;
  peerID: string;
  tokenId: number | null;
}) => {
  if (!nodeAddress || !peerID || !tokenId) return undefined;

  return [nodeAddress, peerID, tokenId];
};

export const useApproveBonALICEArgs = ({
  address,
  tokenId,
}: {
  address: `0x${string}` | undefined;
  tokenId: number | null;
}) => {
  if (!address || !tokenId) return undefined;

  return [address, tokenId];
};
