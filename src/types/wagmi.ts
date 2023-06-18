export type WagmiUseBalanceResponseType = {
  data?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
  error?: Error;
  isIdle: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isRefetching: boolean;
  refetch: (options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<{
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  }>;
  status: 'idle' | 'error' | 'loading' | 'success';
};
