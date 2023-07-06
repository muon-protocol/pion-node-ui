import { createContext, ReactNode, useState } from 'react';
import { BonALICE } from '../../types';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromNumber, w3bNumberFromString } from '../../utils/web3.ts';
import useApprove from '../../hooks/useApprove.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import ALICE_ABI from '../../abis/ALICE.json';
import LP_TOKEN_ABI from '../../abis/LPToken.json';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import { useLockArgs } from '../../hooks/useContractArgs.ts';
import useBonALICE from '../BonALICE/useBonALICE.ts';
import BONALICE_ABI from '../../abis/BonALICE.json';

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
  ALICEApprove: () => void;
  LPTokenApprove: () => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  selectedUpgradeBonALICE: null,
  isSelectedUpgradeBonALICE: () => false,
  handleUpgradeModalItemClicked: () => {},
  upgradeAmount: w3bNumberFromNumber(0),
  upgradeBoostAmount: w3bNumberFromNumber(0),
  handleUpgradeBoostAmountChange: () => {},
  handleUpgradeAmountChange: () => {},
  handleUpgradeBonALICEClicked: () => {},
  ALICEApprove: () => {},
  LPTokenApprove: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
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

  const lockArgs = useLockArgs({
    tokenId: upgradeModalSelectedBonALICE?.tokenId,
    ALICEAmount: upgradeAmount,
    LPTokenAmount: upgradeBoostAmount,
    ALICEAllowance: ALICEAllowance,
    LPTokenAllowance: LPTokenAllowance,
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

  const { approve: ALICEApprove } = useApprove(
    ALICE_ABI,
    ALICE_ADDRESS[getCurrentChainId()],
    upgradeAmount,
  );

  const { approve: LPTokenApprove } = useApprove(
    LP_TOKEN_ABI,
    LP_TOKEN_ADDRESS[getCurrentChainId()],
    upgradeAmount,
  );

  const handleUpgradeBonALICEClicked = async () => {
    const result = await lock?.({
      pending: 'Locking...',
      success: 'Locked!',
      failed: 'Failed to lock.',
    });
    console.log(result);
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

  const isSelectedUpgradeBonALICE = (bonALICE: BonALICE) => {
    return (
      !!upgradeModalSelectedBonALICE &&
      upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId
    );
  };

  const openUpgradeModal = () => setIsUpgradeModalOpen(true);
  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

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
        ALICEApprove,
        LPTokenApprove,
        isMetamaskLoading,
        isTransactionLoading,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
