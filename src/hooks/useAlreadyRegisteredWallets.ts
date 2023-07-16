import { RawRewards } from '../types';
import { formatWalletAddress } from '../utils/web3.ts';
import { useMemo } from 'react';

export const useAlreadyRegisteredWallets = ({
  rawRewards,
  walletAddress,
}: {
  rawRewards: RawRewards | null;
  walletAddress: `0x${string}` | undefined;
}) => {
  return useMemo(() => {
    if (!rawRewards || !walletAddress) return null;

    const deusResult = rawRewards.deus_presale.contributors.find((wallet) => {
      return (
        wallet.message.includes('already registered') &&
        wallet.contributor === walletAddress
      );
    });
    if (deusResult)
      return formatWalletAddress(deusResult.message.slice(-43, -1));

    const muonResult = rawRewards.muon_presale.contributors.find((wallet) => {
      return (
        wallet.message.includes('already registered') &&
        wallet.contributor === walletAddress
      );
    });
    if (muonResult)
      return formatWalletAddress(muonResult.message.slice(-43, -1));

    const aliceResult = rawRewards.alice_operator.contributors.find(
      (wallet) => {
        return (
          wallet.message.includes('already registered') &&
          wallet.contributor === walletAddress
        );
      },
    );
    if (aliceResult)
      return formatWalletAddress(aliceResult.message.slice(-43, -1));

    const earlyAliceResult = rawRewards.early_alice_operator.contributors.find(
      (wallet) => {
        return (
          wallet.message.includes('already registered') &&
          wallet.contributor === walletAddress
        );
      },
    );
    if (earlyAliceResult)
      return formatWalletAddress(earlyAliceResult.message.slice(-43, -1));

    const aliceBounceResult =
      rawRewards.alice_operator_bounce.contributors.find((wallet) => {
        return (
          wallet.message.includes('already registered') &&
          wallet.contributor === walletAddress
        );
      });
    if (aliceBounceResult)
      return formatWalletAddress(aliceBounceResult.message.slice(-43, -1));

    return null;
  }, [rawRewards, walletAddress]);
};
