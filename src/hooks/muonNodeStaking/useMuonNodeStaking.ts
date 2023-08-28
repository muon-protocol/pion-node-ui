import { MUON_NODE_STAKING_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import {
  useMuonNodeStakingUsers,
  useMuonNodeStakingValueOfBondedToken,
} from '../../abis/types/generated.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

export const useMuonNodeStaking = () => {
  const { walletAddress } = useUserProfile();

  const { data: muonNodeStakingUsers } = useMuonNodeStakingUsers({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    watch: true,
  });

  const { data: valueOfBondedToken } = useMuonNodeStakingValueOfBondedToken({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: muonNodeStakingUsers ? [muonNodeStakingUsers[4]] : undefined,
    watch: true,
  });

  return { muonNodeStakingUsers, valueOfBondedToken };
};
