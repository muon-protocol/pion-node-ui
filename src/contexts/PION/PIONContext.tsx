import { createContext, ReactNode } from 'react';
import { useBalance, useContractRead } from 'wagmi';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import PION_ABI from '../../abis/PION.json';
import { PION_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
const PIONContext = createContext<{
  balance: string | unknown | null;
}>({
  balance: null,
});

const PIONProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();

  const balance = useBalance({
    address: walletAddress,
    token: PION_ADDRESS[getCurrentChainId()],
  });

  console.log('balance', balance);

  const { data } = useContractRead({
    abi: PION_ABI,
    address: PION_ADDRESS[getCurrentChainId()],
    functionName: 'balanceOf',
    args: [walletAddress ? walletAddress : '0x0'],
  });

  return (
    <PIONContext.Provider
      value={{
        balance: data,
      }}
    >
      {children}
    </PIONContext.Provider>
  );
};

export { PIONProvider, PIONContext };
