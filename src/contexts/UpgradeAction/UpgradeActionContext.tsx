import { createContext, ReactNode, useEffect, useState } from 'react';
import { BonPION } from '../../types';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  isInSelectedBonPIONs: (bonPION: BonPION) => boolean;
  handleUpgradeModalItemClicked: (bonPION: BonPION) => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  isInSelectedBonPIONs: () => false,
  handleUpgradeModalItemClicked: () => {},
});

const UpgradeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalSelectedBonPIONs, setUpgradeModalSelectedBonPIONs] =
    useState<BonPION[]>([]);

  const handleUpgradeModalItemClicked = (bonPION: BonPION) => {
    if (upgradeModalSelectedBonPIONs.find((b) => b.id === bonPION.id)) {
      removeUpgradeModalSelectedBonPION(bonPION);
    } else {
      if (upgradeModalSelectedBonPIONs.length < 2) {
        addUpgradeModalSelectedBonPION(bonPION);
      }
    }
  };

  useEffect(() => {
    if (upgradeModalSelectedBonPIONs.length === 2) {
      closeUpgradeModal();
    }
  }, [upgradeModalSelectedBonPIONs]);

  const addUpgradeModalSelectedBonPION = (bonPION: BonPION) => {
    setUpgradeModalSelectedBonPIONs([...upgradeModalSelectedBonPIONs, bonPION]);
  };

  const removeUpgradeModalSelectedBonPION = (bonPION: BonPION) => {
    setUpgradeModalSelectedBonPIONs(
      upgradeModalSelectedBonPIONs.filter((b) => b.id !== bonPION.id),
    );
  };

  const isInSelectedBonPIONs = (bonPION: BonPION) => {
    return !!upgradeModalSelectedBonPIONs.find((b) => b.id === bonPION.id);
  };

  const openUpgradeModal = () => setIsUpgradeModalOpen(true);
  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  return (
    <UpgradeActionContext.Provider
      value={{
        isUpgradeModalOpen,
        openUpgradeModal,
        closeUpgradeModal,
        isInSelectedBonPIONs,
        handleUpgradeModalItemClicked,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
