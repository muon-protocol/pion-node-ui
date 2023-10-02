import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useALICE from '../ALICE/useALICE.ts';
import BONALICE_ABI from '../../abis/BonALICE.json';
import BOOSTER_ABI from '../../abis/Booster.ts';
import ALICE_ABI from '../../abis/ALICE.ts';
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
import {
  useApproveArgs,
  useMintAndLockArgs,
} from '../../hooks/useContractArgs.ts';
import { useQuery } from '@apollo/client';
import { USER_BON_ALICES } from '../../apollo/queries.ts';
import { writeContract } from '@wagmi/core';

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
  isInsufficientModalOpen: boolean;
  setIsInsufficientModalOpen: (isOpen: boolean) => void;
  isSufficientModalOpen: boolean;
  setIsSufficientModalOpen: (isOpen: boolean) => void;
  setNewNFTClaimedLoading: (value: boolean) => void;
  newNFTClaimedLoading: boolean;
  boostingLoading: boolean;
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
  isInsufficientModalOpen: false,
  setIsInsufficientModalOpen: () => {},
  isSufficientModalOpen: false,
  setIsSufficientModalOpen: () => {},
  setNewNFTClaimedLoading: () => {},
  newNFTClaimedLoading: false,
  boostingLoading: false,
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance } = useLPToken();
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

  const handleCreateAmountChange = (amount: string) => {
    setCreateAmount(w3bNumberFromString(amount));
  };

  const handleCreateBoostAmountChange = (amount: string) => {
    setCreateBoostAmount(w3bNumberFromString(amount));
  };

  const mintAndLockArgs = useMintAndLockArgs({
    walletAddress: walletAddress,
    ALICEAmount: createAmount,
    // LPTokenAmount: createBoostAmount,
    ALICEAllowance: ALICEAllowance,
    // LPTokenAllowance: LPTokenAllowance,
    ALICEAddress: ALICE_ADDRESS[getCurrentChainId()],
    // LPTokenAddress: LP_TOKEN_ADDRESS[getCurrentChainId()],
  });

  const {
    callback: mintAndLock,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: mintAndLockArgs,
    chainId: getCurrentChainId(),
  });

  const [boostingLoading, setBoostingLoading] = useState(false);

  const { refetch: BonALICERefetch } = useQuery(USER_BON_ALICES, {
    variables: { account: walletAddress },
  });

  const boostNewNFT = useCallback(() => {
    if (createBoostAmount.dsp === 0) {
      setCreateAmount(w3bNumberFromString(''));
      setCreateBoostAmount(w3bNumberFromString(''));
      return;
    }
    setBoostingLoading(true);
    setTimeout(() => {
      BonALICERefetch({ account: walletAddress })
        .then(async ({ data }) => {
          const tokens = data.accountTokenIds;
          // find token with maximum tokenId
          const lastNFT = tokens.reduce((prev, current) =>
            prev.tokenId > current.tokenId ? prev : current,
          );
          const { hash: boostSuccess } = await writeContract({
            abi: BOOSTER_ABI,
            address: BOOSTER_ADDRESS[getCurrentChainId()],
            functionName: 'boost',
            args: [lastNFT.tokenId, createBoostAmount.big],
          });

          console.log(boostSuccess);
          if (createAmount.dsp < 10000) {
            setIsInsufficientModalOpen(true);
          } else {
            if (!newNFTClaimedLoading) {
              setNewNFTClaimedLoading(true);
              setTimeout(() => {
                setNewNFTClaimedLoading(false);
              }, 10000);
            }
            setIsSufficientModalOpen(true);
          }
          setCreateAmount(w3bNumberFromString(''));
          setCreateBoostAmount(w3bNumberFromString(''));
          setBoostingLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setBoostingLoading(false);
        });
    }, 4000);
  }, [
    BonALICERefetch,
    walletAddress,
    createBoostAmount,
    createAmount,
    newNFTClaimedLoading,
  ]);

  const handleCreateBonALICEClicked = async () => {
    if (!ALICEBalance || !createAmount || createAmount.big > ALICEBalance.big)
      return;
    setCreateActionLoading(true);

    try {
      await mintAndLock?.({
        pending: 'Waiting for confirmation...',
        success:
          createBoostAmount.dsp > 0
            ? 'BonALICE created, wait for boost...'
            : 'BonALICE created!',
        failed: 'Error',
      });

      boostNewNFT();
    } catch (error) {
      console.log(error);
      setBoostingLoading(false);
    }

    setCreateActionLoading(false);
  };

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

  useEffect(() => {
    if (approveALICEIsSuccess) {
      setIsAllowanceModalOpen(false);
    }
  }, [approveALICEIsSuccess]);

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
          approveALICEIsMetamaskLoading || approveLPTokenIsMetamaskLoading,
        isApproveTransactionLoading:
          approveALICEIsTransactionLoading ||
          approveLPTokenIsTransactionLoading,
        isInsufficientModalOpen,
        setIsInsufficientModalOpen,
        isSufficientModalOpen,
        setIsSufficientModalOpen,
        newNFTClaimedLoading,
        setNewNFTClaimedLoading,
        boostingLoading,
      }}
    >
      {children}
    </CreateActionContext.Provider>
  );
};

export { CreateActionProvider, CreateActionContext };
