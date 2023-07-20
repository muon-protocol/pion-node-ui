import { RawRewards } from '../types';
import { formatWalletAddress } from '../utils/web3.ts';
import { useMemo } from 'react';
import useUserProfile from '../contexts/UserProfile/useUserProfile.ts';

export const useAlreadyRegisteredWallet = ({
  rawRewards,
}: {
  rawRewards: RawRewards | null;
}) => {
  const { walletAddress } = useUserProfile();

  return useMemo(() => {
    if (!rawRewards || !walletAddress) return null;

    const deusResult = rawRewards.deus_presale.contributors.find((wallet) => {
      return (
        wallet.message.includes('already registered') &&
        wallet.contributor === walletAddress
      );
    });
    if (deusResult) {
      return {
        registeredTo: formatWalletAddress(deusResult.message.slice(-43, -1)),
        isAlreadyRegistered: true,
      };
    }

    const muonResult = rawRewards.muon_presale.contributors.find((wallet) => {
      return (
        wallet.message.includes('already registered') &&
        wallet.contributor === walletAddress
      );
    });
    if (muonResult) {
      return {
        registeredTo: formatWalletAddress(muonResult.message.slice(-43, -1)),
        isAlreadyRegistered: true,
      };
    }

    const aliceResult = rawRewards.alice_operator.contributors.find(
      (wallet) => {
        return (
          wallet.message.includes('already registered') &&
          wallet.contributor === walletAddress
        );
      },
    );
    if (aliceResult) {
      return {
        registeredTo: formatWalletAddress(aliceResult.message.slice(-43, -1)),
        isAlreadyRegistered: true,
      };
    }

    const earlyAliceResult = rawRewards.early_alice_operator.contributors.find(
      (wallet) => {
        return (
          wallet.message.includes('already registered') &&
          wallet.contributor === walletAddress
        );
      },
    );
    if (earlyAliceResult) {
      return {
        registeredTo: formatWalletAddress(
          earlyAliceResult.message.slice(-43, -1),
        ),
        isAlreadyRegistered: true,
      };
    }

    const aliceBounceResult =
      rawRewards.alice_operator_bounce.contributors.find((wallet) => {
        return (
          wallet.message.includes('already registered') &&
          wallet.contributor === walletAddress
        );
      });
    if (aliceBounceResult) {
      return {
        registeredTo: formatWalletAddress(
          aliceBounceResult.message.slice(-43, -1),
        ),
        isAlreadyRegistered: true,
      };
    }

    return {
      isAlreadyRegistered: false,
      registeredTo: '',
    };
  }, [rawRewards, walletAddress]);
};
