import { useContext } from 'react';
import { Web3Context } from './Web3Context.tsx';

const useWeb3 = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error('useWeb3 must be used within a Web3ContextProvider.');
  }

  return context;
};

export default useWeb3;
