import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  readContracts,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_ABI from '../../abis/PION/Mainnet/NFT.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  BOOSTER_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { USER_BON_ALICES } from '../../apollo/queries';
import { useQuery } from '@apollo/client';
import { BonALICE, RawBonALICE } from '../../types';
import useRefresh from '../Refresh/useRefresh.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
import useAllowance from '../../hooks/useAllowance.ts';
import useLPToken from '../LPToken/useLPToken.ts';

const BonALICEContext = createContext<{
  handleCreateBonALICEClicked: () => void;
  bonALICEs: BonALICE[];
  ALICEAllowance: W3bNumber | null;
  LPTokenAllowanceForBooster: W3bNumber | null;
  ALICEAllowanceForBooster: W3bNumber | null;
  fetchBonALICEIsLoading: boolean;
}>({
  handleCreateBonALICEClicked: () => {},
  bonALICEs: [],
  ALICEAllowance: null,
  LPTokenAllowanceForBooster: null,
  ALICEAllowanceForBooster: null,
  fetchBonALICEIsLoading: false,
});

const BonALICEProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [bonALICEs, setBonALICEs] = useState<BonALICE[]>([]);
  const { LPTokenDecimals } = useLPToken();

  const { allowance: ALICEAllowance } = useAllowance(
    ALICE_ADDRESS[getCurrentChainId()],
  );

  const { allowance: LPTokenAllowanceForBooster } = useAllowance(
    LP_TOKEN_ADDRESS[getCurrentChainId()],
    BOOSTER_ADDRESS[getCurrentChainId()],
    LPTokenDecimals,
  );

  const { allowance: ALICEAllowanceForBooster } = useAllowance(
    ALICE_ADDRESS[getCurrentChainId()],
    BOOSTER_ADDRESS[getCurrentChainId()],
  );

  const [fetchBonALICEIsLoading, setFetchBonALICEIsLoading] = useState(false);

  const { fastRefresh } = useRefresh();

  const { config } = usePrepareContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: walletAddress ? [[], [], walletAddress] : undefined,
    chainId: getCurrentChainId(),
    enabled: !!walletAddress,
  });

  const { write } = useContractWrite(config);
  const handleCreateBonALICEClicked = () => {
    write?.();
  };

  const { refetch: BonALICERefetch } = useQuery(USER_BON_ALICES, {
    variables: { account: walletAddress, skip: !walletAddress },
  });

  useEffect(() => {
    if (walletAddress) {
      setFetchBonALICEIsLoading(true);
      BonALICERefetch({ account: walletAddress }).then(({ data }) => {
        const rawBonALICEs: RawBonALICE[] = data.accountTokenIds ?? [];
        const contracts = rawBonALICEs.map((bonALICE: RawBonALICE) => ({
          abi: BONALICE_ABI,
          address: BONALICE_ADDRESS[getCurrentChainId()],
          functionName: 'getLockedOf',
          args: [
            bonALICE.tokenId,
            [
              ALICE_ADDRESS[getCurrentChainId()],
              // LP_TOKEN_ADDRESS[getCurrentChainId()],
            ],
          ],
          chainId: getCurrentChainId(),
          enabled: !!walletAddress && !!bonALICE.tokenId,
        }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        readContracts({ contracts: contracts }).then((getLockedOfData) => {
          const bonALICEs: BonALICE[] = [];
          getLockedOfData.map((lockedOf: any, index: number) => {
            bonALICEs.push({
              ...rawBonALICEs[index],
              ALICELockAmount: w3bNumberFromBigint(lockedOf.result[0]),
              LPTokenLockAmount: w3bNumberFromBigint(BigInt(0)),
              nodePower:
                w3bNumberFromBigint(lockedOf.result[0]).dsp * 2 +
                w3bNumberFromBigint(BigInt(0)).dsp,
            });
          });
          setBonALICEs(bonALICEs);
          setFetchBonALICEIsLoading(false);
        });
      });
    }
  }, [fastRefresh, BonALICERefetch, walletAddress]);

  return (
    <BonALICEContext.Provider
      value={{
        bonALICEs,
        handleCreateBonALICEClicked,
        ALICEAllowance,
        LPTokenAllowanceForBooster,
        fetchBonALICEIsLoading,
        ALICEAllowanceForBooster,
      }}
    >
      {children}
    </BonALICEContext.Provider>
  );
};

export { BonALICEProvider, BonALICEContext };
