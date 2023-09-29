import { useEffect, useState } from 'react';
import { W3bNumber } from '../types/wagmi.ts';
import { useContractRead } from 'wagmi';
import ALICE_ABI from '../abis/ALICE.json';
import { BONALICE_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { w3bNumberFromBigint } from '../utils/web3.ts';
import useUserProfile from '../contexts/UserProfile/useUserProfile.ts';

const useAllowance = (
  contractAddress: `0x${string}`,
  spenderAddress?: `0x${string}`,
) => {
  const [allowance, setAllowance] = useState<W3bNumber | null>(null);
  const { walletAddress } = useUserProfile();

  const { data, isFetched } = useContractRead({
    abi: ALICE_ABI,
    address: contractAddress,
    functionName: 'allowance',
    args: [
      walletAddress,
      spenderAddress ? spenderAddress : BONALICE_ADDRESS[getCurrentChainId()],
    ],
    chainId: getCurrentChainId(),
    watch: true,
  });

  useEffect(() => {
    if (isFetched && data !== undefined && data !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAllowance(w3bNumberFromBigint(data));
    }
  }, [isFetched, data]);

  return { allowance };
};

export default useAllowance;
