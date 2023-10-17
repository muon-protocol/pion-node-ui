import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BonALICE } from '../../types';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  BOOSTER_ADDRESS,
  LP_TOKEN_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import ALICE_ABI from '../../abis/ALICE.json';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import {
  useApproveArgs,
  useLockArgs,
  useLockToBondedTokenArgs,
} from '../../hooks/useContractArgs.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
import BONALICE_ABI from '../../abis/BonALICE.ts';
import LP_TOKEN_ABI from '../../abis/LPToken.ts';
import MUON_NODE_STAKING_ABI from '../../abis/MuonNodeStaking.json';
import useALICE from '../ALICE/useALICE.ts';
import useLPToken from '../LPToken/useLPToken.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { useALICEAllowance } from '../../hooks/alice/useALICEAllowance.ts';
// import { useLPTokenAllowance } from '../../hooks/lpToken/useLPTokenAllowance.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import BOOSTER_ABI from '../../abis/Booster.ts';
import { getUserSignatureForBoostAPI } from '../../apis';
import { waitForTransaction, writeContract } from '@wagmi/core';
import toast from 'react-hot-toast';
// import { erc20ABI } from 'wagmi';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  selectedUpgradeBonALICE: BonALICE | null;
  isSelectedUpgradeBonALICE: (bonALICE: BonALICE) => boolean;
  handleUpgradeModalItemClicked: (bonALICE: BonALICE) => void;
  upgradeAmount: W3bNumber;
  upgradeBoostAmount: W3bNumber;
  handleUpgradeBoostAmountChange: (amount: string) => void;
  handleUpgradeAmountChange: (amount: string) => void;
  handleUpgradeBonALICEClicked: () => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
  isApproveMetamaskLoading: boolean;
  isApproveTransactionLoading: boolean;
  handleApproveALICEClicked: () => void;
  handleApproveLPTokenClicked: () => void;
  isAllowanceModalOpen: boolean;
  closeAllowanceModal: () => void;
  setUpgradeModalSelectedBonALICE: (bonALICE: BonALICE) => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  selectedUpgradeBonALICE: null,
  isSelectedUpgradeBonALICE: () => false,
  handleUpgradeModalItemClicked: () => {},
  upgradeAmount: w3bNumberFromString('0'),
  upgradeBoostAmount: w3bNumberFromString('0'),
  handleUpgradeBoostAmountChange: () => {},
  handleUpgradeAmountChange: () => {},
  handleUpgradeBonALICEClicked: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
  isApproveMetamaskLoading: false,
  isApproveTransactionLoading: false,
  handleApproveALICEClicked: () => {},
  handleApproveLPTokenClicked: () => {},
  isAllowanceModalOpen: false,
  closeAllowanceModal: () => {},
  setUpgradeModalSelectedBonALICE: () => {},
});

const UpgradeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalSelectedBonALICE, setUpgradeModalSelectedBonALICE] =
    useState<BonALICE | null>(null);

  const [upgradeAmount, setUpgradeAmount] = useState<W3bNumber>(
    w3bNumberFromString(''),
  );

  const [upgradeBoostAmount, setUpgradeBoostAmount] = useState<W3bNumber>(
    w3bNumberFromString(''),
  );

  const { ALICEAllowance } = useBonALICE();
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance, LPTokenDecimals } = useLPToken();

  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const { nodeBonALICE } = useMuonNodeStaking();

  const { allowanceForMuonNodeStaking: aliceAllowanceForMuon } =
    useALICEAllowance();
  // const { allowanceForMuonNodeStaking: lpTokenAllowanceForMuon } =
  //   useLPTokenAllowance();

  const isSelectedUpgradeBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      return (
        !!upgradeModalSelectedBonALICE &&
        upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId
      );
    },
    [upgradeModalSelectedBonALICE],
  );

  const isNodeBonALICESelected = useMemo(() => {
    if (nodeBonALICE.length > 0) {
      return isSelectedUpgradeBonALICE(nodeBonALICE[0]);
    }
    return false;
  }, [nodeBonALICE, isSelectedUpgradeBonALICE]);

  const lockToBondedTokenArgs = useLockToBondedTokenArgs({
    tokenId: upgradeModalSelectedBonALICE?.tokenId,
    ALICEAmount: upgradeAmount,
    ALICEAllowance: aliceAllowanceForMuon,
  });

  const lockArgs = useLockArgs({
    tokenId: upgradeModalSelectedBonALICE?.tokenId,
    ALICEAmount: upgradeAmount,
    ALICEAllowance: ALICEAllowance,
  });

  const {
    callback: lock,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: lockArgs,
    functionName: 'lock',
    chainId: getCurrentChainId(),
  });

  const {
    callback: lockToBondedToken,
    isMetamaskLoading: lockToBondedTokenIsMetamaskLoading,
    isTransactionLoading: lockToBondedTokenIsTransactionLoading,
  } = useWagmiContractWrite({
    abi: MUON_NODE_STAKING_ABI,
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: lockToBondedTokenArgs
      ? [lockToBondedTokenArgs[1], lockToBondedTokenArgs[2]]
      : [],
    functionName: 'lockToBondedToken',
    chainId: getCurrentChainId(),
  });

  const [isLockUSDCMetamaskLoading, setIsLockUSDCMetamaskLoading] =
    useState(false);
  const [isLockUSDCTransactionLoading, setIsLockUSDCTransactionLoading] =
    useState(false);

  const handleUpgradeBonALICEClicked = async () => {
    if (!walletAddress) return;

    try {
      if (upgradeAmount.dsp > 0) {
        if (isNodeBonALICESelected) {
          await lockToBondedToken?.({
            pending: 'Upgrading Bonded ALICE with ALICE...',
            success:
              upgradeBoostAmount.dsp > 0
                ? 'Upgraded, wait for USDC upgrade...'
                : 'Upgraded!',
            failed: 'Failed to upgrade Bonded ALICE with ALICE!',
          });
        } else {
          await lock?.({
            pending: 'Upgrading Bonded ALICE with ALICE...',
            success:
              upgradeBoostAmount.dsp > 0
                ? 'Upgraded, wait for USDC upgrade...'
                : 'Upgraded!',
            failed: 'Failed to upgrade Bonded ALICE with ALICE!',
          });
        }
      }
      if (upgradeBoostAmount.dsp > 0) {
        const response = await getUserSignatureForBoostAPI(walletAddress);
        if (response.success) {
          setIsLockUSDCMetamaskLoading(true);
          const { hash } = await writeContract({
            abi: BOOSTER_ABI,
            address: BOOSTER_ADDRESS[getCurrentChainId()],
            functionName: 'boost',
            args: [
              upgradeModalSelectedBonALICE?.tokenId,
              upgradeBoostAmount.big,
              response.amount,
              response.timestamp,
              response.signature,
            ],
            chainId: getCurrentChainId(),
          });
          setIsLockUSDCTransactionLoading(true);
          setIsLockUSDCMetamaskLoading(false);
          const transaction = waitForTransaction({ hash });

          await toast.promise(transaction, {
            loading: 'Upgrading Bonded ALICE with USDC...',
            success: 'Upgraded!',
            error: 'Failed to upgrade Bonded ALICE with USDC!',
          });
          setIsLockUSDCTransactionLoading(false);
        }
      }

      setUpgradeAmount(w3bNumberFromString(''));
      setUpgradeBoostAmount(w3bNumberFromString(''));
      setUpgradeModalSelectedBonALICE(null);
      setIsUpgradeModalOpen(false);
    } catch (e) {
      setIsLockUSDCTransactionLoading(false);
      setIsLockUSDCMetamaskLoading(false);
      console.log(e);
    }
  };

  const approveALICEArgs = useApproveArgs({
    spenderAddress:
      nodeBonALICE.length > 0 && isSelectedUpgradeBonALICE(nodeBonALICE[0])
        ? MUON_NODE_STAKING_ADDRESS[getCurrentChainId()]
        : BONALICE_ADDRESS[getCurrentChainId()],
    approveAmount: upgradeAmount,
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
    approveAmount: upgradeBoostAmount,
  });

  const {
    callback: approveLPToken,
    isMetamaskLoading: approveLPTokenIsMetamaskLoading,
    isTransactionLoading: approveLPTokenIsTransactionLoading,
    isSuccess: approveLPTokenIsSuccess,
  } = useWagmiContractWrite({
    abi: LP_TOKEN_ABI,
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

  const handleApproveALICEClicked = useCallback(async () => {
    if (!ALICEBalance || !upgradeAmount || upgradeAmount.big > ALICEBalance.big)
      return;
    openAllowanceModal();
    await approveALICE?.({
      pending: 'Waiting for confirmation',
      success: 'Approved',
      failed: 'Error',
    });
  }, [approveALICE, ALICEBalance, upgradeAmount]);

  const handleApproveLPTokenClicked = useCallback(async () => {
    if (
      !LPTokenBalance ||
      !upgradeBoostAmount ||
      upgradeBoostAmount.big > LPTokenBalance.big
    )
      return;
    console.log('approveLPToken');
    openAllowanceModal();
    await approveLPToken?.({
      pending: 'Waiting for confirmation...',
      success: 'Approved',
      failed: 'Error',
    });
  }, [approveLPToken, LPTokenBalance, upgradeBoostAmount]);

  const handleUpgradeBoostAmountChange = useCallback(
    (amount: string) => {
      setUpgradeBoostAmount(w3bNumberFromString(amount, LPTokenDecimals));
    },
    [LPTokenDecimals],
  );

  const handleUpgradeAmountChange = useCallback((amount: string) => {
    setUpgradeAmount(w3bNumberFromString(amount));
  }, []);

  const changeUpgradeModalSelectedBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      setUpgradeModalSelectedBonALICE(bonALICE);
      closeUpgradeModal();
    },
    [],
  );

  const unselectUpgradeModalSelectedBonALICE = useCallback(() => {
    setUpgradeModalSelectedBonALICE(null);
  }, []);

  const handleUpgradeModalItemClicked = useCallback(
    (bonALICE: BonALICE) => {
      if (!upgradeModalSelectedBonALICE) {
        changeUpgradeModalSelectedBonALICE(bonALICE);
        return;
      }
      if (upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
        unselectUpgradeModalSelectedBonALICE();
      } else {
        changeUpgradeModalSelectedBonALICE(bonALICE);
      }
    },
    [
      changeUpgradeModalSelectedBonALICE,
      unselectUpgradeModalSelectedBonALICE,
      upgradeModalSelectedBonALICE,
    ],
  );

  const { walletAddress } = useUserProfile();
  const { hasNodeBonALICE } = useMuonNodeStaking();

  useEffect(() => {
    if (
      upgradeModalSelectedBonALICE ||
      upgradeAmount.dsp > 0 ||
      upgradeBoostAmount.dsp > 0
    )
      return;
    setUpgradeModalSelectedBonALICE(null);
    setUpgradeAmount(w3bNumberFromString(''));
    setUpgradeBoostAmount(w3bNumberFromString(''));
    if (hasNodeBonALICE) {
      setUpgradeModalSelectedBonALICE(nodeBonALICE[0]);
    }
  }, [
    walletAddress,
    hasNodeBonALICE,
    nodeBonALICE,
    upgradeModalSelectedBonALICE,
    upgradeAmount.dsp,
    upgradeBoostAmount.dsp,
  ]);

  useEffect(() => {
    setUpgradeModalSelectedBonALICE(null);
    setUpgradeAmount(w3bNumberFromString(''));
    setUpgradeBoostAmount(w3bNumberFromString(''));
    if (hasNodeBonALICE) {
      setUpgradeModalSelectedBonALICE(nodeBonALICE[0]);
    }
  }, [walletAddress, hasNodeBonALICE, nodeBonALICE]);

  const openUpgradeModal = () => setIsUpgradeModalOpen(true);
  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  const openAllowanceModal = () => setIsAllowanceModalOpen(true);
  const closeAllowanceModal = () => setIsAllowanceModalOpen(false);

  return (
    <UpgradeActionContext.Provider
      value={{
        isUpgradeModalOpen,
        openUpgradeModal,
        closeUpgradeModal,
        selectedUpgradeBonALICE: upgradeModalSelectedBonALICE,
        isSelectedUpgradeBonALICE,
        handleUpgradeModalItemClicked,
        upgradeAmount,
        upgradeBoostAmount,
        handleUpgradeAmountChange,
        handleUpgradeBoostAmountChange,
        handleUpgradeBonALICEClicked,
        isMetamaskLoading:
          lockToBondedTokenIsMetamaskLoading ||
          isMetamaskLoading ||
          isLockUSDCMetamaskLoading,
        isTransactionLoading:
          lockToBondedTokenIsTransactionLoading ||
          isTransactionLoading ||
          isLockUSDCTransactionLoading,
        isAllowanceModalOpen,
        closeAllowanceModal,
        isApproveMetamaskLoading:
          approveALICEIsMetamaskLoading || approveLPTokenIsMetamaskLoading,
        isApproveTransactionLoading:
          approveALICEIsTransactionLoading ||
          approveLPTokenIsTransactionLoading,
        handleApproveALICEClicked,
        handleApproveLPTokenClicked,
        setUpgradeModalSelectedBonALICE,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
