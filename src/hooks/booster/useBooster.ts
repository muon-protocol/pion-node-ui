import {
  useBoosterBoostValue,
  useBoosterGetBoostableAmount,
} from '../../abis/types/generated.ts';
import { BOOSTER_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const useBooster = (tokenId?: bigint) => {
  const { data: boostableAmount } = useBoosterGetBoostableAmount({
    address: BOOSTER_ADDRESS[getCurrentChainId()],
    args: tokenId ? [tokenId] : undefined,
    watch: true,
    enabled: !!tokenId,
  });

  const { data: boostCoefficient } = useBoosterBoostValue({
    address: BOOSTER_ADDRESS[getCurrentChainId()],
  });

  return {
    boostableAmount: boostableAmount
      ? w3bNumberFromBigint(boostableAmount)
      : undefined,
    boostCoefficient: boostCoefficient
      ? w3bNumberFromBigint(boostCoefficient)
      : undefined,
  };
};
