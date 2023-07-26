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

export type BalanceData = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

export type W3bNumber = {
  hStr: string; // human-readable string - complete number in string
  dsp: number; // display number - number rounded to meaningful number of decimal places, here 2
  big: bigint; // big integer - complete number in bigint
  bigStr: string; // big integer string - complete number in string
};
