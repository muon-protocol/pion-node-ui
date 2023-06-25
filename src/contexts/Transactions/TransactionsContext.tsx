import { createContext, ReactNode, useState } from 'react';
import { Transaction } from '../../types';

const TransactionsContext = createContext<{
  addTransactions: (transaction: Transaction) => void;
}>({
  addTransactions: () => {},
});

const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransactions = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionsContext.Provider
      value={{
        addTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsProvider, TransactionsContext };
