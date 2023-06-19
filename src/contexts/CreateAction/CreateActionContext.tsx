import { createContext, ReactNode, useState } from 'react';
import usePION from '../PION/usePION.ts';

const CreateActionContext = createContext<{
  createAmount: string;
  createActionLoading: boolean;
  handleCreateAmountChange: (amount: string) => void;
  handleCreateBonPIONClicked: () => void;
}>({
  createAmount: '',
  createActionLoading: false,
  handleCreateAmountChange: () => {},
  handleCreateBonPIONClicked: () => {},
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { balance } = usePION();

  const [createActionLoading, setCreateActionLoading] = useState(false);
  const [createAmount, setCreateAmount] = useState('');
  const handleCreateAmountChange = (amount: string) => {
    if (typeof balance !== 'bigint') return;
    setCreateAmount(amount.toString());
  };

  const handleCreateBonPIONClicked = () => {
    if (!balance || !createAmount || Number(createAmount) > Number(balance))
      return;

    setCreateActionLoading(true);
  };

  return (
    <CreateActionContext.Provider
      value={{
        createAmount,
        createActionLoading,
        handleCreateAmountChange,
        handleCreateBonPIONClicked,
      }}
    >
      {children}
    </CreateActionContext.Provider>
  );
};

export { CreateActionProvider, CreateActionContext };
