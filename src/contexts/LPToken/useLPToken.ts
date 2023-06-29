import { useContext } from 'react';
import { LPTokenContext } from './LPTokenContext.tsx';

const useLPToken = () => {
  const context = useContext(LPTokenContext);

  if (!context) {
    throw new Error('useLPToken must be used within a LPTokenProvider');
  }

  return context;
};

export default useLPToken;
