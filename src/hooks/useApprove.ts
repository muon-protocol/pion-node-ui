import { BONALICE_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';
import useWagmiContractWrite from './useWagmiContractWrite.ts';

const useApprove = (
  abi: any,
  tokenAddress: `0x${string}`,
  approveAmount: W3bNumber,
) => {
  const { callback: approveCallback } = useWagmiContractWrite({
    abi: abi,
    address: tokenAddress,
    functionName: 'approve',
    args: [BONALICE_ADDRESS[getCurrentChainId()], approveAmount.big],
    chainId: getCurrentChainId(),
  });

  const approve = () => {
    approveCallback?.({
      pending: 'Approving...',
      success: 'Approved!',
      failed: 'Failed to approve',
    });
  };

  return { approve };
};

export default useApprove;
