import { createContext, ReactNode, useEffect, useState } from 'react';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { getRewardsAPI } from '../../apis';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
  rewards: any | null;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
  rewards: null,
});

const ClaimPrizeProvider = ({ children }: { children: ReactNode }) => {
  const [isSwitchBackToWalletModalOpen, setIsSwitchBackToWalletModalOpen] =
    useState(false);

  const { walletAddress, isConnected } = useUserProfile();

  const [wallets, setWallets] = useState<string[]>([]);
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    if (!walletAddress || !isConnected) return;
    if (wallets.includes(walletAddress)) return;
    setWallets([...wallets, walletAddress]);
  }, [isConnected, walletAddress, wallets]);

  useEffect(() => {
    if (!walletAddress || !isConnected) return;

    async function getRewards() {
      try {
        const response = await getRewardsAPI(wallets);
        setRewards(response);
      } catch (error) {
        console.log(error);
      }
    }

    getRewards();
  }, [wallets, walletAddress, isConnected]);

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
        rewards,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
