import { useState } from 'react';
import { BonALICE } from '../types';
import { useAddNodeArgs } from './useContractArgs.ts';
import useWagmiContractWrite from './useWagmiContractWrite.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import MuonNodeStakingABI from '../abis/MuonNodeStaking.json';
import { MUON_NODE_STAKING_ADDRESS } from '../constants/addresses.ts';
import toast from 'react-hot-toast';
import { getNodeStatusAPI } from '../apis';

const useNodeBonALICE = () => {
  const [nodeBonALICE, setNodeBonALICE] = useState<BonALICE | null>(null);
  const [isSelectNodeBonALICEModalOpen, setIsSelectNodeBonALICEModalOpen] =
    useState(false);
  const [nodeIP, setNodeIP] = useState<string>('');
  const [isGettingNodeStatusLoading, setIsGettingNodeStatusLoading] =
    useState(false);
  const [peerId, setPeerId] = useState<string>('');

  const addNodeArgs = useAddNodeArgs({
    nodeAddress: peerId,
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
    setIsGettingNodeStatusLoading(true);
    try {
      const response = await getNodeStatusAPI(nodeIP);
      if (response.success) {
        setPeerId(response.result.staker);
        setTimeout(async () => {
          try {
            setIsGettingNodeStatusLoading(false);
            await addNode?.({
              pending: 'Waiting for Confirmation',
              success: 'Node Added Successfully!',
              failed: 'Error Adding Node!',
            });
          } catch (e: any) {
            setIsGettingNodeStatusLoading(false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (
              e.cause.toString().includes('Insufficient amount to run a node.')
            ) {
              toast.success('Insufficient amount to run a node.');
            }
          }
        }, 400);
      } else {
        setIsGettingNodeStatusLoading(false);
        toast.error('Something went wrong. Please try again.');
      }
    } catch (e) {
      setIsGettingNodeStatusLoading(false);
      toast.error('Something went wrong. Please try again.');
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
    isGettingNodeStatusLoading,
  };
};

export default useNodeBonALICE;
