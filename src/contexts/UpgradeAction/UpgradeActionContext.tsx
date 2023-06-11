import { createContext, ReactNode, useState } from 'react';
import { BonPION } from '../../types';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  isSelectedBonPION: (bonPION: BonPION) => boolean;
  handleUpgradeModalItemClicked: (bonPION: BonPION) => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  isSelectedBonPION: () => false,
  handleUpgradeModalItemClicked: () => {},
});

const UpgradeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalSelectedBonPION, setUpgradeModalSelectedBonPION] =
    useState<BonPION | null>(null);

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

  const isSelectedBonPION = (bonPION: BonPION) => {
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
        isSelectedBonPION,
        handleUpgradeModalItemClicked,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
