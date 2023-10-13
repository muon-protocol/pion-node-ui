import useTotalRewards from './useTotalRewards.ts';
import { RawRewards, WalletWithSignature } from '../types';
import { useRewardWallets } from './useRewardWallets.ts';
import { useMemo, useState } from 'react';
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

  const [eligibleAddressesUpdated, setEligibleAddressesUpdated] =
    useState(false);

  const eligibleAddresses = useMemo(() => {
    setEligibleAddressesUpdated(false);
    setTimeout(() => {
      setEligibleAddressesUpdated(true);
    }, 1000);
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
    eligibleAddressesUpdated,
    alreadyRegisteredWallet,
  };
};

export default useRawRewards;
