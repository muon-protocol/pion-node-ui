import { createContext, ReactNode } from 'react';
import { useContractRead } from 'wagmi';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import PION_ABI from '../../abis/PION.json';
const PIONContext = createContext<{
  balance: string | unknown;
}>({
  balance: '0',
});

const PIONProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();

  const { data } = useContractRead({
    abi: PION_ABI,
    address: '0x0807653124F773dF22C5365ce86e2c7CE12B8e85',
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
