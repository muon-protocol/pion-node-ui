import { useContext } from 'react';
import { TransferActionContext } from './TransferActionContext.tsx';

const useTransferAction = () => {
  const context = useContext(TransferActionContext);

  if (!context) {
    throw new Error(
      'useTransferActions must be used within a TransferActionProvider',
    );
  }

  return context;
};

export default useTransferAction;
