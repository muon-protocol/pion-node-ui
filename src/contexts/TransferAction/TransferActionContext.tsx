import { createContext, ReactNode, useState } from 'react';
import { BonALICE } from '../../types';

const TransferActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonALICE: (bonALICE: BonALICE) => boolean;
  handleTransferModalItemClicked: (bonALICE: BonALICE) => void;
  selectedTransferBonALICE: BonALICE | null;
  handleTransferAddressChange: (address: string) => void;
  transferAddress: string;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonALICE: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonALICE: null,
  handleTransferAddressChange: () => {},
  transferAddress: '',
});

const TransferActionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferModalSelectedBonALICE, setTransferModalSelectedBonALICE] =
    useState<BonALICE | null>(null);
  const [transferAddress, setTransferAddress] = useState('');
  const handleTransferAddressChange = (address: string) => {
    setTransferAddress(address);
  };

  const handleTransferModalItemClicked = (bonALICE: BonALICE) => {
    if (!transferModalSelectedBonALICE) {
      changeTransferModalSelectedBonALICE(bonALICE);
      return;
    }
    if (transferModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
      unselectTransferModalSelectedBonALICE();
    } else {
      changeTransferModalSelectedBonALICE(bonALICE);
    }
  };

  const changeTransferModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setTransferModalSelectedBonALICE(bonALICE);
    closeTransferModal();
  };

  const unselectTransferModalSelectedBonALICE = () => {
    setTransferModalSelectedBonALICE(null);
  };

  const isSelectedTransferBonALICE = (bonALICE: BonALICE) => {
    return (
      !!transferModalSelectedBonALICE &&
      transferModalSelectedBonALICE.tokenId === bonALICE.tokenId
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
        selectedTransferBonALICE: transferModalSelectedBonALICE,
        openTransferModal,
        closeTransferModal,
        isSelectedTransferBonALICE,
        handleTransferModalItemClicked,
      }}
    >
      {children}
    </TransferActionContext.Provider>
  );
};

export { TransferActionProvider, TransferActionContext };
