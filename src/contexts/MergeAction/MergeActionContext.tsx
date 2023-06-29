import { createContext, ReactNode, useEffect, useState } from 'react';
import { BonALICE } from '../../types';

const MergeActionContext = createContext<{
  isMergeModalOpen: boolean;
  openMergeModal: () => void;
  closeMergeModal: () => void;
  selectedMergeBonALICEs: BonALICE[];
  isInSelectedMergeBonALICEs: (bonALICE: BonALICE) => boolean;
  handleMergeModalItemClicked: (bonALICE: BonALICE) => void;
}>({
  isMergeModalOpen: false,
  openMergeModal: () => {},
  closeMergeModal: () => {},
  selectedMergeBonALICEs: [],
  isInSelectedMergeBonALICEs: () => false,
  handleMergeModalItemClicked: () => {},
});

const MergeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [mergeModalSelectedBonALICEs, setMergeModalSelectedBonALICEs] =
    useState<BonALICE[]>([]);

  const handleMergeModalItemClicked = (bonALICE: BonALICE) => {
    if (
      mergeModalSelectedBonALICEs.find((b) => b.tokenId === bonALICE.tokenId)
    ) {
      removeMergeModalSelectedBonALICE(bonALICE);
    } else {
      if (mergeModalSelectedBonALICEs.length < 2) {
        addMergeModalSelectedBonALICE(bonALICE);
      }
    }
  };

  useEffect(() => {
    if (mergeModalSelectedBonALICEs.length === 2) {
      closeMergeModal();
    }
  }, [mergeModalSelectedBonALICEs]);

  const addMergeModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setMergeModalSelectedBonALICEs([...mergeModalSelectedBonALICEs, bonALICE]);
  };

  const removeMergeModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setMergeModalSelectedBonALICEs(
      mergeModalSelectedBonALICEs.filter((b) => b.tokenId !== bonALICE.tokenId),
    );
  };

  const isInSelectedMergeBonALICEs = (bonALICE: BonALICE) => {
    return !!mergeModalSelectedBonALICEs.find(
      (b) => b.tokenId === bonALICE.tokenId,
    );
  };

  const openMergeModal = () => setIsMergeModalOpen(true);
  const closeMergeModal = () => setIsMergeModalOpen(false);

  return (
    <MergeActionContext.Provider
      value={{
        isMergeModalOpen,
        openMergeModal,
        closeMergeModal,
        selectedMergeBonALICEs: mergeModalSelectedBonALICEs,
        isInSelectedMergeBonALICEs,
        handleMergeModalItemClicked,
      }}
    >
      {children}
    </MergeActionContext.Provider>
  );
};

export { MergeActionProvider, MergeActionContext };
