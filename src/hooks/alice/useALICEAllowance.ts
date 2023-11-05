import { useAliceAllowance } from '../../abis/types/generated.ts';
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

  const { data: allowanceForMuonNodeStaking } = useAliceAllowance({
    address: ALICE_ADDRESS[getCurrentChainId()],
    args: walletAddress
      ? [walletAddress, MUON_NODE_STAKING_ADDRESS[getCurrentChainId()]]
      : undefined,
    watch: true,
    enabled: !!walletAddress,
  });

  const { data: allowanceForBonALICE } = useAliceAllowance({
    address: ALICE_ADDRESS[getCurrentChainId()],
    args: walletAddress
      ? [walletAddress, BONALICE_ADDRESS[getCurrentChainId()]]
      : undefined,
    watch: true,
    enabled: !!walletAddress,
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
