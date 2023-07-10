import { useState } from 'react';
import { BonALICE } from '../types';
import { useAddNodeArgs } from './useContractArgs.ts';
import useClaimPrize from '../contexts/ClaimPrize/useActions.ts';
import useWagmiContractWrite from './useWagmiContractWrite.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import MuonNodeStakingABI from '../abis/MuonNodeStaking.json';
import { MUON_NODE_STAKING_ADDRESS } from '../constants/addresses.ts';
import toast from 'react-hot-toast';

const useNodeBonALICE = () => {
  const [nodeBonALICE, setNodeBonALICE] = useState<BonALICE | null>(null);
  const [isSelectNodeBonALICEModalOpen, setIsSelectNodeBonALICEModalOpen] =
    useState(false);
  const [nodeIP, setNodeIP] = useState<string>('');
  const { stakingAddress } = useClaimPrize();

  const addNodeArgs = useAddNodeArgs({
    nodeAddress: stakingAddress,
    peerId: nodeIP,
    tokenId: nodeBonALICE?.tokenId,
  });

  const {
    callback: addNode,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    chainId: getCurrentChainId(),
    functionName: 'addMuonNode',
    abi: MuonNodeStakingABI,
    args: addNodeArgs,
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
  });

  const handleAddNodeClicked = async () => {
    if (!nodeIP || !nodeBonALICE) return;
    try {
      await addNode?.({
        pending: 'Waiting for confirmation',
        success: 'Node added',
        failed: 'Error adding node',
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (e.cause.toString().includes('Insufficient amount to run a node.')) {
        toast.error('Insufficient amount to run a node.');
      }
    }
  };

  return {
    nodeBonALICE,
    setNodeBonALICE,
    isSelectNodeBonALICEModalOpen,
    setIsSelectNodeBonALICEModalOpen,
    nodeIP,
    setNodeIP,
    handleAddNodeClicked,
    isMetamaskLoading,
    isTransactionLoading,
  };
};

export default useNodeBonALICE;
