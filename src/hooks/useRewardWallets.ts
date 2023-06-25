import useUserProfile from '../contexts/UserProfile/useUserProfile.ts';
import { useEffect, useState } from 'react';
import { RawRewards, RewardWallet } from '../types';

export const useRewardWallets = () => {
  const { walletAddress } = useUserProfile();

  const [rewardWallets, setRewardWallets] = useState<RewardWallet[]>([]);

  useEffect(() => {
    if (walletAddress) {
      const relatedRewardAddress = rewardWallets.find(
        (rewardWallet) => rewardWallet.walletAddress === walletAddress,
      );

      if (!relatedRewardAddress) {
        setRewardWallets([
          ...rewardWallets,
          {
            walletAddress: walletAddress,
            signature: null,
            wasInMuonPresale: false,
            wasInDeusPresale: false,
            wasAliceOperator: false,
            hasBeenProcessed: false,
          },
        ]);
      }
    }
  }, [walletAddress, rewardWallets]);

  const updateRewardWallet = (rawRewards: RawRewards) => {
    setRewardWallets(calculateRewards(rawRewards));
  };

  const calculateRewards = (rawRewards: RawRewards) => {
    const processedRewards = rewardWallets;

    processedRewards.map((wallet) => {
      if (!wallet.hasBeenProcessed) {
        if (
          rawRewards.alice_operator.contributors.includes(
            wallet.walletAddress,
          ) ||
          rawRewards.early_alice_operator.contributors.includes(
            wallet.walletAddress,
          )
        ) {
          wallet.wasAliceOperator = true;
        }
        if (
          rawRewards.deus_presale.contributors.includes(wallet.walletAddress)
        ) {
          wallet.wasInDeusPresale = true;
        }
        if (
          rawRewards.muon_presale.contributors.includes(wallet.walletAddress)
        ) {
          wallet.wasInMuonPresale = true;
        }
        wallet.hasBeenProcessed = true;
      }
    });
    return processedRewards;
  };

  return {
    rewardWallets,
    updateRewardWallet,
  };
};
