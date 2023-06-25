import { createContext, ReactNode, useState } from 'react';
import { Transaction } from '../../types';

const TransactionsContext = createContext<{
  addTransaction: (transaction: Transaction) => void;
}>({
  addTransaction: () => {},
});

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
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
