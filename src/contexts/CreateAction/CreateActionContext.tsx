import { createContext, ReactNode, useEffect, useState } from 'react';
import useALICE from '../ALICE/useALICE.ts';
import BONALICE_ABI from '../../abis/BonALICE.json';
import { ALICE_ABI } from '../../abis/ALICE.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
import useLPToken from '../LPToken/useLPToken.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import {
  useApproveArgs,
  useMintAndLockArgs,
} from '../../hooks/useContractArgs.ts';

const CreateActionContext = createContext<{
  createAmount: W3bNumber;
  createBoostAmount: W3bNumber;
  createActionLoading: boolean;
  handleCreateAmountChange: (amount: string) => void;
  handleCreateBoostAmountChange: (amount: string) => void;
  handleCreateBonALICEClicked: () => void;
  handleApproveALICEClicked: () => void;
  handleApproveLPTokenClicked: () => void;
  isAllowanceModalOpen: boolean;
  closeAllowanceModal: () => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
  isApproveMetamaskLoading: boolean;
  isApproveTransactionLoading: boolean;
}>({
  createAmount: w3bNumberFromString(''),
  createBoostAmount: w3bNumberFromString(''),
  createActionLoading: false,
  handleCreateAmountChange: () => {},
  handleCreateBoostAmountChange: () => {},
  handleCreateBonALICEClicked: () => {},
  handleApproveALICEClicked: () => {},
  handleApproveLPTokenClicked: () => {},
  isAllowanceModalOpen: false,
  closeAllowanceModal: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
  isApproveMetamaskLoading: false,
  isApproveTransactionLoading: false,
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance } = useLPToken();
  const { ALICEAllowance, LPTokenAllowance } = useBonALICE();
  const { walletAddress } = useUserProfile();

  const [createActionLoading, setCreateActionLoading] = useState(false);

  const [createAmount, setCreateAmount] = useState<W3bNumber>(
    w3bNumberFromString(''),
  );
  const [createBoostAmount, setCreateBoostAmount] = useState<W3bNumber>(
    w3bNumberFromString(''),
  );

  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const handleCreateAmountChange = (amount: string) => {
    setCreateAmount(w3bNumberFromString(amount));
  };

  const handleCreateBoostAmountChange = (amount: string) => {
    setCreateBoostAmount(w3bNumberFromString(amount));
  };

  const handleCreateBonALICEClicked = () => {
    if (
      !ALICEBalance ||
      !createAmount ||
      Number(createAmount) > Number(ALICEBalance.big)
    )
      return;
    setCreateActionLoading(true);

    mintAndLock?.({
      pending: 'Waiting for confirmation',
      success: 'Success',
      failed: 'Error',
    });

    setCreateActionLoading(false);
  };

  const mintAndLockArgs = useMintAndLockArgs({
    walletAddress: walletAddress,
    ALICEAmount: createAmount,
    LPTokenAmount: createBoostAmount,
    ALICEAllowance: ALICEAllowance,
    LPTokenAllowance: LPTokenAllowance,
    ALICEAddress: ALICE_ADDRESS[getCurrentChainId()],
    LPTokenAddress: LP_TOKEN_ADDRESS[getCurrentChainId()],
  });

  const {
    callback: mintAndLock,
    isMetamaskLoading,
    isTransactionLoading,
    isSuccess,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: mintAndLockArgs,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (isSuccess) {
      setCreateAmount(w3bNumberFromString(''));
      setCreateBoostAmount(w3bNumberFromString(''));
    }
  }, [isSuccess]);

  const approveALICEArgs = useApproveArgs({
    spenderAddress: BONALICE_ADDRESS[getCurrentChainId()],
    approveAmount: createAmount,
  });

  const {
    callback: approveALICE,
    isMetamaskLoading: ALICEIsMetamaskLoading,
    isTransactionLoading: ALICELPTokenIsTransactionLoading,
    isSuccess: approveALICEIsSuccess,
  } = useWagmiContractWrite({
    abi: ALICE_ABI,
    address: ALICE_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: approveALICEArgs,
    chainId: getCurrentChainId(),
  });

  useEffect(() => {
    if (approveALICEIsSuccess) {
      setIsAllowanceModalOpen(false);
    }
  }, [approveALICEIsSuccess]);

  const approveLPTokenArgs = useApproveArgs({
    spenderAddress: BONALICE_ADDRESS[getCurrentChainId()],
    approveAmount: createBoostAmount,
  });

  const {
    callback: approveLPToken,
    isMetamaskLoading: LPTokenIsMetamaskLoading,
    isTransactionLoading: LPTokenIsTransactionLoading,
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
    if (
      !ALICEBalance ||
      !createAmount ||
      Number(createAmount) > Number(ALICEBalance.big)
    )
      return;
    openAllowanceModal();
    approveALICE?.({
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

  useEffect(() => {
    if (
      ALICEAllowance &&
      createAmount &&
      Number(createAmount.big) <= Number(ALICEAllowance.big)
    )
      closeAllowanceModal();
  }, [ALICEAllowance, createAmount]);

  const openAllowanceModal = () => setIsAllowanceModalOpen(true);
  const closeAllowanceModal = () => setIsAllowanceModalOpen(false);

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
        handleApproveLPTokenClicked,
        isAllowanceModalOpen,
        closeAllowanceModal,
        isMetamaskLoading,
        isTransactionLoading,
        isApproveMetamaskLoading:
          ALICEIsMetamaskLoading || LPTokenIsMetamaskLoading,
        isApproveTransactionLoading:
          ALICELPTokenIsTransactionLoading || LPTokenIsTransactionLoading,
      }}
    >
      {children}
    </CreateActionContext.Provider>
  );
};

export { CreateActionProvider, CreateActionContext };
