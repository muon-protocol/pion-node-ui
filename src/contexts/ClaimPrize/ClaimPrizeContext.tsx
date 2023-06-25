import { createContext, ReactNode, useEffect, useState } from 'react';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { getRewardsAPI } from '../../apis';
import { RawRewards, RewardWallet } from '../../types';
import { useRewardWallets } from '../../hooks/useRewardWallets.ts';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
  rewardWallets: RewardWallet[];
  totalRewards: number;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
  rewardWallets: [],
  totalRewards: 0,
});

const ClaimPrizeProvider = ({ children }: { children: ReactNode }) => {
  const [isSwitchBackToWalletModalOpen, setIsSwitchBackToWalletModalOpen] =
    useState(false);
  const [rawRewards, setRawRewards] = useState<RawRewards | null>(null);
  const [totalRewards, setTotalRewards] = useState<number>(0);

  const { walletAddress, isConnected } = useUserProfile();
  const { rewardWallets, updateRewardWallet } = useRewardWallets();

  useEffect(() => {
    if (!walletAddress || !isConnected) return;

    async function getRewards() {
      try {
        const walletsString: string[] = [];
        rewardWallets.map((wallet) => {
          walletsString.push(wallet.walletAddress);
        });
        const response = await getRewardsAPI(walletsString);
        if (response.success) setRawRewards(response.result);
      } catch (error) {
        console.log(error);
      }
    }

    getRewards();
  }, [rewardWallets, walletAddress, isConnected]);

  useEffect(() => {
    if (rawRewards) {
      setTotalRewards(
        rawRewards.alice_operator.reward +
          rawRewards.deus_presale.reward +
          rawRewards.early_alice_operator.reward +
          rawRewards.muon_presale.reward,
      );

      updateRewardWallet(rawRewards);
    }
  }, [rawRewards, updateRewardWallet]);

  const openSwitchBackToWalletModal = () =>
    setIsSwitchBackToWalletModalOpen(true);
  const closeSwitchBackToWalletModal = () =>
    setIsSwitchBackToWalletModalOpen(false);

  return (
    <ClaimPrizeContext.Provider
      value={{
        isSwitchBackToWalletModalOpen,
        openSwitchBackToWalletModal,
        closeSwitchBackToWalletModal,
        rewardWallets,
        totalRewards,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
