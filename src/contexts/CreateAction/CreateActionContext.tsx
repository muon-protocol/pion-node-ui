import { createContext, ReactNode, useEffect, useState } from 'react';
import useALICE from '../ALICE/useALICE.ts';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
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
import {
  NotificationSources,
  NotificationStatuses,
  NotificationType,
} from '../../types';
import useNotifications from '../Notifications/useNotifications.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
import useLPToken from '../LPToken/useLPToken.ts';

const CreateActionContext = createContext<{
  createAmount: W3bNumber;
  createBoostAmount: W3bNumber;
  createActionLoading: boolean;
  handleCreateAmountChange: (amount: string) => void;
  handleCreateBoostAmountChange: (amount: string) => void;
  handleCreateBonALICEClicked: () => void;
  handleApproveBonALICEClicked: () => void;
  handleApproveLPTokenClicked: () => void;
  isAllowanceModalOpen: boolean;
  closeAllowanceModal: () => void;
  approveBonALICELoading: boolean;
  approveLPTokenLoading: boolean;
  mintAndLockIsLoading: boolean;
  mintAndLockWithBoostIsLoading: boolean;
  writeMintAndLockIsLoading: boolean;
  writeMintAndLockWithBoostIsLoading: boolean;
}>({
  createAmount: {
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  },
  createBoostAmount: {
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  },
  createActionLoading: false,
  handleCreateAmountChange: () => {},
  handleCreateBoostAmountChange: () => {},
  handleCreateBonALICEClicked: () => {},
  handleApproveBonALICEClicked: () => {},
  handleApproveLPTokenClicked: () => {},
  isAllowanceModalOpen: false,
  closeAllowanceModal: () => {},
  approveBonALICELoading: false,
  approveLPTokenLoading: false,
  mintAndLockIsLoading: false,
  mintAndLockWithBoostIsLoading: false,
  writeMintAndLockIsLoading: false,
  writeMintAndLockWithBoostIsLoading: false,
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance } = useLPToken();
  const { ALICEAllowance } = useBonALICE();
  const { walletAddress } = useUserProfile();
  const { addNotification, removeNotification } = useNotifications();
  const [notifId, setNotifId] = useState<string | null>(null);

  const [createActionLoading, setCreateActionLoading] = useState(false);
  const [createAmount, setCreateAmount] = useState<W3bNumber>({
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  });

  const [createBoostAmount, setCreateBoostAmount] = useState<W3bNumber>({
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  });

  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const handleCreateAmountChange = (amount: string) => {
    setCreateAmount(w3bNumberFromString(amount));
  };

  const handleCreateBoostAmountChange = (amount: string) => {
    setCreateBoostAmount(w3bNumberFromString(amount));
  };

  const {
    config: mintAndLockConfigWithBoost,
    isLoading: mintAndLockWithBoostIsLoading,
  } = usePrepareContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: [
      [
        ALICE_ADDRESS[getCurrentChainId()],
        LP_TOKEN_ADDRESS[getCurrentChainId()],
      ],
      [createAmount.big, createBoostAmount.big],
      walletAddress,
    ],
    chainId: getCurrentChainId(),
  });

  const { config: mintAndLockConfig, isLoading: mintAndLockIsLoading } =
    usePrepareContractWrite({
      abi: BONALICE_ABI,
      address: BONALICE_ADDRESS[getCurrentChainId()],
      functionName: 'mintAndLock',
      args: [
        [ALICE_ADDRESS[getCurrentChainId()]],
        [createAmount.big],
        walletAddress,
      ],
      chainId: getCurrentChainId(),
    });

  const {
    write: mintAndLockWrite,
    data: mintAndLockData,
    isLoading: writeMintAndLockIsLoading,
  } = useContractWrite(mintAndLockConfig);
  const {
    write: mintAndLockWriteWithBoost,
    data: mintAndLockWithBoostData,
    isLoading: writeMintAndLockWithBoostIsLoading,
  } = useContractWrite(mintAndLockConfigWithBoost);

  useEffect(() => {
    if (mintAndLockData || mintAndLockWithBoostData) {
      addNotification({
        id: '',
        hash: mintAndLockData?.hash || mintAndLockWithBoostData?.hash || null,
        source: NotificationSources.MINT_AND_LOCK,
        message: 'Waiting for confirmation',
        status: NotificationStatuses.PENDING,
        type: NotificationType.PROMISE,
      });
    }
  }, [addNotification, mintAndLockData, mintAndLockWithBoostData]);

  const handleCreateBonALICEClicked = () => {
    if (
      !ALICEBalance ||
      !createAmount ||
      Number(createAmount) > Number(ALICEBalance.big)
    )
      return;
    setCreateActionLoading(true);
    if (createBoostAmount.big > BigInt(0)) {
      mintAndLockWriteWithBoost?.();
    } else {
      mintAndLockWrite?.();
    }
    setCreateActionLoading(false);
  };

  const { config: approveBonAliceConfig } = usePrepareContractWrite({
    abi: ALICE_ABI,
    address: ALICE_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: [BONALICE_ADDRESS[getCurrentChainId()], createAmount.big],
    chainId: getCurrentChainId(),
  });

  const {
    write: approveBonALICEWrite,
    isLoading: approveBonALICELoading,
    data: approveBonALICEData,
    isSuccess: approveBonALICESuccess,
  } = useContractWrite(approveBonAliceConfig);

  const { config: approveLPTokenConfig } = usePrepareContractWrite({
    abi: ALICE_ABI,
    address: LP_TOKEN_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: [BONALICE_ADDRESS[getCurrentChainId()], createBoostAmount.big],
    chainId: getCurrentChainId(),
  });

  const {
    write: approveLPTokenWrite,
    isLoading: approveLPTokenLoading,
    data: approveLPTokenData,
    isSuccess: approveLPTokenSuccess,
  } = useContractWrite(approveLPTokenConfig);

  useEffect(() => {
    if (approveBonALICELoading || approveLPTokenLoading) {
      if (!notifId) {
        const id = Math.random().toString();
        addNotification({
          id: id,
          hash: null,
          source: NotificationSources.ALLOWANCE,
          message: 'Waiting for confirmation',
          status: NotificationStatuses.PENDING,
          type: NotificationType.PENDING,
        });
        setNotifId(id);
      }
    } else {
      if (notifId) {
        removeNotification(notifId);
        setNotifId(null);
      }
    }
  }, [
    approveBonALICELoading,
    notifId,
    removeNotification,
    addNotification,
    approveLPTokenLoading,
    mintAndLockIsLoading,
    mintAndLockWithBoostIsLoading,
  ]);

  useEffect(() => {
    if (approveBonALICESuccess) closeAllowanceModal();
    if (approveBonALICEData)
      addNotification({
        id: '',
        hash: approveBonALICEData.hash,
        source: NotificationSources.ALLOWANCE,
        message: 'Waiting for confirmation',
        status: NotificationStatuses.PENDING,
        type: NotificationType.PROMISE,
      });
  }, [approveBonALICEData, approveBonALICESuccess, addNotification]);

  useEffect(() => {
    if (approveLPTokenSuccess) closeAllowanceModal();
    if (approveLPTokenData)
      addNotification({
        id: '',
        hash: approveLPTokenData.hash,
        source: NotificationSources.ALLOWANCE,
        message: 'Waiting for confirmation',
        status: NotificationStatuses.PENDING,
        type: NotificationType.PROMISE,
      });
  }, [approveLPTokenData, approveLPTokenSuccess, addNotification]);

  const handleApproveBonALICEClicked = () => {
    if (
      !ALICEBalance ||
      !createAmount ||
      Number(createAmount) > Number(ALICEBalance.big)
    )
      return;
    openAllowanceModal();
    approveBonALICEWrite?.();
  };

  const handleApproveLPTokenClicked = () => {
    if (
      !LPTokenBalance ||
      !createBoostAmount ||
      Number(createBoostAmount) > Number(LPTokenBalance.big)
    )
      return;
    openAllowanceModal();
    approveLPTokenWrite?.();
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
        handleApproveBonALICEClicked,
        handleApproveLPTokenClicked,
        isAllowanceModalOpen,
        closeAllowanceModal,
        approveBonALICELoading,
        approveLPTokenLoading,
        mintAndLockIsLoading,
        mintAndLockWithBoostIsLoading,
        writeMintAndLockIsLoading,
        writeMintAndLockWithBoostIsLoading,
      }}
    >
      {children}
    </CreateActionContext.Provider>
  );
};

export { CreateActionProvider, CreateActionContext };
