import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useALICE from '../ALICE/useALICE.ts';
import BOOSTER_ABI from '../../abis/PION/Mainnet/Booster.ts';
import BONALICE_ABI from '../../abis/PION/Mainnet/NFT.ts';
import ALICE_ABI from '../../abis/PION/Mainnet/Token.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  BOOSTER_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
import useLPToken from '../LPToken/useLPToken.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import { useApproveArgs, useMintArgs } from '../../hooks/useContractArgs.ts';
import { getUserSignatureForBoostAPI } from '../../apis';
import { waitForTransaction, writeContract } from '@wagmi/core';
import toast from 'react-hot-toast';

const CreateActionContext = createContext<{
  createAmount: W3bNumber;
  createBoostAmount: W3bNumber;
  createActionLoading: boolean;
  handleCreateAmountChange: (amount: string) => void;
  handleCreateBoostAmountChange: (amount: string) => void;
  handleCreateBonALICEClicked: () => void;
  handleApproveALICEClicked: () => void;
  handleApproveALICEForBoosterClicked: () => void;
  handleApproveLPTokenClicked: () => void;
  isAllowanceModalOpen: boolean;
  closeAllowanceModal: () => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
  isApproveMetamaskLoading: boolean;
  isApproveTransactionLoading: boolean;
  isInsufficientModalOpen: boolean;
  setIsInsufficientModalOpen: (isOpen: boolean) => void;
  isSufficientModalOpen: boolean;
  setIsSufficientModalOpen: (isOpen: boolean) => void;
  setNewNFTClaimedLoading: (value: boolean) => void;
  newNFTClaimedLoading: boolean;
}>({
  createAmount: w3bNumberFromString(''),
  createBoostAmount: w3bNumberFromString(''),
  createActionLoading: false,
  handleCreateAmountChange: () => {},
  handleCreateBoostAmountChange: () => {},
  handleCreateBonALICEClicked: () => {},
  handleApproveALICEClicked: () => {},
  handleApproveALICEForBoosterClicked: () => {},
  handleApproveLPTokenClicked: () => {},
  isAllowanceModalOpen: false,
  closeAllowanceModal: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
  isApproveMetamaskLoading: false,
  isApproveTransactionLoading: false,
  isInsufficientModalOpen: false,
  setIsInsufficientModalOpen: () => {},
  isSufficientModalOpen: false,
  setIsSufficientModalOpen: () => {},
  setNewNFTClaimedLoading: () => {},
  newNFTClaimedLoading: false,
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance, LPTokenDecimals } = useLPToken();
  const { ALICEAllowance } = useBonALICE();
  const { walletAddress } = useUserProfile();

  const [createActionLoading, setCreateActionLoading] = useState(false);

  const [createAmount, setCreateAmount] = useState<W3bNumber>(
    w3bNumberFromString(''),
  );
  const [createBoostAmount, setCreateBoostAmount] = useState<W3bNumber>(
    w3bNumberFromString(''),
  );
  const [isInsufficientModalOpen, setIsInsufficientModalOpen] = useState(false);
  const [isSufficientModalOpen, setIsSufficientModalOpen] = useState(false);
  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);
  const [newNFTClaimedLoading, setNewNFTClaimedLoading] = useState(false);

  const handleCreateAmountChange = useCallback((amount: string) => {
    setCreateAmount(w3bNumberFromString(amount));
  }, []);

  const handleCreateBoostAmountChange = useCallback(
    (amount: string) => {
      setCreateBoostAmount(w3bNumberFromString(amount, LPTokenDecimals));
    },
    [LPTokenDecimals],
  );

  const mintArgs = useMintArgs({
    walletAddress: walletAddress,
    ALICEAmount: createAmount,
    ALICEAllowance: ALICEAllowance,
    ALICEAddress: ALICE_ADDRESS[getCurrentChainId()],
  });

  const {
    callback: mint,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: mintArgs,
    chainId: getCurrentChainId(),
  });

  const [isCreateAndBoostMetamaskLoading, setIsCreateAndBoostMetamaskLoading] =
    useState(false);

  const [
    isCreateAndBoostTransactionLoading,
    setIsCreateAndBoostTransactionLoading,
  ] = useState(false);

  const handleCreateBonALICEClicked = useCallback(async () => {
    if (
      !walletAddress ||
      !ALICEBalance ||
      !createAmount ||
      createAmount.big > ALICEBalance.big
    )
      return;
    setCreateActionLoading(true);
    try {
      if (createBoostAmount.dsp > 0) {
        const response = await getUserSignatureForBoostAPI(walletAddress);
        if (response.success) {
          setIsCreateAndBoostMetamaskLoading(true);
          const { hash } = await writeContract({
            abi: BOOSTER_ABI,
            address: BOOSTER_ADDRESS[getCurrentChainId()],
            functionName: 'createAndBoost',
            args: [
              createAmount.big,
              createBoostAmount.big,
              response.amount,
              response.timestamp,
              response.signature,
            ],
            chainId: getCurrentChainId(),
          });
          setIsCreateAndBoostTransactionLoading(true);
          setIsCreateAndBoostMetamaskLoading(false);
          const transaction = waitForTransaction({ hash });

          await toast.promise(transaction, {
            loading: 'Waiting for confirmation...',
            success: 'BonALICE created!',
            error: 'Failed, please try again!',
          });
          setIsCreateAndBoostTransactionLoading(false);
        }
      } else {
        await mint?.({
          pending: 'Waiting for confirmation...',
          success: 'BonALICE created!',
          failed: 'Error',
        });
      }

      setCreateAmount(w3bNumberFromString(''));
      setCreateBoostAmount(w3bNumberFromString(''));
      setIsSufficientModalOpen(true);
    } catch (error) {
      setIsCreateAndBoostTransactionLoading(false);
      setIsCreateAndBoostMetamaskLoading(false);
      console.log(error);
    }

    setCreateActionLoading(false);
  }, [ALICEBalance, createAmount, createBoostAmount, mint, walletAddress]);

  const approveALICEArgs = useApproveArgs({
    spenderAddress: BONALICE_ADDRESS[getCurrentChainId()],
    approveAmount: createAmount,
  });

  const {
    callback: approveALICE,
    isMetamaskLoading: approveALICEIsMetamaskLoading,
    isTransactionLoading: approveALICEIsTransactionLoading,
    isSuccess: approveALICEIsSuccess,
  } = useWagmiContractWrite({
    abi: ALICE_ABI,
    address: ALICE_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: approveALICEArgs,
    chainId: getCurrentChainId(),
  });

  const approveALICEForBoosterArgs = useApproveArgs({
    spenderAddress: BOOSTER_ADDRESS[getCurrentChainId()],
    approveAmount: createAmount,
  });

  const {
    callback: approveALICEForBooster,
    isMetamaskLoading: approveALICEForBoosterIsMetamaskLoading,
    isTransactionLoading: approveALICEForBoosterIsTransactionLoading,
    isSuccess: approveALICEForBoosterIsSuccess,
  } = useWagmiContractWrite({
    abi: ALICE_ABI,
    address: ALICE_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: approveALICEForBoosterArgs,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (approveALICEIsSuccess || approveALICEForBoosterIsSuccess) {
      setIsAllowanceModalOpen(false);
    }
  }, [approveALICEIsSuccess, approveALICEForBoosterIsSuccess]);

  const approveLPTokenArgs = useApproveArgs({
    spenderAddress: BOOSTER_ADDRESS[getCurrentChainId()],
    approveAmount: createBoostAmount,
  });

  const {
    callback: approveLPToken,
    isMetamaskLoading: approveLPTokenIsMetamaskLoading,
    isTransactionLoading: approveLPTokenIsTransactionLoading,
    isSuccess: approveLPTokenIsSuccess,
  } = useWagmiContractWrite({
    abi: ALICE_ABI,
    address: LP_TOKEN_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: approveLPTokenArgs,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (approveLPTokenIsSuccess) {
      setIsAllowanceModalOpen(false);
    }
  }, [approveLPTokenIsSuccess]);

  const handleApproveALICEClicked = () => {
    if (!ALICEBalance || !createAmount || createAmount.big > ALICEBalance.big)
      return;
    openAllowanceModal();
    approveALICE?.({
      pending: 'Waiting for confirmation',
      success: 'Approved',
      failed: 'Error',
    });
  };

  const handleApproveALICEForBoosterClicked = () => {
    if (!ALICEBalance || !createAmount || createAmount.big > ALICEBalance.big)
      return;
    openAllowanceModal();
    approveALICEForBooster?.({
      pending: 'Waiting for confirmation',
      success: 'Approved',
      failed: 'Error',
    });
  };

  const handleApproveLPTokenClicked = () => {
    if (
      !LPTokenBalance ||
      !createBoostAmount ||
      Number(createBoostAmount) > Number(LPTokenBalance.big)
    )
      return;
    openAllowanceModal();
    approveLPToken?.({
      pending: 'Waiting for confirmation',
      success: 'Approved',
      failed: 'Error',
    });
  };

  const openAllowanceModal = useCallback(
    () => setIsAllowanceModalOpen(true),
    [],
  );
  const closeAllowanceModal = useCallback(
    () => setIsAllowanceModalOpen(false),
    [],
  );

  return (
    <CreateActionContext.Provider
      value={{
        createAmount,
        createBoostAmount,
        createActionLoading,
        handleCreateAmountChange,
        handleCreateBoostAmountChange,
        handleCreateBonALICEClicked,
        handleApproveALICEClicked,
        handleApproveALICEForBoosterClicked,
        handleApproveLPTokenClicked,
        isAllowanceModalOpen,
        closeAllowanceModal,
        isMetamaskLoading: isMetamaskLoading || isCreateAndBoostMetamaskLoading,
        isTransactionLoading:
          isTransactionLoading || isCreateAndBoostTransactionLoading,
        isApproveMetamaskLoading:
          approveALICEIsMetamaskLoading ||
          approveLPTokenIsMetamaskLoading ||
          approveALICEForBoosterIsMetamaskLoading,
        isApproveTransactionLoading:
          approveALICEIsTransactionLoading ||
          approveLPTokenIsTransactionLoading ||
          approveALICEForBoosterIsTransactionLoading,
        isInsufficientModalOpen,
        setIsInsufficientModalOpen,
        isSufficientModalOpen,
        setIsSufficientModalOpen,
        newNFTClaimedLoading,
        setNewNFTClaimedLoading,
      }}
    >
      {children}
    </CreateActionContext.Provider>
  );
};

export { CreateActionProvider, CreateActionContext };
