import { createContext, ReactNode, useState } from 'react';
import { BonPION } from '../../types';

const TransferActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonPION: (bonPION: BonPION) => boolean;
  handleTransferModalItemClicked: (bonPION: BonPION) => void;
  selectedTransferBonPION: BonPION | null;
  handleTransferAddressChange: (address: string) => void;
  transferAddress: string;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonPION: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonPION: null,
  handleTransferAddressChange: () => {},
  transferAddress: '',
});

const TransferActionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferModalSelectedBonPION, setTransferModalSelectedBonPION] =
    useState<BonPION | null>(null);
  const [transferAddress, setTransferAddress] = useState('');
  const handleTransferAddressChange = (address: string) => {
    setTransferAddress(address);
  };

  const handleTransferModalItemClicked = (bonPION: BonPION) => {
    if (!transferModalSelectedBonPION) {
      changeTransferModalSelectedBonPION(bonPION);
      return;
    }
    if (transferModalSelectedBonPION.id === bonPION.id) {
      unselectTransferModalSelectedBonPION();
    } else {
      changeTransferModalSelectedBonPION(bonPION);
    }
  };

  const changeTransferModalSelectedBonPION = (bonPION: BonPION) => {
    setTransferModalSelectedBonPION(bonPION);
    closeTransferModal();
  };

  const unselectTransferModalSelectedBonPION = () => {
    setTransferModalSelectedBonPION(null);
  };

  const isSelectedTransferBonPION = (bonPION: BonPION) => {
    return (
      !!transferModalSelectedBonPION &&
      transferModalSelectedBonPION.id === bonPION.id
    );
  };

  const openTransferModal = () => setIsTransferModalOpen(true);
  const closeTransferModal = () => setIsTransferModalOpen(false);

  return (
    <TransferActionContext.Provider
      value={{
        isTransferModalOpen,
        transferAddress,
        handleTransferAddressChange,
        selectedTransferBonPION: transferModalSelectedBonPION,
        openTransferModal,
        closeTransferModal,
        isSelectedTransferBonPION,
        handleTransferModalItemClicked,
      }}
    >
      {children}
    </TransferActionContext.Provider>
  );
};

export { TransferActionProvider, TransferActionContext };
