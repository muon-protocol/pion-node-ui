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

    const deusPresaleWallets = rawRewardsFromPast.deus_presale.contributors.map(
      (contributor) => {
        return {
          walletAddress: contributor.contributor,
          signature: 'signature',
        };
      },
    );
    const muonPresaleWallets = rawRewardsFromPast.muon_presale.contributors.map(
      (contributor) => {
        return {
          walletAddress: contributor.contributor,
          signature: 'signature',
        };
      },
    );
    const aliceOperatorWallets =
      rawRewardsFromPast.alice_operator.contributors.map((contributor) => {
        return {
          walletAddress: contributor.contributor,
          signature: 'signature',
        };
      });
    const earlyAliceOperatorWallets =
      rawRewardsFromPast.early_alice_operator.contributors.map(
        (contributor) => {
          return {
            walletAddress: contributor.contributor,
            signature: 'signature',
          };
        },
      );
    const aliceOperatorBounceWallets =
      rawRewardsFromPast.alice_operator_bounce.contributors.map(
        (contributor) => {
          return {
            walletAddress: contributor.contributor,
            signature: 'signature',
          };
        },
      );
    return [
      ...new Set(
        aliceOperatorBounceWallets.concat(
          aliceOperatorWallets,
          earlyAliceOperatorWallets,
          deusPresaleWallets,
          muonPresaleWallets,
        ),
      ),
    ];
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
