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
// import toast from 'react-hot-toast';
// import { getNodeStatusAPI } from '../apis';
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
  // const [nodeIP, setNodeIP] = useState<string>('');
  // const [isGettingNodeStatusLoading, setIsGettingNodeStatusLoading] =
  useState(false);
  const [peerID, setPeerID] = useState<string>('');
  const [nodeAddress, setNodeAddress] = useState<string>('');
  // const [readyToAddNode, setReadyToAddNode] = useState(false);
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

  // useEffect(() => {
  //   if (readyToAddNode && addNodeArgs && nodeBonALICE) {
  //     setReadyToAddNode(false);
  //     addNodeToNetwork();
  //   }
  // }, [readyToAddNode, addNodeArgs, addNodeToNetwork, nodeBonALICE]);

  useEffect(() => {
    setNodeBonALICE(null);
    setPeerID('');
    setNodeAddress('');
  }, [walletAddress]);

  const handleAddNodeClicked = async () => {
    addNodeToNetwork();
    // if (!nodeIP || !nodeBonALICE) return;
    // setIsGettingNodeStatusLoading(true);
    // try {
    //   // remove https:// and / at the end of the IP
    //   const serverIP = nodeIP.replace('http://', '').replace('/', '');
    //   const response = await getNodeStatusAPI(serverIP);
    //   if (response.success) {
    //     if (response.result.peerID) {
    //       setPeerID(response.result.peerID);
    //       setNodeAddress(response.result.address);
    //       setReadyToAddNode(true);
    //     } else {
    //       toast.success('Node is already added to the network.');
    //       setIsGettingNodeStatusLoading(false);
    //     }
    //   } else {
    //     setIsGettingNodeStatusLoading(false);
    //     toast.error(response.result);
    //   }
    // } catch (e) {
    //   setIsGettingNodeStatusLoading(false);
    //   toast.error('Something went wrong. Please try again.');
    // }
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
    // nodeIP,
    // setNodeIP,
    handleAddNodeClicked,
    isMetamaskLoading: isMetamaskLoading || isApproveMetamaskLoading,
    isTransactionLoading,
    // isGettingNodeStatusLoading,
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
