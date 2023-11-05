import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BonALICE } from '../../types';
// import { useSplitArgs } from '../../hooks/useContractArgs.ts';
// import { getCurrentChainId } from '../../constants/chains.ts';
// import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
// import { BONALICE_ADDRESS } from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';

const SplitActionContext = createContext<{
  splitValue: number;
  setSplitValue: (value: number) => void;
  isSplitModalOpen: boolean;
  openSplitModal: () => void;
  closeSplitModal: () => void;
  selectedSplitBonALICE: BonALICE | null;
  isSelectedSplitBonALICE: (bonALICE: BonALICE) => boolean;
  handleSplitModalItemClicked: (bonALICE: BonALICE) => void;
  handleSplit: () => void;
  // isMetamaskLoading: boolean;
  // isTransactionLoading: boolean;
}>({
  splitValue: 50,
  setSplitValue: () => {},
  isSplitModalOpen: false,
  openSplitModal: () => {},
  closeSplitModal: () => {},
  selectedSplitBonALICE: null,
  isSelectedSplitBonALICE: () => false,
  handleSplitModalItemClicked: () => {},
  handleSplit: () => {},
  // isMetamaskLoading: false,
  // isTransactionLoading: false,
});

const SplitActionProvider = ({ children }: { children: ReactNode }) => {
  const [splitValue, setSplitValue] = useState(50);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [splitModalSelectedBonALICE, setSplitModalSelectedBonALICE] =
    useState<BonALICE | null>(null);

  // const splitArgs = useSplitArgs({
  //   bonALICE: splitModalSelectedBonALICE,
  //   percentage: splitValue,
  // });
  //
  // const {
  //   callback: split,
  //   isTransactionLoading,
  //   isMetamaskLoading,
  //   isSuccess,
  // } = useWagmiContractWrite({
  //   abi: BONALICE_ABI,
  //   address: BONALICE_ADDRESS[getCurrentChainId()],
  //   functionName: 'split',
  //   args: splitArgs,
  //   chainId: getCurrentChainId(),
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setSplitModalSelectedBonALICE(null);
  //   }
  // }, [isSuccess]);

  const handleSplit = () => {
    // try {
    //   split?.({
    //     pending: 'Splitting Bonded ALICE...',
    //     success: 'Split!',
    //     failed: 'Failed to split Bonded ALICE',
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const { walletAddress } = useUserProfile();

  const openSplitModal = useCallback(() => setIsSplitModalOpen(true), []);
  const closeSplitModal = useCallback(() => setIsSplitModalOpen(false), []);

  useEffect(() => {
    setSplitModalSelectedBonALICE(null);
    setSplitValue(50);
  }, [walletAddress]);

  const changeSplitModalSelectedBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      setSplitModalSelectedBonALICE(bonALICE);
      closeSplitModal();
    },
    [closeSplitModal],
  );

  const unselectSplitModalSelectedBonALICE = useCallback(() => {
    setSplitModalSelectedBonALICE(null);
  }, []);

  const handleSplitModalItemClicked = useCallback(
    (bonALICE: BonALICE) => {
      if (!splitModalSelectedBonALICE) {
        changeSplitModalSelectedBonALICE(bonALICE);
        return;
      }
      if (splitModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
        unselectSplitModalSelectedBonALICE();
      } else {
        changeSplitModalSelectedBonALICE(bonALICE);
      }
    },
    [
      changeSplitModalSelectedBonALICE,
      splitModalSelectedBonALICE,
      unselectSplitModalSelectedBonALICE,
    ],
  );

  const isSelectedSplitBonALICE = useCallback(
    (bonALICE: BonALICE) => {
      return (
        !!splitModalSelectedBonALICE &&
        splitModalSelectedBonALICE.tokenId === bonALICE.tokenId
      );
    },
    [splitModalSelectedBonALICE],
  );

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
        handleSplit,
        // isMetamaskLoading,
        // isTransactionLoading,
      }}
    >
      {children}
    </SplitActionContext.Provider>
  );
};

export { SplitActionProvider, SplitActionContext };
