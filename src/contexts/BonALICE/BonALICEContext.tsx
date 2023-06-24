import { createContext, ReactNode } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_API from '../../abis/BonALICE.json';
import { BONALICE_ADDRESS } from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';

const BonALICEContext = createContext<{
  handleCreateBonALICEClicked: () => void;
}>({
  handleCreateBonALICEClicked: () => {},
});

const BonALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();

  const { config } = usePrepareContractWrite({
    abi: BONALICE_API,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: [[], [], walletAddress],
  });

  const { write } = useContractWrite(config);
  const handleCreateBonALICEClicked = () => {
    write?.();
  };

  return (
    <BonALICEContext.Provider value={{ handleCreateBonALICEClicked }}>
      {children}
    </BonALICEContext.Provider>
  );
};

export { BonALICEProvider, BonALICEContext };
