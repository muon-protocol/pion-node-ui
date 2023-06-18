import { useContext } from 'react';
import { PIONContext } from './PIONContext.tsx';

const usePION = () => {
  const context = useContext(PIONContext);

  if (!context) {
    throw new Error('usePION must be used within a PIONContextProvider');
  }

  return context;
};

export default usePION;
