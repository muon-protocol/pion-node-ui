import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMigrationDataAPI } from '../../apis';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
import useAllowance from '../useAllowance.ts';
import {
  MIGRATION_HELPER,
  OLD_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import {
  useMigrationHelperClaimed,
  useOldTokenBalanceOf,
} from '../../abis/types/generated.ts';
import useWagmiContractWrite from '../useWagmiContractWrite.ts';
import OLD_TOKEN_ABI from '../../abis/PION/OldToken';
import MIGRRATE_HELPER_ABI from '../../abis/PION/MigrationHelper';

export const useMigration = () => {
  const { walletAddress } = useUserProfile();

  const [snapshotAmount, setSnapshotAmount] = useState<null | W3bNumber>(null);
  const [snapshotMEXCAmount, setSnapshotMEXCAmount] =
    useState<null | W3bNumber>(null);
  const [signature, setSignature] = useState<null | string>(null);

  const { data: oldTokenBalance } = useOldTokenBalanceOf({
    address: OLD_TOKEN_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    chainId: getCurrentChainId(),
    watch: true,
    enabled: !!walletAddress,
  });

  useEffect(() => {
    const getMigrationData = async () => {
      if (walletAddress) {
        try {
          const response = await getMigrationDataAPI({ walletAddress });
          if (response.success) {
            setSnapshotAmount(w3bNumberFromBigint(BigInt(response.amount)));
            setSnapshotMEXCAmount(w3bNumberFromBigint(BigInt(response.mexc)));
            setSignature(response.signature);
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    };

    setSnapshotAmount(null);
    setSignature(null);

    getMigrationData();
  }, [walletAddress]);

  const { allowance: oldTokenAllowance } = useAllowance(
    OLD_TOKEN_ADDRESS[getCurrentChainId()],
    MIGRATION_HELPER[getCurrentChainId()],
    18,
  );

  const { data: claimedAmount } = useMigrationHelperClaimed({
    address: MIGRATION_HELPER[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    chainId: getCurrentChainId(),
    watch: true,
    enabled: !!walletAddress,
  });

  const claimableAmount = useMemo(() => {
    if (snapshotAmount != null && claimedAmount != null) {
      return w3bNumberFromBigint(snapshotAmount.big - claimedAmount);
    }
    return null;
  }, [snapshotAmount, claimedAmount]);

  const { callback: approveOldToken } = useWagmiContractWrite({
    address: OLD_TOKEN_ADDRESS[getCurrentChainId()],
    abi: OLD_TOKEN_ABI,
    functionName: 'approve',
    chainId: getCurrentChainId(),
    args: claimableAmount
      ? [MIGRATION_HELPER[getCurrentChainId()], claimableAmount.big]
      : undefined,
  });

  const approveBalanceToHelper = useCallback(async () => {
    try {
      await approveOldToken?.({
        success: 'Approved successfully',
        failed: 'Failed to approve',
        pending: 'Approving...',
      });
    } catch (error) {
      console.log('error', error);
    }
  }, [approveOldToken]);

  const { callback: claim } = useWagmiContractWrite({
    address: MIGRATION_HELPER[getCurrentChainId()],
    abi: MIGRRATE_HELPER_ABI,
    functionName: 'claim',
    chainId: getCurrentChainId(),
    args:
      snapshotAmount && oldTokenBalance && signature
        ? [
            Math.min(Number(snapshotAmount.big), Number(oldTokenBalance)),
            signature,
          ]
        : undefined,
  });

  const claimNewToken = useCallback(async () => {
    try {
      await claim?.({
        success: 'Claimed successfully',
        failed: 'Failed to claim',
        pending: 'Claiming...',
      });
    } catch (error) {
      console.log('error', error);
    }
  }, [claim]);

  return {
    snapshotAmount,
    snapshotMEXCAmount,
    signature,
    oldTokenAllowance,
    oldTokenBalance:
      oldTokenBalance !== undefined
        ? w3bNumberFromBigint(oldTokenBalance)
        : null,
    approveBalanceToHelper,
    claimNewToken,
    claimedAmount:
      claimedAmount !== undefined ? w3bNumberFromBigint(claimedAmount) : null,
    claimableAmount,
  };
};
