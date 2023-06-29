import { createContext, ReactNode, useEffect, useState } from 'react';
import { useBalance, useContractRead } from 'wagmi';
import { getCurrentChainId } from '../../constants/chains.ts';
import {
  BONALICE_ADDRESS,
  LP_TOKEN_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';
import ALICE_ABI from '../../abis/ALICE.json';

const LPTokenContext = createContext<{
  LPTokenBalanceIsFetched: boolean;
  LPTokenBalanceIsLoading: boolean;
  LPTokenBalance: W3bNumber | null;
  allowanceIsFetched: boolean;
  allowanceIsLoading: boolean;
  allowance: W3bNumber | null;
}>({
  LPTokenBalanceIsFetched: false,
  LPTokenBalanceIsLoading: false,
  LPTokenBalance: null,
  allowanceIsFetched: false,
  allowanceIsLoading: false,
  allowance: null,
});

const LPTokenProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useUserProfile();

  const [LPTokenBalance, setLPTokenBalance] = useState<W3bNumber | null>(null);

  const [allowance, setAllowance] = useState<W3bNumber | null>(null);

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
    if (
      LPTokenBalanceIsFetched &&
      LPTokenBalanceData &&
      LPTokenBalanceData?.value
    ) {
      setLPTokenBalance(w3bNumberFromBigint(LPTokenBalanceData.value));
    }
  }, [LPTokenBalanceIsFetched, LPTokenBalanceData]);

  const {
    data: allowanceData,
    isFetched: allowanceIsFetched,
    isLoading: allowanceIsLoading,
  } = useContractRead({
    abi: ALICE_ABI,
    address: LP_TOKEN_ADDRESS[getCurrentChainId()],
    functionName: 'allowance',
    args: [walletAddress, BONALICE_ADDRESS[getCurrentChainId()]],
    chainId: getCurrentChainId(),
    watch: true,
  });

  useEffect(() => {
    if (allowanceIsFetched && allowanceData !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAllowance(w3bNumberFromBigint(allowanceData));
    }
  }, [allowanceIsFetched, allowanceData]);

  return (
    <LPTokenContext.Provider
      value={{
        LPTokenBalanceIsFetched,
        LPTokenBalanceIsLoading,
        LPTokenBalance,
        allowanceIsFetched,
        allowanceIsLoading,
        allowance,
      }}
    >
      {children}
    </LPTokenContext.Provider>
  );
};

export { LPTokenProvider, LPTokenContext };
