import { Address } from 'wagmi';
import { MUON_NODE_STAKING_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { useMuonNodeStakingUsers } from '../../abis/types/generated.ts';

export const useMuonNodeStaking = (walletAddress: Address | undefined) => {
  const { data: muonNodeStakingUsers } = useMuonNodeStakingUsers({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    watch: true,
  });

  return { muonNodeStakingUsers };
};
