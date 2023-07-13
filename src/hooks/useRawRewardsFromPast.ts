import { RawRewards } from '../types';
import { useMemo } from 'react';
import useTotalRewards from './useTotalRewards.ts';
import { useRewardWallets } from './useRewardWallets.ts';

export const useRawRewardsFromPast = ({
  rawRewardsFromPast,
}: {
  rawRewardsFromPast: RawRewards | null;
}) => {
  const stakingAddressFromPast = useMemo(() => {
    if (!rawRewardsFromPast) return null;
    return rawRewardsFromPast.claimer;
  }, [rawRewardsFromPast]);

  const claimSignatureFromPast = useMemo(() => {
    if (!rawRewardsFromPast) return null;
    return rawRewardsFromPast.signature;
  }, [rawRewardsFromPast]);

  const { totalRewards: totalRewardFromPast } =
    useTotalRewards(rawRewardsFromPast);

  const walletsWithSignaturesFromPast = useMemo(() => {
    if (!rawRewardsFromPast) return [];

    const wallets = rawRewardsFromPast.deus_presale.contributors.map(
      (contributor) => {
        return {
          walletAddress: contributor.contributor,
          signature: 'signature',
        };
      },
    );
    rawRewardsFromPast.muon_presale.contributors.forEach((contributor) => {
      if (
        !wallets.some(
          (wallet) => wallet.walletAddress === contributor.contributor,
        )
      ) {
        wallets.push({
          walletAddress: contributor.contributor,
          signature: 'signature',
        });
      }
    });
    rawRewardsFromPast.alice_operator.contributors.forEach((contributor) => {
      if (
        !wallets.some(
          (wallet) => wallet.walletAddress === contributor.contributor,
        )
      ) {
        wallets.push({
          walletAddress: contributor.contributor,
          signature: 'signature',
        });
      }
    });

    rawRewardsFromPast.early_alice_operator.contributors.forEach(
      (contributor) => {
        if (
          !wallets.some(
            (wallet) => wallet.walletAddress === contributor.contributor,
          )
        ) {
          wallets.push({
            walletAddress: contributor.contributor,
            signature: 'signature',
          });
        }
      },
    );

    rawRewardsFromPast.alice_operator_bounce.contributors.forEach(
      (contributor) => {
        if (
          !wallets.some(
            (wallet) => wallet.walletAddress === contributor.contributor,
          )
        ) {
          wallets.push({
            walletAddress: contributor.contributor,
            signature: 'signature',
          });
        }
      },
    );

    return wallets;
  }, [rawRewardsFromPast]);

  const { rewardWallets: rewardWalletsFromPast } = useRewardWallets(
    rawRewardsFromPast,
    walletsWithSignaturesFromPast,
  );

  return {
    stakingAddressFromPast,
    walletsWithSignaturesFromPast,
    claimSignatureFromPast,
    rewardWalletsFromPast,
    totalRewardFromPast,
  };
};
