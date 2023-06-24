import { createContext, ReactNode, useState } from 'react';
import { BonALICE } from '../../types';

const SplitActionContext = createContext<{
  splitValue: number;
  setSplitValue: (value: number) => void;
  isSplitModalOpen: boolean;
  openSplitModal: () => void;
  closeSplitModal: () => void;
  selectedSplitBonALICE: BonALICE | null;
  isSelectedSplitBonALICE: (bonALICE: BonALICE) => boolean;
  handleSplitModalItemClicked: (bonALICE: BonALICE) => void;
}>({
  splitValue: 50,
  setSplitValue: () => {},
  isSplitModalOpen: false,
  openSplitModal: () => {},
  closeSplitModal: () => {},
  selectedSplitBonALICE: null,
  isSelectedSplitBonALICE: () => false,
  handleSplitModalItemClicked: () => {},
});

const SplitActionProvider = ({ children }: { children: ReactNode }) => {
  const [splitValue, setSplitValue] = useState(50);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [splitModalSelectedBonALICE, setSplitModalSelectedBonALICE] =
    useState<BonALICE | null>(null);

  const handleSplitModalItemClicked = (bonALICE: BonALICE) => {
    if (!splitModalSelectedBonALICE) {
      changeSplitModalSelectedBonALICE(bonALICE);
      return;
    }
    if (splitModalSelectedBonALICE.id === bonALICE.id) {
      unselectSplitModalSelectedBonALICE();
    } else {
      changeSplitModalSelectedBonALICE(bonALICE);
    }
  };

  const changeSplitModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setSplitModalSelectedBonALICE(bonALICE);
    closeSplitModal();
  };

  const unselectSplitModalSelectedBonALICE = () => {
    setSplitModalSelectedBonALICE(null);
  };

  const isSelectedSplitBonALICE = (bonALICE: BonALICE) => {
    return (
      !!splitModalSelectedBonALICE && splitModalSelectedBonALICE.id === bonALICE.id
    );
  };

  const openSplitModal = () => setIsSplitModalOpen(true);
  const closeSplitModal = () => setIsSplitModalOpen(false);

  return (
    <SplitActionContext.Provider
      value={{
        splitValue,
        setSplitValue,
        isSplitModalOpen,
        openSplitModal,
        closeSplitModal,
        selectedSplitBonALICE: splitModalSelectedBonALICE,
        isSelectedSplitBonALICE,
        handleSplitModalItemClicked,
      }}
    >
      {children}
    </SplitActionContext.Provider>
  );
};

export { SplitActionProvider, SplitActionContext };
