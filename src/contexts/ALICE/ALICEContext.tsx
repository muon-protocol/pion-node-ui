import { createContext, ReactNode, useEffect, useState } from 'react';
import { useBalance } from 'wagmi';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { ALICE_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

const ALICEContext = createContext<{
  ALICEBalanceIsFetched: boolean;
  ALICEBalanceIsLoading: boolean;
  ALICEBalance: W3bNumber | null;
}>({
  ALICEBalanceIsFetched: false,
  ALICEBalanceIsLoading: false,
  ALICEBalance: null,
});

const ALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [ALICEBalance, setALICEBalance] = useState<W3bNumber | null>(null);

  const {
    data: ALICEBalanceData,
    isFetched: ALICEBalanceIsFetched,
    isLoading: ALICEBalanceIsLoading,
  } = useBalance({
    address: walletAddress,
    token: ALICE_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
    watch: true,
    enabled: !!walletAddress,
  });

  useEffect(() => {
    if (ALICEBalanceIsFetched && ALICEBalanceData) {
      setALICEBalance(w3bNumberFromBigint(ALICEBalanceData.value));
    }
  }, [ALICEBalanceIsFetched, ALICEBalanceData]);

  return (
    <ALICEContext.Provider
      value={{
        ALICEBalanceIsFetched,
        ALICEBalanceIsLoading,
        ALICEBalance,
      }}
    >
      {children}
    </ALICEContext.Provider>
  );
};

export { ALICEProvider, ALICEContext };
