import { createContext, ReactNode, useEffect, useState } from 'react';
import { BonALICE } from '../../types';
// import { useSplitArgs } from '../../hooks/useContractArgs.ts';
// import BONALICE_ABI from '../../abis/BonALICE.json';
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

  useEffect(() => {
    setSplitModalSelectedBonALICE(null);
    setSplitValue(50);
  }, [walletAddress]);

  const handleSplitModalItemClicked = (bonALICE: BonALICE) => {
    if (!splitModalSelectedBonALICE) {
      changeSplitModalSelectedBonALICE(bonALICE);
      return;
    }
    if (splitModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
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
      !!splitModalSelectedBonALICE &&
      splitModalSelectedBonALICE.tokenId === bonALICE.tokenId
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
