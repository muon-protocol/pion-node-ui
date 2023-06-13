import { useContext } from 'react';
import { ClaimPrizeContext } from './ClaimPrizeContext.tsx';

const useClaimPrize = () => {
  const context = useContext(ClaimPrizeContext);

  if (!context) {
    throw new Error('useClaimPrize must be used within a ClaimPrizeProvider');
  }

  return context;
};

export default useClaimPrize;
