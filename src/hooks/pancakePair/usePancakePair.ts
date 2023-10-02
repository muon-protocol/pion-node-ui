import { usePancakePairGetReserves } from '../../abis/types/generated.ts';
import { PANCAKE_PAIR_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import { useMemo } from 'react';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const usePancakePair = () => {
  const { data: reservesData } = usePancakePairGetReserves({
    address: PANCAKE_PAIR_ADDRESS[getCurrentChainId()],
    watch: true,
  });

  const ALICEPrice = useMemo(() => {
    if (reservesData) {
      return (
        w3bNumberFromBigint(reservesData[0]).dsp /
        w3bNumberFromBigint(reservesData[1]).dsp
      );
    }
  }, [reservesData]);

  const USDCPrice = useMemo(() => {
    if (reservesData) {
      return (
        w3bNumberFromBigint(reservesData[1]).dsp /
        w3bNumberFromBigint(reservesData[0]).dsp
      );
    }
  }, [reservesData]);

  return {
    ALICEPrice: ALICEPrice,
    USDCPrice: USDCPrice,
  };
};
