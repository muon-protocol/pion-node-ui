import { useContext } from 'react';
import { BonALICEContext } from './BonALICEContext.tsx';

const useBonALICE = () => {
  const context = useContext(BonALICEContext);

  if (!context) {
    throw new Error('useBonALICE must be used within a ALICEContextProvider');
  }

  return context;
};

export default useBonALICE;
