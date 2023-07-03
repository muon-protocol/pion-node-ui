import { useMemo } from 'react';
import { RawRewards } from '../types';
import { w3bNumberFromNumber } from '../utils/web3.ts';

const useTotalRewards = (rawRewards: RawRewards | null) => {
  const totalRewards = useMemo(() => {
    if (!rawRewards) return w3bNumberFromNumber(0);
    return w3bNumberFromNumber(
      rawRewards.alice_operator.reward +
        rawRewards.deus_presale.reward +
        rawRewards.early_alice_operator.reward +
        rawRewards.muon_presale.reward,
    );
  }, [rawRewards]);

  return { totalRewards };
};

export default useTotalRewards;
