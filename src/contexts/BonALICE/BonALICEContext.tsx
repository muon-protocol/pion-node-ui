import { createContext, ReactNode, useEffect, useState } from 'react';
import { useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_API from '../../abis/BonALICE.json';
import { BONALICE_ADDRESS } from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { BalanceData } from '../../types/wagmi.ts';
import { USER_BON_ALICES } from '../../apollo/queries';
import { useQuery } from '@apollo/client';
import { BonALICE } from '../../types';
import useRefresh from '../Refresh/useRefresh.ts';

const BonALICEContext = createContext<{
  handleCreateBonALICEClicked: () => void;
  balance: undefined | BalanceData;
  isFetched: boolean;
  isError: boolean;
  isLoading: boolean;
  bonALICEs: BonALICE[];
}>({
  handleCreateBonALICEClicked: () => {},
  balance: undefined,
  isFetched: false,
  isError: false,
  isLoading: false,
  bonALICEs: [],
});

const BonALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [bonALICEs, setBonALICEs] = useState<BonALICE[]>([]);
  const { fastRefresh } = useRefresh();

  const {
    data: balance,
    isFetched,
    isError,
    isLoading,
  } = useBalance({
    address: walletAddress,
    token: BONALICE_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
    watch: true,
  });

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

  const { refetch: BonALICERefetch } = useQuery(USER_BON_ALICES, {
    variables: { account: walletAddress },
  });

  useEffect(() => {
    if (fastRefresh && walletAddress) {
      BonALICERefetch({ account: walletAddress }).then(({ data }) => {
        setBonALICEs(data.accountTokenIds);
      });
    }
  }, [fastRefresh, BonALICERefetch, walletAddress]);

  return (
    <BonALICEContext.Provider
      value={{
        bonALICEs,
        handleCreateBonALICEClicked,
        balance,
        isError,
        isFetched,
        isLoading,
      }}
    >
      {children}
    </BonALICEContext.Provider>
  );
};

export { BonALICEProvider, BonALICEContext };
