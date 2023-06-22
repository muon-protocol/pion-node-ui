import { createContext, ReactNode } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONPION_API from '../../abis/BonPION.json';
import { BONPION_ADDRESS } from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';

const BonPIONContext = createContext<{
  handleCreateBonPIONClicked: () => void;
}>({
  handleCreateBonPIONClicked: () => {},
});

const BonPIONProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();

  const { config } = usePrepareContractWrite({
    abi: BONPION_API,
    address: BONPION_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: [[], [], walletAddress],
  });

  const { write } = useContractWrite(config);
  const handleCreateBonPIONClicked = () => {
    write?.();
  };

  return (
    <BonPIONContext.Provider value={{ handleCreateBonPIONClicked }}>
      {children}
    </BonPIONContext.Provider>
  );
};

export { BonPIONProvider, BonPIONContext };
