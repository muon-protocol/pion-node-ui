import ALICE_ABI from '../abis/ALICE.json';
import { BONALICE_ADDRESS } from '../constants/addresses.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import { W3bNumber } from '../types/wagmi.ts';
import useAliceContractWrite from './useAliceContractWrite.ts';
import { LP_TOKEN_ABI } from '../abis/LPToken.ts';

const useApprove = (
  abi: typeof ALICE_ABI | typeof LP_TOKEN_ABI,
  tokenAddress: `0x${string}`,
  approveAmount: W3bNumber,
) => {
  const { callback: approveCallback } = useAliceContractWrite({
    abi: abi,
    address: tokenAddress,
    functionName: 'approve',
    args: [BONALICE_ADDRESS[getCurrentChainId()], approveAmount.big],
    chainId: getCurrentChainId(),
  });

  // const approve = useCallback(async () => {
  //   const { hash } = await writeContract({
  //     abi: ALICE_ABI,
  //     address: tokenAddress,
  //     functionName: 'approve',
  //     args: [BONALICE_ADDRESS[getCurrentChainId()], approveAmount.big],
  //     chainId: getCurrentChainId(),
  //   });

  // return hash;
  // }, [approveAmount, tokenAddress]);

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
