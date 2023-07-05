import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  readContracts,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_API from '../../abis/BonALICE.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { BalanceData, W3bNumber } from '../../types/wagmi.ts';
import { USER_BON_ALICES } from '../../apollo/queries';
import { useQuery } from '@apollo/client';
import { BonALICE, RawBonALICE } from '../../types';
import useRefresh from '../Refresh/useRefresh.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
import useAllowance from '../../hooks/useAllowance.ts';

const BonALICEContext = createContext<{
  handleCreateBonALICEClicked: () => void;
  balance: undefined | BalanceData;
  isFetched: boolean;
  isError: boolean;
  isLoading: boolean;
  bonALICEs: BonALICE[];
  ALICEAllowance: W3bNumber | null;
  LPTokenAllowance: W3bNumber | null;
}>({
  handleCreateBonALICEClicked: () => {},
  balance: undefined,
  isFetched: false,
  isError: false,
  isLoading: false,
  bonALICEs: [],
  ALICEAllowance: null,
  LPTokenAllowance: null,
});

const BonALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [bonALICEs, setBonALICEs] = useState<BonALICE[]>([]);

  const { allowance: ALICEAllowance } = useAllowance(
    ALICE_ADDRESS[getCurrentChainId()],
  );
  const { allowance: LPTokenAllowance } = useAllowance(
    LP_TOKEN_ADDRESS[getCurrentChainId()],
  );

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
        const rawBonALICEs: RawBonALICE[] = data.accountTokenIds ?? [];
        const contracts = rawBonALICEs.map((bonALICE: RawBonALICE) => ({
          abi: BONALICE_API,
          address: BONALICE_ADDRESS[getCurrentChainId()],
          functionName: 'getLockedOf',
          args: [
            bonALICE.tokenId,
            [
              ALICE_ADDRESS[getCurrentChainId()],
              LP_TOKEN_ADDRESS[getCurrentChainId()],
            ],
          ],
        }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        readContracts({ contracts: contracts }).then((getLockedOfData) => {
          const bonALICEs: BonALICE[] = [];
          getLockedOfData.map((lockedOf: any, index: number) => {
            bonALICEs.push({
              ...rawBonALICEs[index],
              ALICELockAmount: w3bNumberFromBigint(lockedOf.result[0]),
              LPTokenLockAmount: w3bNumberFromBigint(lockedOf.result[1]),
              nodePower:
                w3bNumberFromBigint(lockedOf.result[0]).dsp +
                w3bNumberFromBigint(lockedOf.result[1]).dsp * 2,
            });
          });
          setBonALICEs(bonALICEs);
        });
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
        ALICEAllowance,
        LPTokenAllowance,
      }}
    >
      {children}
    </BonALICEContext.Provider>
  );
};

export { BonALICEProvider, BonALICEContext };
