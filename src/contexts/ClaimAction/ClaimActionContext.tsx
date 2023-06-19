import { createContext, ReactNode, useState } from 'react';
import usePION from '../PION/usePION.ts';

const ClaimActionContext = createContext<{
  claimAmount: string;
  createActionLoading: boolean;
  handleClaimAmountChange: (amount: string) => void;
  handleCreateBonPIONClicked: () => void;
}>({
  claimAmount: '',
  createActionLoading: false,
  handleClaimAmountChange: () => {},
  handleCreateBonPIONClicked: () => {},
});

const ClaimActionProvider = ({ children }: { children: ReactNode }) => {
  const { balance } = usePION();

  const [createActionLoading, setCreateActionLoading] = useState(false);
  const [claimAmount, setClaimAmount] = useState('');
  const handleClaimAmountChange = (amount: string) => {
    if (typeof balance !== 'bigint') return;
    setClaimAmount(amount.toString());
  };

  const handleCreateBonPIONClicked = () => {
    if (!balance || !claimAmount || Number(claimAmount) > Number(balance))
      return;

    setCreateActionLoading(true);
  };

  return (
    <ClaimActionContext.Provider
      value={{
        claimAmount,
        createActionLoading,
        handleClaimAmountChange,
        handleCreateBonPIONClicked,
      }}
    >
      {children}
    </ClaimActionContext.Provider>
  );
};

export { ClaimActionProvider, ClaimActionContext };
