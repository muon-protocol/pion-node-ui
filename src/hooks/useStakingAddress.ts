import { useEffect, useState } from 'react';
import useUserProfile from '../contexts/UserProfile/useUserProfile.ts';

const useStakingAddress = () => {
  const { walletAddress } = useUserProfile();

  const [stakingAddress, setStakingAddress] = useState<
    `0x${string}` | undefined
  >(undefined);

  useEffect(() => {
    if (!stakingAddress) {
      setStakingAddress(walletAddress);
    }
  }, [walletAddress, stakingAddress]);

  return { stakingAddress };
};

export default useStakingAddress;
