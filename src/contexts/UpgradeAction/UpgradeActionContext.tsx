import { createContext, ReactNode, useEffect, useState } from 'react';
import { BonALICE } from '../../types';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import ALICE_ABI from '../../abis/ALICE.json';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import { useApproveArgs, useLockArgs } from '../../hooks/useContractArgs.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
import BONALICE_ABI from '../../abis/BonALICE.json';
import useALICE from '../ALICE/useALICE.ts';
import useLPToken from '../LPToken/useLPToken.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';

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

  const { LPTokenAllowance, ALICEAllowance } = useBonALICE();
  const { ALICEBalance } = useALICE();
  const { LPTokenBalance } = useLPToken();

  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const { nodeBonALICE } = useMuonNodeStaking();

  const lockArgs = useLockArgs({
    tokenId: upgradeModalSelectedBonALICE?.tokenId,
    ALICEAmount: upgradeAmount,
    LPTokenAmount: upgradeBoostAmount,
    ALICEAllowance: ALICEAllowance,
    LPTokenAllowance: LPTokenAllowance,
  });

  const isSelectedUpgradeBonALICE = (bonALICE: BonALICE) => {
    return (
      !!upgradeModalSelectedBonALICE &&
      upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId
    );
  };

  const {
    callback: lock,
    isMetamaskLoading,
    isTransactionLoading,
    isSuccess,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: lockArgs,
    functionName: 'lock',
    chainId: getCurrentChainId(),
  });

  const handleUpgradeBonALICEClicked = async () => {
    lock?.({
      pending: 'Upgrading Bonded ALICE...',
      success: 'Upgraded!',
      failed: 'Failed to upgrade Bonded ALICE.',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsUpgradeModalOpen(false);
      setUpgradeAmount(w3bNumberFromString(''));
      setUpgradeBoostAmount(w3bNumberFromString(''));
      setUpgradeModalSelectedBonALICE(null);
    }
  }, [isSuccess]);

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
    spenderAddress:
      nodeBonALICE.length > 0 && isSelectedUpgradeBonALICE(nodeBonALICE[0])
        ? MUON_NODE_STAKING_ADDRESS[getCurrentChainId()]
        : BONALICE_ADDRESS[getCurrentChainId()],
    approveAmount: upgradeBoostAmount,
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
    if (!ALICEBalance || !upgradeAmount || upgradeAmount.big > ALICEBalance.big)
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
      !upgradeBoostAmount ||
      upgradeBoostAmount.big > LPTokenBalance.big
    )
      return;
    openAllowanceModal();
    approveLPToken?.({
      pending: 'Waiting for confirmation',
      success: 'Approved',
      failed: 'Error',
    });
  };

  const handleUpgradeBoostAmountChange = (amount: string) => {
    setUpgradeBoostAmount(w3bNumberFromString(amount));
  };

  const handleUpgradeAmountChange = (amount: string) => {
    setUpgradeAmount(w3bNumberFromString(amount));
  };

  const handleUpgradeModalItemClicked = (bonALICE: BonALICE) => {
    if (!upgradeModalSelectedBonALICE) {
      changeUpgradeModalSelectedBonALICE(bonALICE);
      return;
    }
    if (upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
      unselectUpgradeModalSelectedBonALICE();
    } else {
      changeUpgradeModalSelectedBonALICE(bonALICE);
    }
  };

  const changeUpgradeModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setUpgradeModalSelectedBonALICE(bonALICE);
    closeUpgradeModal();
  };

  const unselectUpgradeModalSelectedBonALICE = () => {
    setUpgradeModalSelectedBonALICE(null);
  };

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
        isMetamaskLoading,
        isTransactionLoading,
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
