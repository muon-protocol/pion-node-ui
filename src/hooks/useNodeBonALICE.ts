import { useCallback, useEffect, useState } from 'react';
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
  const [nodeAddress, setNodeAddress] = useState<string>('');
  const [readyToAddNode, setReadyToAddNode] = useState(false);

  const addNodeArgs = useAddNodeArgs({
    nodeAddress: nodeAddress,
    peerId: peerId,
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

  const addNodeToNetwork = useCallback(async () => {
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
        if (e.cause.toString().includes('Insufficient amount to run a node.')) {
          toast.error('Insufficient amount to run a node.');
        }
      }
    }, 200);
  }, [addNode]);

  useEffect(() => {
    if (readyToAddNode && addNodeArgs && nodeBonALICE) {
      setReadyToAddNode(false);
      addNodeToNetwork();
    }
  }, [readyToAddNode, addNodeArgs, addNodeToNetwork, nodeBonALICE]);

  const handleAddNodeClicked = async () => {
    if (!nodeIP || !nodeBonALICE) return;
    setIsGettingNodeStatusLoading(true);
    try {
      const response = await getNodeStatusAPI(nodeIP);
      if (response.success) {
        if (response.result.peerId) {
          setPeerId(response.result.peerId);
          setNodeAddress(response.result.address);
          setReadyToAddNode(true);
        } else {
          toast.success('Node is already added to the network.');
          setIsGettingNodeStatusLoading(false);
        }
      } else {
        setIsGettingNodeStatusLoading(false);
        toast.error(response.result);
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
