import { createContext, ReactNode, useState } from 'react';
import { BonPION } from '../../types';

const SplitActionContext = createContext<{
  splitValue: number;
  setSplitValue: (value: number) => void;
  isSplitModalOpen: boolean;
  openSplitModal: () => void;
  closeSplitModal: () => void;
  isSelectedSplitBonPION: (bonPION: BonPION) => boolean;
  handleSplitModalItemClicked: (bonPION: BonPION) => void;
}>({
  splitValue: 50,
  setSplitValue: () => {},
  isSplitModalOpen: false,
  openSplitModal: () => {},
  closeSplitModal: () => {},
  isSelectedSplitBonPION: () => false,
  handleSplitModalItemClicked: () => {},
});

const SplitActionProvider = ({ children }: { children: ReactNode }) => {
  const [splitValue, setSplitValue] = useState(50);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [splitModalSelectedBonPION, setSplitModalSelectedBonPION] =
    useState<BonPION | null>(null);

  const handleSplitModalItemClicked = (bonPION: BonPION) => {
    if (!splitModalSelectedBonPION) {
      changeSplitModalSelectedBonPION(bonPION);
      return;
    }
    if (splitModalSelectedBonPION.id === bonPION.id) {
      unselectSplitModalSelectedBonPION();
    } else {
      changeSplitModalSelectedBonPION(bonPION);
    }
  };

  const changeSplitModalSelectedBonPION = (bonPION: BonPION) => {
    setSplitModalSelectedBonPION(bonPION);
    closeSplitModal();
  };

  const unselectSplitModalSelectedBonPION = () => {
    setSplitModalSelectedBonPION(null);
  };

  const isSelectedSplitBonPION = (bonPION: BonPION) => {
    return (
      !!splitModalSelectedBonPION && splitModalSelectedBonPION.id === bonPION.id
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
        isSelectedSplitBonPION,
        handleSplitModalItemClicked,
      }}
    >
      {children}
    </SplitActionContext.Provider>
  );
};

export { SplitActionProvider, SplitActionContext };
