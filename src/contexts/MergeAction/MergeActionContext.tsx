import { createContext, ReactNode, useEffect, useState } from 'react';
import { BonPION } from '../../types';

const MergeActionContext = createContext<{
  isMergeModalOpen: boolean;
  openMergeModal: () => void;
  closeMergeModal: () => void;
  selectedMergeBonPIONs: BonPION[];
  isInSelectedMergeBonPIONs: (bonPION: BonPION) => boolean;
  handleMergeModalItemClicked: (bonPION: BonPION) => void;
}>({
  isMergeModalOpen: false,
  openMergeModal: () => {},
  closeMergeModal: () => {},
  selectedMergeBonPIONs: [],
  isInSelectedMergeBonPIONs: () => false,
  handleMergeModalItemClicked: () => {},
});

const MergeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [mergeModalSelectedBonPIONs, setMergeModalSelectedBonPIONs] = useState<
    BonPION[]
  >([]);

  const handleMergeModalItemClicked = (bonPION: BonPION) => {
    if (mergeModalSelectedBonPIONs.find((b) => b.id === bonPION.id)) {
      removeMergeModalSelectedBonPION(bonPION);
    } else {
      if (mergeModalSelectedBonPIONs.length < 2) {
        addMergeModalSelectedBonPION(bonPION);
      }
    }
  };

  useEffect(() => {
    if (mergeModalSelectedBonPIONs.length === 2) {
      closeMergeModal();
    }
  }, [mergeModalSelectedBonPIONs]);

  const addMergeModalSelectedBonPION = (bonPION: BonPION) => {
    setMergeModalSelectedBonPIONs([...mergeModalSelectedBonPIONs, bonPION]);
  };

  const removeMergeModalSelectedBonPION = (bonPION: BonPION) => {
    setMergeModalSelectedBonPIONs(
      mergeModalSelectedBonPIONs.filter((b) => b.id !== bonPION.id),
    );
  };

  const isInSelectedMergeBonPIONs = (bonPION: BonPION) => {
    return !!mergeModalSelectedBonPIONs.find((b) => b.id === bonPION.id);
  };

  const openMergeModal = () => setIsMergeModalOpen(true);
  const closeMergeModal = () => setIsMergeModalOpen(false);

  return (
    <MergeActionContext.Provider
      value={{
        isMergeModalOpen,
        openMergeModal,
        closeMergeModal,
        selectedMergeBonPIONs: mergeModalSelectedBonPIONs,
        isInSelectedMergeBonPIONs,
        handleMergeModalItemClicked,
      }}
    >
      {children}
    </MergeActionContext.Provider>
  );
};

export { MergeActionProvider, MergeActionContext };
