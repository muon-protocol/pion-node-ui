import { createContext, ReactNode, useEffect, useState } from 'react';
import { useBalance } from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import { LP_TOKEN_ADDRESS } from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

const LPTokenContext = createContext<{
  LPTokenBalanceIsFetched: boolean;
  LPTokenBalanceIsLoading: boolean;
  LPTokenBalance: W3bNumber | null;
}>({
  LPTokenBalanceIsFetched: false,
  LPTokenBalanceIsLoading: false,
  LPTokenBalance: null,
});

const LPTokenProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();
  const [LPTokenBalance, setLPTokenBalance] = useState<W3bNumber | null>(null);

  const {
    data: LPTokenBalanceData,
    isFetched: LPTokenBalanceIsFetched,
    isLoading: LPTokenBalanceIsLoading,
  } = useBalance({
    address: walletAddress,
    token: LP_TOKEN_ADDRESS[getCurrentChainId()],
    chainId: getCurrentChainId(),
    watch: true,
  });

  useEffect(() => {
    if (LPTokenBalanceIsFetched && LPTokenBalanceData) {
      setLPTokenBalance(w3bNumberFromBigint(LPTokenBalanceData.value));
    }
  }, [LPTokenBalanceIsFetched, LPTokenBalanceData]);

  return (
    <LPTokenContext.Provider
      value={{
        LPTokenBalanceIsFetched,
        LPTokenBalanceIsLoading,
        LPTokenBalance,
      }}
    >
      {children}
    </LPTokenContext.Provider>
  );
};

export { LPTokenProvider, LPTokenContext };
