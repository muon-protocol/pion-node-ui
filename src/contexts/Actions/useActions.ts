import { useContext } from 'react';
import { ActionsContext } from './ActionsContext.tsx';

const useActions = () => {
  const context = useContext(ActionsContext);

  if (!context) {
    throw new Error('useActions must be used within a ActionsProvider');
  }

  return context;
};

export default useActions;
