import { createContext, ReactNode, useEffect, useState } from 'react';
import { BonALICE } from '../../types';
import { useMergeArgs } from '../../hooks/useContractArgs.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_ABI from '../../abis/BonALICE.json';
import { BONALICE_ADDRESS } from '../../constants/addresses.ts';

const MergeActionContext = createContext<{
  isMergeModalOpen: boolean;
  openMergeModal: () => void;
  closeMergeModal: () => void;
  selectedMergeBonALICEs: BonALICE[];
  isInSelectedMergeBonALICEs: (bonALICE: BonALICE) => boolean;
  handleMergeModalItemClicked: (bonALICE: BonALICE) => void;
  handleMerge: () => void;
}>({
  isMergeModalOpen: false,
  openMergeModal: () => {},
  closeMergeModal: () => {},
  selectedMergeBonALICEs: [],
  isInSelectedMergeBonALICEs: () => false,
  handleMergeModalItemClicked: () => {},
  handleMerge: () => {},
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

  const mergeArgs = useMergeArgs({
    tokenId1: mergeModalSelectedBonALICEs[0]?.tokenId,
    tokenId2: mergeModalSelectedBonALICEs[1]?.tokenId,
  });

  const { callback: merge } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'merge',
    args: mergeArgs,
    chainId: getCurrentChainId(),
  });

  const handleMerge = () => {
    if (!mergeArgs) return;

    merge?.({
      pending: 'Merging...',
      success: 'Merged!',
      failed: 'Error merging',
    });
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
        handleMerge,
      }}
    >
      {children}
    </MergeActionContext.Provider>
  );
};

export { MergeActionProvider, MergeActionContext };
