import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import {
  getClaimSignatureAPI,
  getRewardsAPI,
  getClaimSignatureFromPastAPI,
} from '../../apis';
import { RawRewards, RewardWallet, WalletWithSignature } from '../../types';
import { useRewardWallets } from '../../hooks/useRewardWallets.ts';
import useTotalRewards from '../../hooks/useTotalRewards.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromNumber } from '../../utils/web3.ts';
import useSignMessage from '../../hooks/useSignMessage.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import REWARD_ABI from '../../abis/Reward.json';
import { getCurrentChainId } from '../../constants/chains.ts';
import { REWARD_ADDRESS } from '../../constants/addresses.ts';
import { useClaimRewardArgs } from '../../hooks/useContractArgs.ts';
import toast from 'react-hot-toast';
import { useRawRewardsFromPast } from '../../hooks/useRawRewardsFromPast.ts';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
  totalRewards: W3bNumber;
  stakingAddress: `0x${string}` | null;
  handleVerifyWallet: () => void;
  isMetamaskLoadingVerify: boolean;
  eligibleAddresses: RewardWallet[];
  getClaimSignature: () => void;
  handleRemoveWallet: (walletAddress: string) => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
  isSuccess: boolean;
  alreadyClaimedPrize: boolean;
  setAlreadyClaimedPrize: (value: boolean) => void;
  claimSignature: string | null;
  rawRewards: RawRewards | null;
  rawRewardsFromPast: RawRewards | null;
  stakingAddressFromPast: `0x${string}` | null;
  walletsWithSignaturesFromPast: WalletWithSignature[];
  claimSignatureFromPast: string | null;
  rewardWalletsFromPast: RewardWallet[];
  totalRewardFromPast: W3bNumber;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
  totalRewards: w3bNumberFromNumber(0),
  stakingAddress: null,
  handleVerifyWallet: () => {},
  isMetamaskLoadingVerify: false,
  eligibleAddresses: [],
  getClaimSignature: () => {},
  handleRemoveWallet: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
  isSuccess: false,
  alreadyClaimedPrize: false,
  setAlreadyClaimedPrize: () => {},
  claimSignature: null,
  rawRewards: null,
  rawRewardsFromPast: null,
  stakingAddressFromPast: null,
  walletsWithSignaturesFromPast: [],
  claimSignatureFromPast: null,
  rewardWalletsFromPast: [],
  totalRewardFromPast: w3bNumberFromNumber(0),
});

const ClaimPrizeProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress, isConnected } = useUserProfile();

  const [isSwitchBackToWalletModalOpen, setIsSwitchBackToWalletModalOpen] =
    useState(false);

  const [rawRewards, setRawRewards] = useState<RawRewards | null>(null);
  const [rawRewardsFromPast, setRawRewardsFromPast] =
    useState<RawRewards | null>(null);

  const [stakingAddress, setStakingAddress] = useState<`0x${string}` | null>(
    null,
  );

  const {
    stakingAddressFromPast,
    walletsWithSignaturesFromPast,
    claimSignatureFromPast,
    rewardWalletsFromPast,
    totalRewardFromPast,
  } = useRawRewardsFromPast({ rawRewardsFromPast });

  const { totalRewards } = useTotalRewards(rawRewards);
  const [walletsWithSignatures, setWalletsWithSignatures] = useState<
    WalletWithSignature[]
  >([]);
  const [claimSignature, setClaimSignature] = useState<string | null>(null);
  const { rewardWallets } = useRewardWallets(rawRewards, walletsWithSignatures);
  const [alreadyClaimedPrize, setAlreadyClaimedPrize] = useState(false);
  const eligibleAddresses = useMemo(() => {
    return rewardWallets.filter(
      (wallet) =>
        wallet.wasInMuonPresale ||
        wallet.wasInDeusPresale ||
        wallet.wasAliceOperator ||
        wallet.wasAliceOperatorEarly ||
        wallet.wasAliceOperatorBounce,
    );
  }, [rewardWallets]);

  const { signMessageMetamask } = useSignMessage(
    `Please sign this message to confirm that you would like to use "${stakingAddress}" as your reward claim destination.`,
  );

  const claimRewardArgs = useClaimRewardArgs({
    rewardAmount: totalRewards,
    signature: claimSignature,
    connectedWalletAddress: walletAddress,
    stakingAddress: stakingAddressFromPast || stakingAddress,
  });

  const {
    callback: claimReward,
    isMetamaskLoading,
    isTransactionLoading,
    isSuccess,
  } = useWagmiContractWrite({
    abi: REWARD_ABI,
    address: REWARD_ADDRESS[getCurrentChainId()],
    functionName: 'claimReward',
    args: claimRewardArgs,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Claimed successfully');
    }
  }, [isSuccess]);

  const newWalletConnected = useCallback(
    (walletAddress: `0x${string}`) => {
      if (!walletAddress || !isConnected || claimSignature) return;
      if (!stakingAddress) {
        setStakingAddress(walletAddress);
      }
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
    },
    [walletsWithSignatures, isConnected, claimSignature, stakingAddress],
  );

  const getClaimSignatureFromPast = useCallback(async () => {
    if (!walletAddress) {
      setClaimSignature(null);
      setRawRewards(null);
      setWalletsWithSignatures([]);
      return;
    }
    try {
      const result = await getClaimSignatureFromPastAPI(walletAddress);
      if (result?.success) {
        setRawRewardsFromPast(result.result);
      } else {
        newWalletConnected(walletAddress);
      }
    } catch (e) {
      console.log(e);
    }
  }, [walletAddress, newWalletConnected]);

  useEffect(() => {
    getClaimSignatureFromPast();
  }, [walletAddress, getClaimSignatureFromPast]);

  const handleClaimReward = useCallback(async () => {
    if (!stakingAddressFromPast && stakingAddress !== walletAddress) {
      setIsSwitchBackToWalletModalOpen(true);
      return;
    }
    try {
      await claimReward?.({
        pending: 'Waiting for confirmation',
        success: 'Approved',
        failed: 'Error',
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (e.cause.toString().includes('Already claimed the reward.')) {
        setAlreadyClaimedPrize(true);
        toast.success('You have claimed your Bonded ALICE.');
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e.cause.toString().includes('Invalid signature.')) {
          toast.error('Invalid signature.');
        }
      }
    }
  }, [claimReward, stakingAddress, walletAddress, stakingAddressFromPast]);

  useEffect(() => {
    if (walletAddress === stakingAddress) {
      if (isSwitchBackToWalletModalOpen)
        setIsSwitchBackToWalletModalOpen(false);
    }
  }, [walletAddress, stakingAddress, isSwitchBackToWalletModalOpen]);

  const getClaimSignature = async () => {
    if (claimSignature || claimSignatureFromPast) {
      handleClaimReward();
      return;
    }
    if (walletsWithSignatures.find((wallet) => wallet.signature === null))
      return;
    const signatures = eligibleAddresses.map((wallet) => wallet.signature);
    const addresses = eligibleAddresses.map((wallet) => wallet.walletAddress);
    if (!stakingAddress || !isConnected || !signatures || !addresses) return;
    try {
      const response = await getClaimSignatureAPI(
        signatures,
        addresses,
        stakingAddress,
      );
      if (response?.success) {
        setClaimSignature(response.result.signature);
        setTimeout(() => {
          // TODO: CLEAN CODE
          handleClaimReward();
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveWallet = (walletAddress: string) => {
    setWalletsWithSignatures((wallets) =>
      wallets.filter((wallet) => wallet.walletAddress !== walletAddress),
    );
  };

  const [isMetamaskLoadingVerify, setIsMetamaskLoadingVerify] = useState(false);

  const handleVerifyWallet = () => {
    setIsMetamaskLoadingVerify(true);
    signMessageMetamask()
      .then((signature) => {
        setIsMetamaskLoadingVerify(false);
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
        setIsMetamaskLoadingVerify(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!walletAddress || !isConnected || claimSignature) return;

    async function getRewards() {
      try {
        const walletsString: string[] = [];
        walletsWithSignatures.map((wallet) => {
          walletsString.push(wallet.walletAddress);
        });
        if (walletsString.length === 0) return;
        if (!claimSignature) {
          const response = await getRewardsAPI(walletsString);
          if (response.success && !claimSignature)
            setRawRewards(response.result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getRewards();
  }, [walletsWithSignatures, walletAddress, isConnected, claimSignature]);

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
        isMetamaskLoadingVerify,
        eligibleAddresses,
        getClaimSignature,
        handleRemoveWallet,
        isMetamaskLoading,
        isTransactionLoading,
        isSuccess,
        alreadyClaimedPrize,
        setAlreadyClaimedPrize,
        claimSignature,
        rawRewards,
        rawRewardsFromPast,
        claimSignatureFromPast,
        rewardWalletsFromPast,
        totalRewardFromPast,
        walletsWithSignaturesFromPast,
        stakingAddressFromPast,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
