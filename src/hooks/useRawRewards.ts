import useTotalRewards from './useTotalRewards.ts';
import { RawRewards, WalletWithSignature } from '../types';
import { useRewardWallets } from './useRewardWallets.ts';
import { useMemo } from 'react';
import { useAlreadyRegisteredWallet } from './useAlreadyRegisteredWallet.ts';

const useRawRewards = ({
  rawRewards,
  walletsWithSignature,
}: {
  rawRewards: RawRewards | null;
  walletsWithSignature: WalletWithSignature[];
}) => {
  const { totalRewards } = useTotalRewards(rawRewards);

  const { rewardWallets } = useRewardWallets(rawRewards, walletsWithSignature);

  const eligibleAddresses = useMemo(() => {
    return rewardWallets.filter(
      (wallet) =>
        wallet.wasInMuonPresale ||
        wallet.wasInDeusPresale ||
        wallet.wasAliceOperator ||
        wallet.wasAliceOperatorEarly ||
        wallet.wasAliceOperatorBounce,
    );
  }, [rewardWallets]);

  const alreadyRegisteredWallet = useAlreadyRegisteredWallet({
    rawRewards,
  });

  return {
    totalRewards,
    eligibleAddresses,
    rewardWallets,
    alreadyRegisteredWallet,
  };
};

export default useRawRewards;
