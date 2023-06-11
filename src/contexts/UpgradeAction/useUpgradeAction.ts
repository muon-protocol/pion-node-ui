import { useContext } from 'react';
import { UpgradeActionContext } from './UpgradeActionContext.tsx';

const useUpgradeAction = () => {
  const context = useContext(UpgradeActionContext);

  if (!context) {
    throw new Error(
      'useUpgradeActions must be used within a UpgradeActionProvider',
    );
  }

  return context;
};

export default useUpgradeAction;
