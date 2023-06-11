import { useContext } from 'react';
import { SplitActionContext } from './SplitActionContext.tsx';

const useSplitAction = () => {
  const context = useContext(SplitActionContext);

  if (!context) {
    throw new Error(
      'useSplitActions must be used within a SplitActionProvider',
    );
  }

  return context;
};

export default useSplitAction;
