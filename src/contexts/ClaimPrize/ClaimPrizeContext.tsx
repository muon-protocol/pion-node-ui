import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { getClaimSignatureAPI, getRewardsAPI } from '../../apis';
import { RawRewards, RewardWallet, WalletWithSignature } from '../../types';
import { useRewardWallets } from '../../hooks/useRewardWallets.ts';
import useTotalRewards from '../../hooks/useTotalRewards.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromNumber } from '../../utils/web3.ts';
import useStakingAddress from '../../hooks/useStakingAddress.ts';
import useSignMessage from '../../hooks/useSignMessage.ts';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
  totalRewards: W3bNumber;
  stakingAddress: `0x${string}` | undefined;
  handleVerifyWallet: () => void;
  eligibleAddresses: RewardWallet[];
  getClaimSignature: () => void;
  handleRemoveWallet: (walletAddress: string) => void;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
  totalRewards: w3bNumberFromNumber(0),
  stakingAddress: undefined,
  handleVerifyWallet: () => {},
  eligibleAddresses: [],
  getClaimSignature: () => {},
  handleRemoveWallet: () => {},
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

  const eligibleAddresses = useMemo(() => {
    return rewardWallets.filter(
      (wallet) =>
        wallet.wasInMuonPresale ||
        wallet.wasInDeusPresale ||
        wallet.wasAliceOperator ||
        wallet.wasAliceOperatorEarly,
    );
  }, [rewardWallets]);

  const { signMessageMetamask } = useSignMessage(
    `Please sign this message to confirm that you would like to use "${stakingAddress}" as your reward claim destination.`,
  );

  const getClaimSignature = async () => {
    if (walletsWithSignatures.find((wallet) => wallet.signature === null))
      return;
    const signatures = walletsWithSignatures.map((wallet) => wallet.signature);
    const addresses = walletsWithSignatures.map(
      (wallet) => wallet.walletAddress,
    );
    if (!stakingAddress || !isConnected || !signatures || !addresses) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const signature = await getClaimSignatureAPI(
      signatures,
      addresses,
      stakingAddress,
    );
    console.log('signature:' + signature);
  };

  const handleRemoveWallet = (walletAddress: string) => {
    setWalletsWithSignatures((wallets) =>
      wallets.filter((wallet) => wallet.walletAddress !== walletAddress),
    );
  };
  const handleVerifyWallet = () => {
    signMessageMetamask()
      .then((signature) => {
        setWalletsWithSignatures((wallets) => {
          const newWallets = [...wallets];
          const index = newWallets.findIndex(
            (wallet) => wallet.walletAddress === walletAddress,
          );
          newWallets[index].signature = signature;
          return newWallets;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          signature: null,
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
        totalRewards,
        stakingAddress,
        handleVerifyWallet,
        eligibleAddresses,
        getClaimSignature,
        handleRemoveWallet,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
