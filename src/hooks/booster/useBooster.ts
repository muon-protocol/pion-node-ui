import { useBoosterGetBoostableAmount } from '../../abis/types/generated.ts';
import { BOOSTER_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
export const useBooster = (tokenId: bigint) => {
  const { data: boostableAmount } = useBoosterGetBoostableAmount({
    address: BOOSTER_ADDRESS[getCurrentChainId()],
    args: tokenId ? [tokenId] : undefined,
    watch: true,
  });

  return {
    boostableAmount: boostableAmount
      ? w3bNumberFromBigint(boostableAmount)
      : undefined,
  };
};
