import { createContext, ReactNode, useState } from 'react';
import { BonPION } from '../../types';
import usePION from '../PION/usePION.ts';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  selectedUpgradeBonPION: BonPION | null;
  isSelectedUpgradeBonPION: (bonPION: BonPION) => boolean;
  handleUpgradeModalItemClicked: (bonPION: BonPION) => void;
  upgradeAmount: string;
  handleUpgradeAmountChange: (amount: string) => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  selectedUpgradeBonPION: null,
  isSelectedUpgradeBonPION: () => false,
  handleUpgradeModalItemClicked: () => {},
  upgradeAmount: '',
  handleUpgradeAmountChange: () => {},
});

const UpgradeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalSelectedBonPION, setUpgradeModalSelectedBonPION] =
    useState<BonPION | null>(null);
  const [upgradeAmount, setUpgradeAmount] = useState('');

  const { balance } = usePION();
  const handleUpgradeAmountChange = (amount: string) => {
    if (typeof balance !== 'bigint') return;
    setUpgradeAmount(amount.toString());
  };

  const handleUpgradeModalItemClicked = (bonPION: BonPION) => {
    if (!upgradeModalSelectedBonPION) {
      changeUpgradeModalSelectedBonPION(bonPION);
      return;
    }
    if (upgradeModalSelectedBonPION.id === bonPION.id) {
      unselectUpgradeModalSelectedBonPION();
    } else {
      changeUpgradeModalSelectedBonPION(bonPION);
    }
  };

  const changeUpgradeModalSelectedBonPION = (bonPION: BonPION) => {
    setUpgradeModalSelectedBonPION(bonPION);
    closeUpgradeModal();
  };

  const unselectUpgradeModalSelectedBonPION = () => {
    setUpgradeModalSelectedBonPION(null);
  };

  const isSelectedUpgradeBonPION = (bonPION: BonPION) => {
    return (
      !!upgradeModalSelectedBonPION &&
      upgradeModalSelectedBonPION.id === bonPION.id
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
        selectedUpgradeBonPION: upgradeModalSelectedBonPION,
        isSelectedUpgradeBonPION,
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
