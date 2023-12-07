import { useMemo } from 'react';
import { RawRewards, RewardWallet, WalletWithSignature } from '../types';

export const useRewardWallets = (
  rawRewards: RawRewards | null,
  walletsWithSignature: WalletWithSignature[],
) => {
  const rewardWallets: RewardWallet[] = useMemo(() => {
    if (!rawRewards) return [];
    return walletsWithSignature.map((walletWithSignature) => {
      return {
        walletAddress: walletWithSignature.walletAddress,
        signature: walletWithSignature.signature,
        wasInMuonPresale: rawRewards.muon_presale.contributors.some(
          (contributor) =>
            contributor.contributor === walletWithSignature.walletAddress &&
            contributor.reward > 0,
        ),
        wasInDeusAllocation: rawRewards.deus_allocation.contributors.some(
          (contributor) =>
            contributor.contributor === walletWithSignature.walletAddress &&
            contributor.reward > 0,
        ),
        wasMuonPrivateSale: rawRewards.muon_private_sale.contributors.some(
          (contributor) =>
            contributor.contributor === walletWithSignature.walletAddress &&
            contributor.reward > 0,
        ),
        wasInDeusPresale: rawRewards.deus_presale.contributors.some(
          (contributor) =>
            contributor.contributor === walletWithSignature.walletAddress &&
            contributor.reward > 0,
        ),
        wasAliceOperator: rawRewards.alice_operator.contributors.some(
          (contributor) =>
            contributor.contributor === walletWithSignature.walletAddress &&
            contributor.reward > 0,
        ),
        wasAliceOperatorEarly:
          rawRewards.early_alice_operator.contributors.some(
            (contributor) =>
              contributor.contributor === walletWithSignature.walletAddress &&
              contributor.reward > 0,
          ),
        wasAliceOperatorBounce:
          rawRewards.alice_operator_bounce.contributors.some(
            (contributor) =>
              contributor.contributor === walletWithSignature.walletAddress &&
              contributor.reward > 0,
          ),
      };
    });
  }, [rawRewards, walletsWithSignature]);

  return {
    rewardWallets,
  };
};
