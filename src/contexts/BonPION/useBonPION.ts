import { useContext } from 'react';
import { BonPIONContext } from './BonPIONContext.tsx';

const useBonPION = () => {
  const context = useContext(BonPIONContext);

  if (!context) {
    throw new Error('useBonPION must be used within a PIONContextProvider');
  }

  return context;
};

export default useBonPION;
