import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  // LP_TOKEN_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import {
  useBonAliceGetLockedOf,
  useMuonNodeStakingUsers,
  useMuonNodeStakingValueOfBondedToken,
} from '../../abis/types/generated.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useMemo } from 'react';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const useMuonNodeStaking = () => {
  const { walletAddress } = useUserProfile();

  const { data: muonNodeStakingUsers } = useMuonNodeStakingUsers({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    watch: true,
    enabled: !!walletAddress,
  });

  const { data: valueOfBondedToken } = useMuonNodeStakingValueOfBondedToken({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: muonNodeStakingUsers ? [muonNodeStakingUsers[4]] : undefined,
    watch: true,
    enabled: !!muonNodeStakingUsers,
  });

  const { data: nodeBonALICEPower } = useBonAliceGetLockedOf({
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: muonNodeStakingUsers
      ? [
          muonNodeStakingUsers[4],
          [
            ALICE_ADDRESS[getCurrentChainId()],
            // LP_TOKEN_ADDRESS[getCurrentChainId()],
          ],
        ]
      : undefined,
    watch: true,
    enabled: !!muonNodeStakingUsers,
  });

  const nodeBonALICE = useMemo(() => {
    if (!nodeBonALICEPower || !muonNodeStakingUsers) return [];
    if (muonNodeStakingUsers[4] === BigInt(0)) return [];

    return [
      {
        account: walletAddress,
        latestTimestamp: 0,
        tokenId: muonNodeStakingUsers ? muonNodeStakingUsers[4] : 0,
        ALICELockAmount: w3bNumberFromBigint(nodeBonALICEPower[0]),
        LPTokenLockAmount: w3bNumberFromBigint(BigInt(0)),
        nodePower:
          w3bNumberFromBigint(nodeBonALICEPower[0]).dsp +
          w3bNumberFromBigint(BigInt(0)).dsp,
        isNodeBonALICE: true,
      },
    ];
  }, [nodeBonALICEPower, walletAddress, muonNodeStakingUsers]);

  const hasNodeBonALICE = useMemo(() => {
    if (!muonNodeStakingUsers) return false;
    return muonNodeStakingUsers[4] !== BigInt(0);
  }, [muonNodeStakingUsers]);

  return {
    muonNodeStakingUsers,
    valueOfBondedToken,
    nodeBonALICE,
    hasNodeBonALICE,
  };
};
