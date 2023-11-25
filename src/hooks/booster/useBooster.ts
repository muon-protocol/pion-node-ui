import { useBoosterBoostValue } from '../../abis/types/generated.ts';
import { BOOSTER_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const useBooster = () => {
  const { data: boostCoefficient } = useBoosterBoostValue({
    address: BOOSTER_ADDRESS[getCurrentChainId()],
  });

  return {
    boostCoefficient: boostCoefficient
      ? w3bNumberFromBigint(boostCoefficient)
      : undefined,
  };
};
