import { useLpTokenAllowance } from '../../abis/types/generated.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import {
  ALICE_ADDRESS,
  BONALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

export const useAllowance = () => {
  const { walletAddress } = useUserProfile();

  const { data: allowanceForMuonNodeStaking } = useLpTokenAllowance({
    address: ALICE_ADDRESS[getCurrentChainId()],
    args: [
      walletAddress ||
        '0x000000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000',
      MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    ],
    watch: true,
  });

  const { data: allowanceForBonALICE } = useLpTokenAllowance({
    address: ALICE_ADDRESS[getCurrentChainId()],
    args: [
      walletAddress ||
        '0x00000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000',
      BONALICE_ADDRESS[getCurrentChainId()],
    ],
    watch: true,
  });

  return {
    allowanceForMuonNodeStaking,
    allowanceForBonALICE,
  };
};
