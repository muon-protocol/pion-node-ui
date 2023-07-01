import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  readContracts,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_API from '../../abis/BonALICE.json';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { BalanceData, W3bNumber } from '../../types/wagmi.ts';
import { USER_BON_ALICES } from '../../apollo/queries';
import { useQuery } from '@apollo/client';
import { BonALICE, BonALICEWithLockedOf } from '../../types';
import useRefresh from '../Refresh/useRefresh.ts';
import ALICE_ABI from '../../abis/ALICE.json';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

const BonALICEContext = createContext<{
  handleCreateBonALICEClicked: () => void;
  balance: undefined | BalanceData;
  isFetched: boolean;
  isError: boolean;
  isLoading: boolean;
  bonALICEs: BonALICEWithLockedOf[];
  allowanceIsFetched: boolean;
  allowanceIsLoading: boolean;
  allowance: W3bNumber | null;
}>({
  handleCreateBonALICEClicked: () => {},
  balance: undefined,
  isFetched: false,
  isError: false,
  isLoading: false,
  bonALICEs: [],
  allowanceIsFetched: false,
  allowanceIsLoading: false,
  allowance: null,
});

const BonALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [bonALICEs, setBonALICEs] = useState<BonALICEWithLockedOf[]>([]);
  const [allowance, setAllowance] = useState<W3bNumber | null>(null);

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
        const rawBonALICEs: BonALICE[] = data.accountTokenIds ?? [];
        const contracts = rawBonALICEs.map((bonALICE: BonALICE) => ({
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

        readContracts({ contracts: contracts }).then((getLockedOfData) => {
          const bonALICEs: BonALICEWithLockedOf[] = [];
          console.log('getLockedOfData', getLockedOfData);
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
          console.log('bonALICEs', bonALICEs);
          setBonALICEs(bonALICEs);
        });
      });
    }
  }, [fastRefresh, BonALICERefetch, walletAddress]);

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
    if (allowanceIsFetched && allowanceData !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAllowance(w3bNumberFromBigint(allowanceData));
    }
  }, [allowanceIsFetched, allowanceData]);

  return (
    <BonALICEContext.Provider
      value={{
        bonALICEs,
        handleCreateBonALICEClicked,
        balance,
        isError,
        isFetched,
        isLoading,
        allowanceIsFetched,
        allowanceIsLoading,
        allowance,
      }}
    >
      {children}
    </BonALICEContext.Provider>
  );
};

export { BonALICEProvider, BonALICEContext };
