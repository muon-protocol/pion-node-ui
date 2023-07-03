import { createContext, ReactNode, useEffect, useState } from 'react';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { getRewardsAPI } from '../../apis';
import { RawRewards, RewardWallet, WalletWithSignature } from '../../types';
import { useRewardWallets } from '../../hooks/useRewardWallets.ts';
import useTotalRewards from '../../hooks/useTotalRewards.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromNumber } from '../../utils/web3.ts';
import useStakingAddress from '../../hooks/useStakingAddress.ts';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
  rewardWallets: RewardWallet[];
  totalRewards: W3bNumber;
  stakingAddress: `0x${string}` | undefined;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
  rewardWallets: [],
  totalRewards: w3bNumberFromNumber(0),
  stakingAddress: undefined,
});

const ClaimPrizeProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress, isConnected } = useUserProfile();

  const [isSwitchBackToWalletModalOpen, setIsSwitchBackToWalletModalOpen] =
    useState(false);

  const [rawRewards, setRawRewards] = useState<RawRewards | null>(null);

  const { stakingAddress } = useStakingAddress();
  const { totalRewards } = useTotalRewards(rawRewards);
  const [walletsWithSignatures, setWalletsWithSignatures] = useState<
    WalletWithSignature[]
  >([]);

  const { rewardWallets } = useRewardWallets(rawRewards, walletsWithSignatures);

  useEffect(() => {
    if (!walletAddress || !isConnected) return;
    if (
      !walletsWithSignatures.find(
        (wallet) => wallet.walletAddress === walletAddress,
      )
    ) {
      setWalletsWithSignatures([
        ...walletsWithSignatures,
        {
          walletAddress: walletAddress,
          signature: '',
        },
      ]);
    }
  }, [walletsWithSignatures, walletAddress, isConnected]);

  useEffect(() => {
    if (!walletAddress || !isConnected) return;

    async function getRewards() {
      try {
        const walletsString: string[] = [];
        walletsWithSignatures.map((wallet) => {
          walletsString.push(wallet.walletAddress);
        });
        const response = await getRewardsAPI(walletsString);
        if (response.success) setRawRewards(response.result);
      } catch (error) {
        console.log(error);
      }
    }

    getRewards();
  }, [walletsWithSignatures, walletAddress, isConnected]);

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
        stakingAddress,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
