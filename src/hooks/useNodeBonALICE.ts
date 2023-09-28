import { useCallback, useEffect, useState } from 'react';
import { BonALICE } from '../types';
import { useAddNodeArgs, useApproveBonALICEArgs } from './useContractArgs.ts';
import useWagmiContractWrite from './useWagmiContractWrite.ts';
import { getCurrentChainId } from '../constants/chains.ts';
import MuonNodeStakingABI from '../abis/MuonNodeStaking.json';
import {
  BONALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
  MUON_NODE_MANAGER_ADDRESS,
} from '../constants/addresses.ts';
import {
  useBonAliceGetApproved,
  useBonAliceOwnerOf,
  useMuonNodeManagerStakerAddressInfo,
} from '../abis/types/generated.ts';
import BONALICE_ABI from '../abis/BonALICE';
import useUserProfile from '../contexts/UserProfile/useUserProfile.ts';

const useNodeBonALICE = () => {
  const [nodeBonALICE, setNodeBonALICE] = useState<BonALICE | null>(null);
  const [isSelectNodeBonALICEModalOpen, setIsSelectNodeBonALICEModalOpen] =
    useState(false);
  useState(false);
  const [peerID, setPeerID] = useState<string>('');
  const [nodeAddress, setNodeAddress] = useState<string>('');
  const { walletAddress } = useUserProfile();

  const { data: nodeBonALICEAddress } = useBonAliceOwnerOf({
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: nodeBonALICE ? [BigInt(nodeBonALICE.tokenId)] : undefined,
    watch: true,
  });

  const { data: stakerAddressInfo } = useMuonNodeManagerStakerAddressInfo({
    address: MUON_NODE_MANAGER_ADDRESS[getCurrentChainId()],
    args: walletAddress ? [walletAddress] : undefined,
    watch: true,
  });

  const addNodeArgs = useAddNodeArgs({
    nodeAddress: nodeAddress,
    peerID: peerID,
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
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    args: addNodeArgs,
    showErrorToast: true,
  });

  const [isAddingNodeLoading, setIsAddingNodeLoading] = useState(false);

  const addNodeToNetwork = useCallback(async () => {
    setIsAddingNodeLoading(true);
    try {
      await addNode?.({
        pending: 'Waiting for Confirmation',
        success: 'Node Added Successfully!',
        failed: 'Error Adding Node!',
      });
      setIsAddingNodeLoading(false);
    } catch (e: any) {
      console.log(e);
      setIsAddingNodeLoading(false);
    }
  }, [addNode]);

  useEffect(() => {
    setNodeBonALICE(null);
    setPeerID('');
    setNodeAddress('');
  }, [walletAddress]);

  const handleAddNodeClicked = async () => {
    addNodeToNetwork();
  };

  const { data: approvedBonALICEAddress } = useBonAliceGetApproved({
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: nodeBonALICE ? [nodeBonALICE.tokenId] : undefined,
    watch: true,
  });

  const approveBonALICEArgs = useApproveBonALICEArgs({
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    tokenId: nodeBonALICE?.tokenId,
  });

  const {
    callback: approveBonALICE,
    isTransactionLoading: isApproving,
    isMetamaskLoading: isApproveMetamaskLoading,
  } = useWagmiContractWrite({
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
    handleAddNodeClicked,
    isMetamaskLoading: isMetamaskLoading || isApproveMetamaskLoading,
    isTransactionLoading,
    approvedBonALICEAddress,
    handleApproveClicked,
    isApproving,
    nodeBonALICEAddress,
    stakerAddressInfo,
    peerID,
    setPeerID,
    nodeAddress,
    setNodeAddress,
    isAddingNodeLoading,
    setIsAddingNodeLoading,
  };
};

export default useNodeBonALICE;
