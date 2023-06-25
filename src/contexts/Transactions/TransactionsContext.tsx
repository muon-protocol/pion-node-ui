import { createContext, ReactNode } from 'react';
import { Transaction } from '../../types';
import toast from 'react-hot-toast';
import { waitForTransaction } from '@wagmi/core';

const TransactionsContext = createContext<{
  addTransaction: (transaction: Transaction) => void;
}>({
  addTransaction: () => {},
});

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const addTransaction = async (transaction: Transaction) => {
    const data = waitForTransaction({
      hash: transaction.hash,
    });

    await toast.promise(data, {
      loading: 'Waiting for transaction to be mined',
      success: 'Transaction mined!',
      error: 'Transaction failed',
    });
  };

  return (
    <TransactionsContext.Provider
      value={{
        addTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsProvider, TransactionsContext };
