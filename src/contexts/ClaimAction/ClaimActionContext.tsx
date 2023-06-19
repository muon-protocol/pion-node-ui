import { createContext, ReactNode, useState } from 'react';
import usePION from '../PION/usePION.ts';

const ClaimActionContext = createContext<{
  claimAmount: string;
  handleClaimAmountChange: (amount: string) => void;
}>({
  claimAmount: '',
  handleClaimAmountChange: () => {},
});

const ClaimActionProvider = ({ children }: { children: ReactNode }) => {
  const { balance } = usePION();

  const [claimAmount, setClaimAmount] = useState('');
  const handleClaimAmountChange = (amount: string) => {
    if (typeof balance !== 'bigint') return;
    setClaimAmount(amount.toString());
  };

  return (
    <ClaimActionContext.Provider
      value={{
        claimAmount,
        handleClaimAmountChange,
      }}
    >
      {children}
    </ClaimActionContext.Provider>
  );
};

export { ClaimActionProvider, ClaimActionContext };
