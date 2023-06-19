import { useContext } from 'react';
import { ClaimActionContext } from './ClaimActionContext.tsx';

const useClaimAction = () => {
  const context = useContext(ClaimActionContext);

  if (!context) {
    throw new Error(
      'useClaimActions must be used within a ClaimActionProvider',
    );
  }

  return context;
};

export default useClaimAction;
