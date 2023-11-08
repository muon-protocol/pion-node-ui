import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useEffect, useState } from 'react';
import { getMigrationDataAPI } from '../../apis';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const useMigration = () => {
  const { walletAddress } = useUserProfile();

  const [amount, setAmount] = useState<null | W3bNumber>(null);
  const [signature, setSignature] = useState<null | string>(null);

  useEffect(() => {
    const getMigrationData = async () => {
      if (walletAddress) {
        try {
          const response = await getMigrationDataAPI({ walletAddress });
          if (response.success) {
            setAmount(w3bNumberFromBigint(BigInt(response.amount)));
            setSignature(response.signature);
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    };

    setAmount(null);
    setSignature(null);

    getMigrationData();
  }, [walletAddress]);

  return {
    amount,
    signature,
  };
};
