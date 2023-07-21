import { useCallback, useEffect, useState } from 'react';
import { BonALICE } from '../types';
import { useAddNodeArgs, useApproveBonALICEArgs } from './useContractArgs.ts';
import useWagmiContractWrite from './useWagmiContractWrite.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import MuonNodeStakingABI from '../abis/MuonNodeStaking.json';
import {
  BONALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../constants/addresses.ts';
import toast from 'react-hot-toast';
import { getNodeStatusAPI } from '../apis';
import { useBonAliceGetApproved } from '../abis/types/generated.ts';
import BONALICE_ABI from '../abis/BonALICE';

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
    showErrorToast: true,
  });

  const addNodeToNetwork = useCallback(async () => {
    try {
      setIsGettingNodeStatusLoading(false);
      await addNode?.({
        pending: 'Waiting for Confirmation',
        success: 'Node Added Successfully!',
        failed: 'Error Adding Node!',
      });
    } catch (e: any) {
      setIsGettingNodeStatusLoading(false);
    }
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

  const { data: approvedBonALICEAddress } = useBonAliceGetApproved({
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: nodeBonALICE ? [nodeBonALICE.tokenId] : undefined,
    watch: true,
  });
  console.log(approvedBonALICEAddress);

  const approveBonALICEArgs = useApproveBonALICEArgs({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    tokenId: nodeBonALICE?.tokenId,
  });

  const { callback: approveBonALICE, isTransactionLoading: isApproving } =
    useWagmiContractWrite({
      abi: BONALICE_ABI,
      chainId: getCurrentChainId(),
      functionName: 'approve',
      args: approveBonALICEArgs,
      address: BONALICE_ADDRESS[getCurrentChainId()],
      showErrorToast: true,
    });

  const handleApproveClicked = () => {
    try {
      approveBonALICE?.({
        pending: 'Waiting for Confirmation',
        success: 'Approved Successfully!',
        failed: 'Error Approving!',
      });
    } catch (e) {
      console.log(e);
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
    approvedBonALICEAddress,
    handleApproveClicked,
    isApproving,
  };
};

export default useNodeBonALICE;
