import { createContext, ReactNode, useEffect, useState } from 'react';
import { useBalance, useContractRead } from 'wagmi';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { ALICE_ADDRESS, BONALICE_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
import ALICE_ABI from '../../abis/ALICE.json';

const ALICEContext = createContext<{
  ALICEBalanceIsFetched: boolean;
  ALICEBalanceIsLoading: boolean;
  ALICEBalance: W3bNumber | null;
  allowanceIsFetched: boolean;
  allowanceIsLoading: boolean;
  allowance: W3bNumber | null;
}>({
  ALICEBalanceIsFetched: false,
  ALICEBalanceIsLoading: false,
  ALICEBalance: null,
  allowanceIsFetched: false,
  allowanceIsLoading: false,
  allowance: null,
});

const ALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [ALICEBalance, setALICEBalance] = useState<W3bNumber | null>(null);
  const [allowance, setAllowance] = useState<W3bNumber | null>(null);

  const {
    data: ALICEBalanceData,
    isFetched: ALICEBalanceIsFetched,
    isLoading: ALICEBalanceIsLoading,
  } = useBalance({
    address: walletAddress,
    token: ALICE_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
    watch: true,
  });

  useEffect(() => {
    if (ALICEBalanceIsFetched && ALICEBalanceData && ALICEBalanceData?.value) {
      setALICEBalance(w3bNumberFromBigint(ALICEBalanceData.value));
    }
  }, [ALICEBalanceIsFetched, ALICEBalanceData]);

  const {
    data: allowanceData,
    isFetched: allowanceIsFetched,
    isLoading: allowanceIsLoading,
  } = useContractRead({
    abi: ALICE_ABI,
    address: ALICE_ADDRESS[getCurrentChainId()],
    functionName: 'allowance',
    args: [walletAddress, BONALICE_ADDRESS[getCurrentChainId()]],
    chainId: getCurrentChainId(),
    watch: true,
  });

  useEffect(() => {
    console.log('allowanceIsFetched', allowanceIsFetched);
    if (allowanceIsFetched && allowanceData) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAllowance(w3bNumberFromBigint(allowanceData));
    }
  }, [allowanceIsFetched, allowanceData]);

  return (
    <ALICEContext.Provider
      value={{
        ALICEBalanceIsFetched,
        ALICEBalanceIsLoading,
        ALICEBalance,
        allowanceIsFetched,
        allowanceIsLoading,
        allowance,
      }}
    >
      {children}
    </ALICEContext.Provider>
  );
};

export { ALICEProvider, ALICEContext };
