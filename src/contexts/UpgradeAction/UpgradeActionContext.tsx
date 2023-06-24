import { createContext, ReactNode, useState } from 'react';
import { BonALICE } from '../../types';
import useALICE from '../ALICE/useALICE.ts';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  selectedUpgradeBonALICE: BonALICE | null;
  isSelectedUpgradeBonALICE: (bonALICE: BonALICE) => boolean;
  handleUpgradeModalItemClicked: (bonALICE: BonALICE) => void;
  upgradeAmount: string;
  handleUpgradeAmountChange: (amount: string) => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  selectedUpgradeBonALICE: null,
  isSelectedUpgradeBonALICE: () => false,
  handleUpgradeModalItemClicked: () => {},
  upgradeAmount: '',
  handleUpgradeAmountChange: () => {},
});

const UpgradeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalSelectedBonALICE, setUpgradeModalSelectedBonALICE] =
    useState<BonALICE | null>(null);
  const [upgradeAmount, setUpgradeAmount] = useState('');

  const { balance } = useALICE();
  const handleUpgradeAmountChange = (amount: string) => {
    if (typeof balance !== 'bigint') return;
    setUpgradeAmount(amount.toString());
  };

  const handleUpgradeModalItemClicked = (bonALICE: BonALICE) => {
    if (!upgradeModalSelectedBonALICE) {
      changeUpgradeModalSelectedBonALICE(bonALICE);
      return;
    }
    if (upgradeModalSelectedBonALICE.id === bonALICE.id) {
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
      upgradeModalSelectedBonALICE.id === bonALICE.id
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
        handleUpgradeAmountChange,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
