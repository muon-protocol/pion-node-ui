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
import useStakingAddress from '../../hooks/useStakingAddress.ts';
import useSignMessage from '../../hooks/useSignMessage.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import REWARD_ABI from '../../abis/Reward.json';
import { getCurrentChainId } from '../../constants/chains.ts';
import { REWARD_ADDRESS } from '../../constants/addresses.ts';
import { useClaimRewardArgs } from '../../hooks/useContractArgs.ts';
import toast from 'react-hot-toast';
// import { useClaimPrizeDetail } from '../../hooks/useClaimPrizeDetail.tss';

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
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
  isSuccess: boolean;
  alreadyClaimedPrize: boolean;
  setAlreadyClaimedPrize: (value: boolean) => void;
  claimSignature: string | null;
  rawRewards: RawRewards | null;
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
  isMetamaskLoading: false,
  isTransactionLoading: false,
  isSuccess: false,
  alreadyClaimedPrize: false,
  setAlreadyClaimedPrize: () => {},
  claimSignature: null,
  rawRewards: null,
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

  const [claimSignature, setClaimSignature] = useState<string | null>(null);
  const [claimSignatureFromPastLoading, setClaimSignatureFromPastLoading] =
    useState(false);
  const { rewardWallets } = useRewardWallets(rawRewards, walletsWithSignatures);
  const [alreadyClaimedPrize, setAlreadyClaimedPrize] = useState(false);

  const eligibleAddresses = useMemo(() => {
    return rewardWallets.filter(
      (wallet) =>
        wallet.wasInMuonPresale ||
        wallet.wasInDeusPresale ||
        wallet.wasAliceOperator ||
        wallet.wasAliceOperatorEarly,
    );
  }, [rewardWallets]);

  // const claimPrizeDetails = useClaimPrizeDetail(rawRewards);

  const { signMessageMetamask } = useSignMessage(
    `Please sign this message to confirm that you would like to use "${stakingAddress}" as your reward claim destination.`,
  );

  const claimRewardArgs = useClaimRewardArgs({
    rewardAmount: totalRewards,
    signature: claimSignature,
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
      setClaimSignature(null);
      setRawRewards(null);
      setWalletsWithSignatures([]);
    }
  }, [isSuccess]);

  const getClaimSignatureFromPast = useCallback(async () => {
    if (!walletAddress) {
      setClaimSignature(null);
      return;
    }
    setClaimSignatureFromPastLoading(true);
    try {
      const result = await getClaimSignatureFromPastAPI(walletAddress);
      if (result?.success) {
        setClaimSignature(result.result.signature);
        setRawRewards(result.result);
        setWalletsWithSignatures([
          {
            walletAddress: walletAddress,
            signature: '0x000000000000000000000000',
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
    setClaimSignatureFromPastLoading(false);
  }, [walletAddress]);

  useEffect(() => {
    getClaimSignatureFromPast();
  }, [walletAddress, getClaimSignatureFromPast]);

  const handleClaimReward = useCallback(async () => {
    if (stakingAddress !== walletAddress) {
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
  }, [claimReward, stakingAddress, walletAddress]);

  useEffect(() => {
    if (walletAddress === stakingAddress) {
      if (isSwitchBackToWalletModalOpen)
        setIsSwitchBackToWalletModalOpen(false);
    }
  }, [walletAddress, stakingAddress, isSwitchBackToWalletModalOpen]);

  const getClaimSignature = async () => {
    if (claimSignature) {
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
    if (!walletAddress || !isConnected || claimSignature) return;
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
  }, [walletsWithSignatures, walletAddress, isConnected, claimSignature]);

  useEffect(() => {
    if (
      !walletAddress ||
      !isConnected ||
      claimSignature ||
      claimSignatureFromPastLoading
    )
      return;

    async function getRewards() {
      try {
        const walletsString: string[] = [];
        walletsWithSignatures.map((wallet) => {
          walletsString.push(wallet.walletAddress);
        });
        if (walletsString.length === 0) return;
        if (!claimSignature || !claimSignatureFromPastLoading) {
          const response = await getRewardsAPI(walletsString);
          if (
            response.success &&
            !claimSignature &&
            !claimSignatureFromPastLoading
          )
            setRawRewards(response.result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getRewards();
  }, [
    walletsWithSignatures,
    walletAddress,
    isConnected,
    claimSignature,
    claimSignatureFromPastLoading,
  ]);

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
        isMetamaskLoading,
        isTransactionLoading,
        isSuccess,
        alreadyClaimedPrize,
        setAlreadyClaimedPrize,
        claimSignature,
        rawRewards,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
