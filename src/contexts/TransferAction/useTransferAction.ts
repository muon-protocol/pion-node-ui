import { useContext } from 'react';
import { TransferActionContext } from './TransferActionContext.tsx';

const useTransferAction = () => {
  const context = useContext(TransferActionContext);

  if (!context) {
    throw new Error(
      'useUpgradeActions must be used within a UpgradeActionProvider',
    );
  }

  return context;
};

export default useTransferAction;
