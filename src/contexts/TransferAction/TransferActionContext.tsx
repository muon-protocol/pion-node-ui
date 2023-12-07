import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BonALICE } from '../../types';
import useUserProfile from '../UserProfile/useUserProfile.ts';
// import useTransfer from '../../hooks/useTransfer.ts';

const TransferActionContext = createContext<{
  isTransferModalOpen: boolean;
  openTransferModal: () => void;
  closeTransferModal: () => void;
  isSelectedTransferBonALICE: (bonALICE: BonALICE) => boolean;
  handleTransferModalItemClicked: (bonALICE: BonALICE) => void;
  selectedTransferBonALICE: BonALICE | null;
  handleTransferAddressChange: (address: string) => void;
  transferAddress: string;
  // transfer: () => void;
}>({
  isTransferModalOpen: false,
  openTransferModal: () => {},
  closeTransferModal: () => {},
  isSelectedTransferBonALICE: () => false,
  handleTransferModalItemClicked: () => {},
  selectedTransferBonALICE: null,
  handleTransferAddressChange: () => {},
  transferAddress: '',
  // transfer: () => {},
});

const TransferActionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferModalSelectedBonALICE, setTransferModalSelectedBonALICE] =
    useState<BonALICE | null>(null);
  const [transferAddress, setTransferAddress] = useState('');
  const handleTransferAddressChange = useCallback((address: string) => {
    setTransferAddress(address);
  }, []);
  const { walletAddress } = useUserProfile();

  const openTransferModal = useCallback(() => setIsTransferModalOpen(true), []);
  const closeTransferModal = useCallback(
    () => setIsTransferModalOpen(false),
    [],
  );

  // const { transfer } = useTransfer(
  //   walletAddress,
  //   transferAddress,
  //   transferModalSelectedBonALICE?.tokenId,
  // );

  const changeTransferModalSelectedBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      setTransferModalSelectedBonALICE(bonALICE);
      closeTransferModal();
    },
    [closeTransferModal],
  );

  const unselectTransferModalSelectedBonALICE = useCallback(() => {
    setTransferModalSelectedBonALICE(null);
  }, []);

  const handleTransferModalItemClicked = useCallback(
    (bonALICE: BonALICE) => {
      if (!transferModalSelectedBonALICE) {
        changeTransferModalSelectedBonALICE(bonALICE);
        return;
      }
      if (transferModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
        unselectTransferModalSelectedBonALICE();
      } else {
        changeTransferModalSelectedBonALICE(bonALICE);
      }
    },
    [
      changeTransferModalSelectedBonALICE,
      transferModalSelectedBonALICE,
      unselectTransferModalSelectedBonALICE,
    ],
  );

  const isSelectedTransferBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      return (
        !!transferModalSelectedBonALICE &&
        transferModalSelectedBonALICE.tokenId === bonALICE.tokenId
      );
    },
    [transferModalSelectedBonALICE],
  );

  useEffect(() => {
    setTransferModalSelectedBonALICE(null);
    setTransferAddress('');
  }, [walletAddress]);

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
        // transfer,
      }}
    >
      {children}
    </TransferActionContext.Provider>
  );
};

export { TransferActionProvider, TransferActionContext };
