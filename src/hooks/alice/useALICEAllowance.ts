import { usePionAllowance } from '../../abis/types/generated.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const useALICEAllowance = () => {
  const { walletAddress } = useUserProfile();

  const { data: allowanceForMuonNodeStaking } = usePionAllowance({
    address: ALICE_ADDRESS[getCurrentChainId()],
    args: [
      walletAddress ||
        '0x000000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000',
      MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    ],
    watch: true,
  });

  const { data: allowanceForBonALICE } = usePionAllowance({
    address: ALICE_ADDRESS[getCurrentChainId()],
    args: [
      walletAddress ||
        '0x00000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000',
      BONALICE_ADDRESS[getCurrentChainId()],
    ],
    watch: true,
  });

  if (
    allowanceForMuonNodeStaking === undefined ||
    allowanceForBonALICE === undefined
  ) {
    return {
      allowanceForMuonNodeStaking: null,
      allowanceForBonALICE: null,
    };
  }

  return {
    allowanceForMuonNodeStaking: w3bNumberFromBigint(
      allowanceForMuonNodeStaking,
    ),
    allowanceForBonALICE: w3bNumberFromBigint(allowanceForBonALICE),
  };
};
