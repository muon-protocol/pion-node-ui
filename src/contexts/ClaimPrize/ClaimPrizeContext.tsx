import { createContext, ReactNode, useState } from 'react';

const ClaimPrizeContext = createContext<{
  isSwitchBackToWalletModalOpen: boolean;
  openSwitchBackToWalletModal: () => void;
  closeSwitchBackToWalletModal: () => void;
}>({
  isSwitchBackToWalletModalOpen: false,
  openSwitchBackToWalletModal: () => {},
  closeSwitchBackToWalletModal: () => {},
});

const ClaimPrizeProvider = ({ children }: { children: ReactNode }) => {
  const [isSwitchBackToWalletModalOpen, setIsSwitchBackToWalletModalOpen] =
    useState(false);

  const openSwitchBackToWalletModal = () =>
    setIsSwitchBackToWalletModalOpen(true);
  const closeSwitchBackToWalletModal = () =>
    setIsSwitchBackToWalletModalOpen(false);

  return (
    <ClaimPrizeContext.Provider
      value={{
        isSwitchBackToWalletModalOpen,
        openSwitchBackToWalletModal,
        closeSwitchBackToWalletModal,
      }}
    >
      {children}
    </ClaimPrizeContext.Provider>
  );
};

export { ClaimPrizeProvider, ClaimPrizeContext };
