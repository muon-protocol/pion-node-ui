import { useContext } from 'react';
import { CreateActionContext } from './CreateActionContext.tsx';

const useCreateAction = () => {
  const context = useContext(CreateActionContext);

  if (!context) {
    throw new Error(
      'useCreateActions must be used within a CreateActionProvider',
    );
  }

  return context;
};

export default useCreateAction;
