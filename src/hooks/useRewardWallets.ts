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
        wasInMuonPresale: rawRewards.muon_presale.contributors.includes(
          walletWithSignature.walletAddress,
        ),
        wasInDeusPresale: rawRewards.deus_presale.contributors.includes(
          walletWithSignature.walletAddress,
        ),
        wasAliceOperator: rawRewards.alice_operator.contributors.includes(
          walletWithSignature.walletAddress,
        ),
        wasAliceOperatorEarly:
          rawRewards.early_alice_operator.contributors.includes(
            walletWithSignature.walletAddress,
          ),
      };
    });
  }, [rawRewards, walletsWithSignature]);

  return {
    rewardWallets,
  };
};
