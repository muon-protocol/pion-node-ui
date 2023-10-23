import { useEffect, useState } from 'react';
import useRefresh from '../../contexts/Refresh/useRefresh.ts';
import { getUserSignatureForBoostAPI } from '../../apis';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

export const useTokenPrice = () => {
  const { mediumRefresh } = useRefresh();
  const { walletAddress } = useUserProfile();

  const [PIONPrice, setPIONPrice] = useState<null | number>(null);

  useEffect(() => {
    async function fetchTokenPrice() {
      if (!walletAddress) return;
      const response = await getUserSignatureForBoostAPI(walletAddress);
      if (response.success) {
        setPIONPrice(Number(response.amount) / 10 ** 18);
      } else {
        setPIONPrice(null);
      }
    }

    fetchTokenPrice();
  }, [mediumRefresh, walletAddress]);

  return {
    ALICEPrice: PIONPrice,
  };
};
