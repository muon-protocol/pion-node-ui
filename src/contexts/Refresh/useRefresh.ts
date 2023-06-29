import { useContext } from 'react';
import { RefreshContext } from './RefreshContext.tsx';

const useRefresh = () => {
  const context = useContext(RefreshContext);

  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }

  return context;
};

export default useRefresh;
