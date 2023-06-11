import { useContext } from 'react';
import { MergeActionContext } from './MergeActionContext.tsx';

const useMergeAction = () => {
  const context = useContext(MergeActionContext);

  if (!context) {
    throw new Error(
      'useUpgradeActions must be used within a UpgradeActionProvider',
    );
  }

  return context;
};

export default useMergeAction;
