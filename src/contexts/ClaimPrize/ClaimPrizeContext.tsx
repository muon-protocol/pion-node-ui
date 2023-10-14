import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import {
  getClaimSignatureAPI,
  getRewardsAPI,
  getClaimSignatureFromPastAPI,
} from '../../apis';
import {
  AlreadyRegisteredWallet,
  RawRewards,
  RewardWallet,
  WalletWithSignature,
} from '../../types';
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
import useRawRewards from '../../hooks/useRawRewards.ts';
import useUserClaimedReward from '../../hooks/useUserClaimedReward.ts';
import useCreateAction from '../CreateAction/useCreateAction.ts';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
  totalRewards: W3bNumber;
  stakingAddress: `0x${string}` | null;
  handleVerifyWallet: () => void;
  isMetamaskLoadingVerify: boolean;
  eligibleAddresses: RewardWallet[];
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
  walletsWithSignatureFromPast: WalletWithSignature[];
  claimSignatureFromPast: string | null;
  rewardWalletsFromPast: RewardWallet[];
  totalRewardFromPast: W3bNumber;
  handleClaimButtonClicked: () => void;
  handleClaimRewardsFromPastClicked: () => void;
  isConfirmModalOpen: boolean;
  handleClaimRewardsClicked: () => void;
  handleConfirmClaimClicked: () => void;
  setIsConfirmModalOpen: (value: boolean) => void;
  alreadyRegisteredWallet: AlreadyRegisteredWallet | null;
  isInsufficientModalOpen: boolean;
  setIsInsufficientModalOpen: (isOpen: boolean) => void;
  isSufficientModalOpen: boolean;
  setIsSufficientModalOpen: (isOpen: boolean) => void;
  agreeWithTermsAndConditionsSig: string | null;
  handleApproveTermsAndConditions: () => void;
  isTermsAndConditionsModalOpen: boolean;
  setIsTermsAndConditionsModalOpen: (isOpen: boolean) => void;
  setIsNewWalletModalOpen: (isOpen: boolean) => void;
  isNewWalletModalOpen: boolean;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
  totalRewards: w3bNumberFromNumber(0),
  stakingAddress: null,
  handleVerifyWallet: () => {},
  isMetamaskLoadingVerify: false,
  eligibleAddresses: [],
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
  walletsWithSignatureFromPast: [],
  claimSignatureFromPast: null,
  rewardWalletsFromPast: [],
  totalRewardFromPast: w3bNumberFromNumber(0),
  handleClaimButtonClicked: () => {},
  handleClaimRewardsFromPastClicked: () => {},
  isConfirmModalOpen: false,
  handleClaimRewardsClicked: () => {},
  handleConfirmClaimClicked: () => {},
  setIsConfirmModalOpen: () => {},
  alreadyRegisteredWallet: null,
  isInsufficientModalOpen: false,
  setIsInsufficientModalOpen: () => {},
  isSufficientModalOpen: false,
  setIsSufficientModalOpen: () => {},
  agreeWithTermsAndConditionsSig: null,
  handleApproveTermsAndConditions: () => {},
  isTermsAndConditionsModalOpen: false,
  setIsTermsAndConditionsModalOpen: () => {},
  setIsNewWalletModalOpen: () => {},
  isNewWalletModalOpen: false,
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

  const [walletsWithSignature, setWalletsWithSignature] = useState<
    WalletWithSignature[]
  >([]);

  const [claimSignature, setClaimSignature] = useState<string | null>(null);
  const [alreadyClaimedPrize, setAlreadyClaimedPrize] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReadyToClaim, setIsReadyToClaim] = useState(false);

  const [isInsufficientModalOpen, setIsInsufficientModalOpen] = useState(false);
  const [isSufficientModalOpen, setIsSufficientModalOpen] = useState(false);

  const { userClaimedReward, valid } = useUserClaimedReward();
  const {
    stakingAddressFromPast,
    walletsWithSignatureFromPast,
    claimSignatureFromPast,
    rewardWalletsFromPast,
    totalRewardFromPast,
  } = useRawRewardsFromPast({ rawRewardsFromPast });

  const { totalRewards, eligibleAddresses, alreadyRegisteredWallet } =
    useRawRewards({
      rawRewards,
      walletsWithSignature,
    });

  const { signMessageMetamask } = useSignMessage({
    message: `Please sign this message to confirm that you would like to claim your PION node-drop using "${stakingAddress}".`,
  });

  const { signMessageMetamask: signTermsAndConditionsMessageMetamask } =
    useSignMessage({
      message: `Please sign this message to confirm that you agree with terms and conditions of MUON network located at https://docs.muon.net/muon-network/terms-of-service  as well as the terms of acquisition of $PION tokens located at https://docs.muon.net/muon-network/terms-of-acquisition`,
    });

  const claimRewardArgs = useClaimRewardArgs({
    rewardAmount: totalRewards,
    signature: claimSignature,
    connectedWalletAddress: walletAddress,
    stakingAddress: stakingAddress,
  });

  const claimRewardFromPastArgs = useClaimRewardArgs({
    rewardAmount: totalRewardFromPast,
    signature: claimSignatureFromPast,
    connectedWalletAddress: walletAddress,
    stakingAddress: stakingAddressFromPast,
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
    args: claimRewardFromPastArgs || claimRewardArgs,
    chainId: getCurrentChainId(),
    showErrorToast: true,
  });

  const { setNewNFTClaimedLoading, newNFTClaimedLoading } = useCreateAction();

  useEffect(() => {
    if (isSuccess) {
      // if (totalRewards.dsp < 500) {
      //   setIsInsufficientModalOpen(true);
      // } else {
      if (!newNFTClaimedLoading) {
        setNewNFTClaimedLoading(true);
        setTimeout(() => {
          setNewNFTClaimedLoading(false);
        }, 10000);
      }
      setIsSufficientModalOpen(true);
      // }
      toast.success('Claimed successfully');
      setStakingAddress(null);
      setWalletsWithSignature([]);
      setClaimSignature(null);
      setRawRewards(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!walletAddress) return;

    if (
      userClaimedReward[0] === BigInt(0) &&
      alreadyRegisteredWallet &&
      !alreadyRegisteredWallet.isAlreadyRegistered &&
      !stakingAddress
    ) {
      setStakingAddress(walletAddress);
    }
  }, [
    alreadyRegisteredWallet,
    walletAddress,
    stakingAddress,
    userClaimedReward,
  ]);

  const newWalletConnected = useCallback(
    (walletAddress: `0x${string}`) => {
      if (!walletAddress || !isConnected) return;
      if (
        !walletsWithSignature.find(
          (wallet) => wallet.walletAddress === walletAddress,
        )
      ) {
        setWalletsWithSignature([
          ...walletsWithSignature,
          {
            walletAddress: walletAddress,
            signature: null,
          },
        ]);
      }
    },
    [walletsWithSignature, isConnected],
  );

  useEffect(() => {
    const getClaimSignatureFromPast = async () => {
      if (!walletAddress) return;

      try {
        const result = await getClaimSignatureFromPastAPI(walletAddress);
        if (result?.success) {
          setRawRewardsFromPast(result.result);
        } else {
          setRawRewardsFromPast(null);
          if (userClaimedReward[0] === BigInt(0) && valid)
            newWalletConnected(walletAddress);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getClaimSignatureFromPast();
  }, [walletAddress]);

  const handleClaimReward = useCallback(async () => {
    setIsConfirmModalOpen(false);
    try {
      await claimReward?.({
        pending: 'Waiting for confirmation',
        success: 'You have claimed your Bonded ALICE.',
        failed: 'Error',
      });
    } catch (e) {
      console.log(e);
    }
  }, [claimReward, setIsConfirmModalOpen]);

  useEffect(() => {
    if (isReadyToClaim && claimRewardArgs) {
      setIsReadyToClaim(false);
      handleClaimReward();
    }
  }, [isReadyToClaim, claimRewardArgs, handleClaimReward]);

  useEffect(() => {
    if (walletAddress === stakingAddress) {
      if (isSwitchBackToWalletModalOpen) {
        setIsSwitchBackToWalletModalOpen(false);
        setIsTermsAndConditionsModalOpen(true);
      }
    }
    if (isConfirmModalOpen) {
      if (stakingAddress !== walletAddress) {
        setIsTermsAndConditionsModalOpen(false);
        setIsSwitchBackToWalletModalOpen(true);
      }
    }
  }, [
    walletAddress,
    stakingAddress,
    isSwitchBackToWalletModalOpen,
    isConfirmModalOpen,
  ]);

  const handleClaimButtonClicked = useCallback(async () => {
    if (stakingAddressFromPast) {
      if (stakingAddressFromPast === walletAddress) {
        handleClaimReward();
        return;
      } else {
        setIsSwitchBackToWalletModalOpen(true);
        return;
      }
    }
    if (stakingAddress) {
      if (stakingAddress === walletAddress) {
        handleClaimReward();
        return;
      } else {
        setIsSwitchBackToWalletModalOpen(true);
        return;
      }
    }
  }, [
    stakingAddressFromPast,
    walletAddress,
    handleClaimReward,
    stakingAddress,
  ]);

  const handleRemoveWallet = (walletAddress: string) => {
    setWalletsWithSignature((wallets) =>
      wallets.filter((wallet) => wallet.walletAddress !== walletAddress),
    );
  };

  const [isMetamaskLoadingVerify, setIsMetamaskLoadingVerify] = useState(false);

  const handleVerifyWallet = () => {
    setIsMetamaskLoadingVerify(true);
    signMessageMetamask()
      .then((signature) => {
        setIsMetamaskLoadingVerify(false);
        setWalletsWithSignature((wallets) => {
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

  const [agreeWithTermsAndConditionsSig, setAgreeWithTermsAndConditionsSig] =
    useState<null | string>(null);

  const handleApproveTermsAndConditions = () => {
    setIsMetamaskLoadingVerify(true);
    signTermsAndConditionsMessageMetamask()
      .then((signature) => {
        setIsMetamaskLoadingVerify(false);
        setAgreeWithTermsAndConditionsSig(signature);
        setIsTermsAndConditionsModalOpen(false);
        setIsConfirmModalOpen(true);
      })
      .catch((error) => {
        setIsMetamaskLoadingVerify(false);
        console.log(error);
      });
  };

  const [lastAlertedWallet, setLastAlertedWallet] = useState<
    `0x${string}` | null
  >(null);

  const checkConnectedWalletHasRewards = useCallback(
    (res: RawRewards) => {
      if (!walletAddress) return;
      if (
        !res.muon_presale.contributors.find(
          (wallet) => wallet.contributor === walletAddress,
        )
      )
        return;

      let flag = false;

      if (
        res.alice_operator.contributors.find(
          (wallet) => wallet.contributor === walletAddress && wallet.reward > 0,
        )
      )
        flag = true;
      if (
        res.alice_operator_bounce.contributors.find(
          (wallet) => wallet.contributor === walletAddress && wallet.reward > 0,
        )
      )
        flag = true;
      if (
        res.deus_presale.contributors.find(
          (wallet) => wallet.contributor === walletAddress && wallet.reward > 0,
        )
      )
        flag = true;
      if (
        res.early_alice_operator.contributors.find(
          (wallet) => wallet.contributor === walletAddress && wallet.reward > 0,
        )
      )
        flag = true;
      if (
        res.muon_presale.contributors.find(
          (wallet) => wallet.contributor === walletAddress && wallet.reward > 0,
        )
      )
        flag = true;

      if (!flag) {
        if (walletAddress !== lastAlertedWallet) {
          toast.error(
            'Selected address is not eligible for receiving PION node-drop.',
            {
              duration: 5000,
            },
          );
          setLastAlertedWallet(walletAddress);
        }
      }
    },
    [walletAddress],
  );

  useEffect(() => {
    setLastAlertedWallet(null);
  }, [walletAddress]);

  useEffect(() => {
    if (!walletAddress || claimSignature) return;

    async function getRewards() {
      try {
        const walletsString: string[] = [];
        walletsWithSignature.map((wallet) => {
          walletsString.push(wallet.walletAddress);
        });
        if (walletsString.length === 0) return;
        if (!claimSignature) {
          const response = await getRewardsAPI(walletsString);
          if (response.success && !claimSignature) {
            setRawRewards(response.result);
            checkConnectedWalletHasRewards(response.result);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    getRewards();
  }, [
    walletsWithSignature,
    walletAddress,
    claimSignature,
    checkConnectedWalletHasRewards,
  ]);

  const handleConfirmClaimClicked = useCallback(async () => {
    if (eligibleAddresses.find((wallet) => wallet.signature === null)) return;
    if (!agreeWithTermsAndConditionsSig) return;

    const signatures = eligibleAddresses.map((wallet) => wallet.signature);
    const addresses = eligibleAddresses.map((wallet) => wallet.walletAddress);
    if (
      !stakingAddress ||
      !isConnected ||
      signatures.some((sig) => !sig) ||
      !addresses
    )
      return;
    try {
      const response = await getClaimSignatureAPI(
        signatures,
        addresses,
        stakingAddress,
        agreeWithTermsAndConditionsSig,
      );
      if (response?.success) {
        setClaimSignature(response.result.signature);
        setIsReadyToClaim(true);
        setTimeout(() => {
          setWalletsWithSignature([]);
          setStakingAddress(null);
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    stakingAddress,
    eligibleAddresses,
    isConnected,
    setClaimSignature,
    setIsReadyToClaim,
    agreeWithTermsAndConditionsSig,
  ]);

  const [isTermsAndConditionsModalOpen, setIsTermsAndConditionsModalOpen] =
    useState(false);

  const handleClaimRewardsClicked = useCallback(async () => {
    if (!stakingAddress || stakingAddressFromPast) return;
    if (stakingAddress !== walletAddress) {
      setIsSwitchBackToWalletModalOpen(true);
      return;
    }
    if (agreeWithTermsAndConditionsSig) {
      setIsTermsAndConditionsModalOpen(false);
      setIsConfirmModalOpen(true);
    } else {
      setIsTermsAndConditionsModalOpen(true);
    }
  }, [
    stakingAddress,
    walletAddress,
    stakingAddressFromPast,
    agreeWithTermsAndConditionsSig,
  ]);

  const handleClaimRewardsFromPastClicked = useCallback(async () => {
    if (!stakingAddressFromPast) return;
    handleClaimReward();
  }, [stakingAddressFromPast, handleClaimReward]);

  const [isNewWalletModalOpen, setIsNewWalletModalOpen] = useState(false);

  useEffect(() => {
    setIsNewWalletModalOpen(false);
  }, [walletAddress]);

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
        walletsWithSignatureFromPast,
        stakingAddressFromPast,
        handleClaimButtonClicked,
        handleClaimRewardsFromPastClicked,
        handleClaimRewardsClicked,
        isConfirmModalOpen,
        handleConfirmClaimClicked,
        setIsConfirmModalOpen,
        alreadyRegisteredWallet,
        isInsufficientModalOpen,
        setIsInsufficientModalOpen,
        isSufficientModalOpen,
        setIsSufficientModalOpen,
        agreeWithTermsAndConditionsSig,
        handleApproveTermsAndConditions,
        isTermsAndConditionsModalOpen,
        setIsTermsAndConditionsModalOpen,
        setIsNewWalletModalOpen,
        isNewWalletModalOpen,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
