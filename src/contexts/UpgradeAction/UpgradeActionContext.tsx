import { createContext, ReactNode, useState } from 'react';
import { BonPION } from '../../types';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  handleUpgradeModalItemClicked: (bonPION: BonPION) => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
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
      addUpgradeModalSelectedBonPION(bonPION);
    }
  };
  const addUpgradeModalSelectedBonPION = (bonPION: BonPION) => {
    setUpgradeModalSelectedBonPIONs([...upgradeModalSelectedBonPIONs, bonPION]);
  };

  const removeUpgradeModalSelectedBonPION = (bonPION: BonPION) => {
    setUpgradeModalSelectedBonPIONs(
      upgradeModalSelectedBonPIONs.filter((b) => b.id !== bonPION.id),
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
        handleUpgradeModalItemClicked,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
