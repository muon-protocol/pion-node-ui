import { createContext, ReactNode, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
// import {erc20ABI} from "wagmi";
import { getCurrentChainId } from '../../constants/chains.ts';
import { LP_TOKEN_ADDRESS } from '../../constants/addresses.ts';
import LP_TOKEN_ABI from '../../abis/PION/Mainnet/LPToken.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
import { useLpTokenDecimals } from '../../abis/types/generated.ts';
// import { useLpTokenBalanceOf } from '../../abis/types/generated.ts';
// import { useLpTokenDecimals } from '../../abis/types/generated.ts';
// import { useLpTokenBalanceOf } from '../../abis/types/generated.ts';

const LPTokenContext = createContext<{
  LPTokenBalanceIsFetched: boolean;
  LPTokenBalanceIsLoading: boolean;
  LPTokenBalance: W3bNumber | null;
  LPTokenDecimals: number | undefined;
}>({
  LPTokenBalanceIsFetched: false,
  LPTokenBalanceIsLoading: false,
  LPTokenBalance: null,
  LPTokenDecimals: undefined,
});

const LPTokenProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [LPTokenBalance, setLPTokenBalance] = useState<W3bNumber | null>(null);

  const { data: decimals } = useLpTokenDecimals({
    address: LP_TOKEN_ADDRESS[getCurrentChainId()],
  });

  const {
    data: LPTokenBalanceData,
    isFetched: LPTokenBalanceIsFetched,
    isLoading: LPTokenBalanceIsLoading,
  } = useContractRead({
    abi: LP_TOKEN_ABI,
    address: LP_TOKEN_ADDRESS[getCurrentChainId()],
    functionName: 'balanceOf',
    args: walletAddress ? [walletAddress] : undefined,
    chainId: getCurrentChainId(),
    watch: true,
    enabled: !!walletAddress,
  });

  useEffect(() => {
    if (LPTokenBalanceIsFetched && LPTokenBalanceData !== undefined) {
      setLPTokenBalance(w3bNumberFromBigint(LPTokenBalanceData, decimals));
    }
  }, [LPTokenBalanceIsFetched, LPTokenBalanceData, decimals]);

  return (
    <LPTokenContext.Provider
      value={{
        LPTokenBalanceIsFetched,
        LPTokenBalanceIsLoading,
        LPTokenBalance,
        LPTokenDecimals: decimals,
      }}
    >
      {children}
    </LPTokenContext.Provider>
  );
};

export { LPTokenProvider, LPTokenContext };
