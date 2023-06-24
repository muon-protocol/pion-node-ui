import { createContext, ReactNode } from 'react';
import { useBalance, useContractRead } from 'wagmi';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import ALICE_ABI from '../../abis/ALICE.json';
import { ALICE_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
const ALICEContext = createContext<{
  balance: string | unknown | null;
}>({
  balance: null,
});

const ALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();

  const balance = useBalance({
    address: walletAddress,
    token: ALICE_ADDRESS[getCurrentChainId()],
  });

  console.log('balance', balance);

  const { data } = useContractRead({
    abi: ALICE_ABI,
    address: ALICE_ADDRESS[getCurrentChainId()],
    functionName: 'balanceOf',
    args: [walletAddress ? walletAddress : '0x0'],
  });

  return (
    <ALICEContext.Provider
      value={{
        balance: data,
      }}
    >
      {children}
    </ALICEContext.Provider>
  );
};

export { ALICEProvider, ALICEContext };
