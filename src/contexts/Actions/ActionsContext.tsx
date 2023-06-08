import { createContext, ReactNode, useState } from 'react';
import { ActionType } from '../../types';

const ActionsContext = createContext<{
  selectedAction: ActionType;
  setSelectedAction: (action: ActionType) => void;
}>({
  selectedAction: ActionType.CREATE,
  setSelectedAction: () => {},
});

const ActionsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAction, setSelectedAction] = useState(ActionType.CREATE);

  return (
    <ActionsContext.Provider value={{ selectedAction, setSelectedAction }}>
      {children}
    </ActionsContext.Provider>
  );
};

export { ActionsProvider, ActionsContext };
