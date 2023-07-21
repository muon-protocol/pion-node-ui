import { useRewardUsers } from '../abis/types/generated.ts';
import useUserProfile from '../contexts/UserProfile/useUserProfile.ts';
import { REWARD_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';

const useUserClaimedReward = () => {
  const { walletAddress } = useUserProfile();

  const { data: userClaimedReward } = useRewardUsers({
    address: REWARD_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
  });
  if (userClaimedReward === undefined) {
    return { userClaimedReward: [0n, 0n] };
  }
  return { userClaimedReward };
};

export default useUserClaimedReward;
