import { useEffect, useState } from 'react';
import useRefresh from '../contexts/Refresh/useRefresh.ts';
import { getStatsAPI } from '../apis';

export type Stats = {
  market_cap: string;
  annual_percentage_yield: string;
  total_value_locked: string;
  protocol_owned_liquidity: string;
  pion_in_circulation: string;
  pion_staked_in_staking: string;
};

export const useStats = () => {
  const { slowRefresh } = useRefresh();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await getStatsAPI();
        console.log(response);
        setStats(response);
      } catch (e) {
        console.error(e);
      }
    };

    getStats();
  }, [slowRefresh]);

  return { stats };
};
