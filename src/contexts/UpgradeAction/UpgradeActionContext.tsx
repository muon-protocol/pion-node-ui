import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  // useMemo,
  useState,
} from 'react';
import { BonALICE } from '../../types';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';
import {
  ALICE_ADDRESS,
  // BONALICE_ADDRESS,
  BOOSTER_ADDRESS,
  LP_TOKEN_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
  // MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import ALICE_ABI from '../../abis/PION/Mainnet/Token.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import {
  useApproveArgs,
  useLockArgs,
  // useLockToBondedTokenArgs,
} from '../../hooks/useContractArgs.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
// import BONALICE_ABI from '../../abis/PION/Mainnet/NFT.ts';
import LP_TOKEN_ABI from '../../abis/PION/Mainnet/LPToken.ts';
import MUON_NODE_STAKING_ABI from '../../abis/PION/Mainnet/MuonNodeStaking.ts';
import useALICE from '../ALICE/useALICE.ts';
import useLPToken from '../LPToken/useLPToken.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
// import { useALICEAllowance } from '../../hooks/alice/useALICEAllowance.ts';
// import { useLPTokenAllowance } from '../../hooks/lpToken/useLPTokenAllowance.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import BOOSTER_ABI from '../../abis/PION/BSCTestnet/Booster.ts';
// import { getUserSignatureForBoostAPI } from '../../apis';
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

  const openUpgradeModal = useCallback(() => setIsUpgradeModalOpen(true), []);
  const closeUpgradeModal = useCallback(() => setIsUpgradeModalOpen(false), []);

  const openAllowanceModal = useCallback(
    () => setIsAllowanceModalOpen(true),
    [],
  );
  const closeAllowanceModal = useCallback(
    () => setIsAllowanceModalOpen(false),
    [],
  );

  const { ALICEAllowanceForBooster } = useBonALICE();
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance, LPTokenDecimals } = useLPToken();

  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const { nodeBonALICE } = useMuonNodeStaking();

  // const { allowanceForMuonNodeStaking: aliceAllowanceForMuon } =
  //   useALICEAllowance();

  const isSelectedUpgradeBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      return (
        !!upgradeModalSelectedBonALICE &&
        upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId
      );
    },
    [upgradeModalSelectedBonALICE],
  );
  //
  const isNodeBonALICESelected = useMemo(() => {
    if (nodeBonALICE.length > 0) {
      return isSelectedUpgradeBonALICE(nodeBonALICE[0]);
    }
    return false;
  }, [nodeBonALICE, isSelectedUpgradeBonALICE]);

  // const lockToBondedTokenArgs = useLockToBondedTokenArgs({
  //   tokenId: upgradeModalSelectedBonALICE?.tokenId,
  //   ALICEAmount: upgradeAmount,
  //   ALICEAllowance: aliceAllowanceForMuon,
  // });

  const lockArgs = useLockArgs({
    tokenId: upgradeModalSelectedBonALICE?.tokenId,
    ALICEAmount: upgradeAmount,
    ALICEAllowance: ALICEAllowanceForBooster,
  });

  const {
    callback: lock,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    abi: BOOSTER_ABI,
    address: BOOSTER_ADDRESS[getCurrentChainId()],
    args: lockArgs,
    functionName: 'boost',
    chainId: getCurrentChainId(),
  });

  // const {
  //   callback: lockToBondedToken,
  //   isMetamaskLoading: lockToBondedTokenIsMetamaskLoading,
  //   isTransactionLoading: lockToBondedTokenIsTransactionLoading,
  // } = useWagmiContractWrite({
  //   abi: MUON_NODE_STAKING_ABI,
  //   address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
  //   args: lockToBondedTokenArgs
  //     ? [lockToBondedTokenArgs[1], lockToBondedTokenArgs[2]]
  //     : undefined,
  //   functionName: 'lockToBondedToken',
  //   chainId: getCurrentChainId(),
  // });

  const {
    callback: updateStaking,
    isMetamaskLoading: updateStakingIsMetamaskLoading,
    isTransactionLoading: updateStakingIsTransactionLoading,
  } = useWagmiContractWrite({
    abi: MUON_NODE_STAKING_ABI,
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: [],
    functionName: 'updateStaking',
    chainId: getCurrentChainId(),
  });

  const [isLockUSDCMetamaskLoading, setIsLockUSDCMetamaskLoading] =
    useState(false);
  const [isLockUSDCTransactionLoading, setIsLockUSDCTransactionLoading] =
    useState(false);

  const handleUpgradeBonALICEClicked = async () => {
    if (!walletAddress) return;
    if (!(upgradeAmount.big > BigInt(0))) return;

    try {
      console.log('upgradeAmount', upgradeAmount);
      console.log('lockArgs', lockArgs);
      console.log('lock', lock);
      await lock?.({
        pending: 'Upgrading Bonded PION with PION...',
        success: 'Upgraded!',
        failed: 'Failed to upgrade Bonded PION with PION!',
      });

      if (isNodeBonALICESelected) {
        toast('Updating your node ...');

        await updateStaking?.({
          pending: 'Wait for updating your node ...',
          success: 'Updated!',
          failed: 'Failed to update node!',
        });
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

  // const handleUpgradeBonALICEClickedOldVersionWithUSDC = async () => {
  //   if (!walletAddress) return;
  //
  //   try {
  //     if (upgradeAmount.dsp > 0) {
  //       if (isNodeBonALICESelected) {
  //         await lockToBondedToken?.({
  //           pending: 'Upgrading Bonded PION with PION...',
  //           success:
  //             upgradeBoostAmount.dsp > 0
  //               ? 'Upgraded, wait for USDC upgrade...'
  //               : 'Upgraded!',
  //           failed: 'Failed to upgrade Bonded PION with PION!',
  //         });
  //       } else {
  //         await lock?.({
  //           pending: 'Upgrading Bonded PION with PION...',
  //           success:
  //             upgradeBoostAmount.dsp > 0
  //               ? 'Upgraded, wait for USDC upgrade...'
  //               : 'Upgraded!',
  //           failed: 'Failed to upgrade Bonded PION with PION!',
  //         });
  //       }
  //     }
  //     if (upgradeBoostAmount.dsp > 0) {
  //       const response = await getUserSignatureForBoostAPI(walletAddress);
  //       if (response.success) {
  //         setIsLockUSDCMetamaskLoading(true);
  //         const { hash } = await writeContract({
  //           abi: BOOSTER_ABI,
  //           address: BOOSTER_ADDRESS[getCurrentChainId()],
  //           functionName: 'boost',
  //           args: [
  //             upgradeModalSelectedBonALICE?.tokenId,
  //             upgradeBoostAmount.big,
  //             response.amount,
  //             response.timestamp,
  //             response.signature,
  //           ],
  //           chainId: getCurrentChainId(),
  //         });
  //         setIsLockUSDCMetamaskLoading(false);
  //         if (!hash)
  //           throw new Error(
  //             'Failed to boost bonded PION with USDC! (No hash returned)',
  //           );
  //         setIsLockUSDCTransactionLoading(true);
  //         const transaction = waitForTransaction({ hash });
  //         await toast.promise(transaction, {
  //           loading: 'Boosting bonded PION with USDC...',
  //           success: 'Boosted!',
  //           error: 'Failed to boost bonded PION with USDC!',
  //         });
  //         setIsLockUSDCTransactionLoading(false);
  //       }
  //
  //       if (isNodeBonALICESelected) {
  //         toast('Updating your node ...');
  //
  //         await updateStaking?.({
  //           pending: 'Wait for updating your node ...',
  //           success: 'Updated!',
  //           failed: 'Failed to update node!',
  //         });
  //       }
  //     }
  //
  //     setUpgradeAmount(w3bNumberFromString(''));
  //     setUpgradeBoostAmount(w3bNumberFromString(''));
  //     setUpgradeModalSelectedBonALICE(null);
  //     setIsUpgradeModalOpen(false);
  //   } catch (e) {
  //     setIsLockUSDCTransactionLoading(false);
  //     setIsLockUSDCMetamaskLoading(false);
  //     console.log(e);
  //   }
  // };

  const approveALICEArgs = useApproveArgs({
    spenderAddress: BOOSTER_ADDRESS[getCurrentChainId()],
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

  // const approveLPTokenArgs = useApproveArgs({
  //   spenderAddress: BOOSTER_ADDRESS[getCurrentChainId()],
  //   approveAmount: upgradeBoostAmount,
  // });

  // const {
  //   callback: approveLPToken,
  //   isMetamaskLoading: approveLPTokenIsMetamaskLoading,
  //   isTransactionLoading: approveLPTokenIsTransactionLoading,
  //   isSuccess: approveLPTokenIsSuccess,
  // } = useWagmiContractWrite({
  //   abi: LP_TOKEN_ABI,
  //   address: LP_TOKEN_ADDRESS[getCurrentChainId()],
  //   functionName: 'approve',
  //   args: approveLPTokenArgs,
  //   chainId: getCurrentChainId(),
  // });

  const [approveLPTokenIsMetamaskLoading, setApproveLPTokenIsMetamaskLoading] =
    useState(false);
  const [
    approveLPTokenIsTransactionLoading,
    setApproveLPTokenIsTransactionLoading,
  ] = useState(false);

  const handleApproveALICEClicked = useCallback(async () => {
    if (!ALICEBalance || !upgradeAmount || upgradeAmount.big > ALICEBalance.big)
      return;
    openAllowanceModal();
    await approveALICE?.({
      pending: 'Waiting for confirmation',
      success: 'Approved',
      failed: 'Error',
    });
  }, [ALICEBalance, upgradeAmount, openAllowanceModal, approveALICE]);

  const handleApproveLPTokenClicked = useCallback(async () => {
    if (
      !LPTokenBalance ||
      !upgradeBoostAmount ||
      upgradeBoostAmount.big > LPTokenBalance.big
    )
      return;
    openAllowanceModal();

    try {
      setApproveLPTokenIsMetamaskLoading(true);
      const { hash } = await writeContract({
        abi: LP_TOKEN_ABI,
        address: LP_TOKEN_ADDRESS[getCurrentChainId()],
        functionName: 'approve',
        args: [BOOSTER_ADDRESS[getCurrentChainId()], upgradeBoostAmount.big],
        chainId: getCurrentChainId(),
      });
      setApproveLPTokenIsMetamaskLoading(false);
      if (!hash) return;

      setApproveLPTokenIsTransactionLoading(true);
      const transaction = waitForTransaction({ hash });

      await toast.promise(transaction, {
        loading: 'Approving...',
        success: 'Approved',
        error: 'Error',
      });
      setApproveLPTokenIsTransactionLoading(false);
      setIsAllowanceModalOpen(false);
    } catch (e) {
      setApproveLPTokenIsTransactionLoading(false);
      setApproveLPTokenIsMetamaskLoading(false);
      console.log(e);
    }
  }, [LPTokenBalance, openAllowanceModal, upgradeBoostAmount]);

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
    [closeUpgradeModal],
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
          isMetamaskLoading ||
          isLockUSDCMetamaskLoading ||
          updateStakingIsMetamaskLoading,
        isTransactionLoading:
          isTransactionLoading ||
          isLockUSDCTransactionLoading ||
          updateStakingIsTransactionLoading,
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
