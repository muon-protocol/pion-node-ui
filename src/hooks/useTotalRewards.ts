import { useMemo } from 'react';
import { RawRewards } from '../types';
import {w3bNumberFromBigint, w3bNumberFromNumber} from '../utils/web3.ts';

const useTotalRewards = (rawRewards: RawRewards | null) => {
  const totalRewards = useMemo(() => {
    if (!rawRewards) return w3bNumberFromNumber(0);
    if (rawRewards.total_reward_e18) return w3bNumberFromBigint(BigInt(rawRewards.total_reward_e18));
    return w3bNumberFromNumber(rawRewards.total_reward);
  }, [rawRewards]);

  return { totalRewards };
};

export default useTotalRewards;
