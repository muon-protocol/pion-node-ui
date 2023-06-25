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
    data,
    isFetched: ALICEBalanceIsFetched,
    isLoading: ALICEBalanceIsLoading,
  } = useBalance({
    address: walletAddress,
    token: ALICE_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
    watch: true,
  });

  useEffect(() => {
    if (ALICEBalanceIsFetched && data && data?.value) {
      setALICEBalance(w3bNumberFromBigint(data.value));
    }
  }, [ALICEBalanceIsFetched, data]);

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
