import { ALICE_ADDRESS, LP_TOKEN_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';
import { useMemo } from 'react';
import { BonALICE } from '../types';

export const useLockArgs = ({
  tokenId,
  ALICEAmount,
  // LPTokenAmount,
  ALICEAllowance,
}: // LPTokenAllowance,
{
  tokenId: number | null;
  ALICEAmount: W3bNumber;
  // LPTokenAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
  // LPTokenAllowance: W3bNumber | null;
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

    // if (LPTokenAmount.dsp > 0) {
    //   if (!LPTokenAllowance || LPTokenAmount.dsp > LPTokenAllowance.dsp)
    //     return null;
    //   tokens.push(LP_TOKEN_ADDRESS[getCurrentChainId()]);
    //   amounts.push(LPTokenAmount.big);
    // }

    return [tokenId, tokens, amounts];
  }, [tokenId, ALICEAmount, ALICEAllowance]);
};

export const useLockToBondedTokenArgs = ({
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
  }, [tokenId, ALICEAmount, ALICEAllowance, LPTokenAmount, LPTokenAllowance]);
};

export const useLockUSDCArgs = ({
  tokenId,
  // ALICEAmount,
  LPTokenAmount,
  // ALICEAllowance,
  LPTokenAllowance,
}: {
  tokenId: number | null;
  // ALICEAmount: W3bNumber;
  LPTokenAmount: W3bNumber;
  // ALICEAllowance: W3bNumber | null;
  LPTokenAllowance: W3bNumber | null;
}) => {
  // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]
  return useMemo(() => {
    if (
      !tokenId ||
      !LPTokenAmount ||
      !LPTokenAllowance ||
      LPTokenAmount.dsp === 0 ||
      LPTokenAmount.dsp > LPTokenAllowance.dsp
    )
      return null;

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
    if (!spenderAddress || !approveAmount || approveAmount.dsp === 0)
      return null;
    return [spenderAddress, approveAmount.big];
  }, [spenderAddress, approveAmount]);
};

export const useMintAndLockArgs = ({
  walletAddress,
  ALICEAmount,
  // LPTokenAmount,
  ALICEAllowance,
  // LPTokenAllowance,
  ALICEAddress,
}: // LPTokenAddress,
{
  walletAddress: `0x${string}` | null | undefined;
  ALICEAmount: W3bNumber;
  // LPTokenAmount: W3bNumber;
  ALICEAllowance: W3bNumber | null;
  // LPTokenAllowance: W3bNumber | null;
  ALICEAddress: `0x${string}`;
  // LPTokenAddress: `0x${string}`;
}) => {
  // args: [tokenId (uint256), tokens (address[]), amounts (uint256[])]
  return useMemo(() => {
    if (
      !walletAddress ||
      !ALICEAmount ||
      !ALICEAllowance ||
      ALICEAmount.dsp === 0 ||
      ALICEAmount.dsp > ALICEAllowance.dsp
    )
      return null;

    const tokens = [ALICEAddress];
    const amounts = [ALICEAmount.big];
    //
    // if (LPTokenAmount.dsp > 0) {
    //   if (!LPTokenAllowance || LPTokenAmount.dsp > LPTokenAllowance.dsp)
    //     return null;
    //   tokens.push(LPTokenAddress);
    //   amounts.push(LPTokenAmount.big);
    // }

    return [tokens, amounts, walletAddress];
  }, [
    walletAddress,
    ALICEAmount,
    ALICEAllowance,
    ALICEAddress,
    // LPTokenAmount,
    // LPTokenAllowance,
    // LPTokenAddress,
  ]);
};

export const useBoostArgs = ({
  tokenId,
  boostAmount,
}: {
  tokenId: number | null;
  boostAmount: W3bNumber;
}) => {
  return useMemo(() => {
    if (!tokenId || !boostAmount || boostAmount.dsp === 0) return null;
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
    if (!tokenId1 || !tokenId2) return null;
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
  if (!rewardAmount || !signature) return null;
  if (connectedWalletAddress !== stakingAddress) return null;

  return [rewardAmount.big, signature];
};

export const useSplitArgs = ({
  bonALICE,
  percentage,
}: {
  bonALICE: BonALICE | null;
  percentage: number;
}) => {
  if (!bonALICE) return null;
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
  if (!nodeAddress || !peerID || !tokenId) return null;
  return [nodeAddress, peerID, tokenId];
};

export const useApproveBonALICEArgs = ({
  address,
  tokenId,
}: {
  address: `0x${string}` | undefined;
  tokenId: number | null;
}) => {
  if (!address || !tokenId) return null;
  return [address, tokenId];
};
