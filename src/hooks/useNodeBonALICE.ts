import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { checkIPwithNodeSpecificationsAPI } from '../apis';
import { createFromJSON } from '@libp2p/peer-id-factory';
import { checkIPwithNodeSpecificationsAPI } from '../apis';

const useNodeBonALICE = () => {
  const [nodeBonALICE, setNodeBonALICE] = useState<BonALICE | null>(null);
  const [isSelectNodeBonALICEModalOpen, setIsSelectNodeBonALICEModalOpen] =
    useState(false);
  useState(false);

  const [nodeIP, setNodeIP] = useState<string>('');
  const [invalidInfoError, setInvalidInfoError] = useState<string>('');

  const [peerID, setPeerID] = useState<string>('');
  const [isPeerIDValid, setIsPeerIDValid] = useState<boolean>(true);

  const [nodeAddress, setNodeAddress] = useState<string>('');
  const { walletAddress } = useUserProfile();

  useEffect(() => {
    if (peerID.length === 0) {
      setIsPeerIDValid(true);
      return;
    }

    setIsPeerIDValid(true);
    const validatePeerID = async () => {
      createFromJSON({ id: peerID })
        .then(() => {
          setIsPeerIDValid(true);
        })
        .catch(() => {
          setIsPeerIDValid(false);
        });
    };

    validatePeerID();
  }, [peerID]);

  const { data: nodeBonALICEAddress } = useBonAliceOwnerOf({
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: nodeBonALICE ? [BigInt(nodeBonALICE.tokenId)] : undefined,
    watch: true,
  });

  const isNodeAddressValid = useMemo(() => {
    if (nodeAddress.length === 0) return true;

    const re = /^0x[a-fA-F0-9]{40}$/;
    return re.test(nodeAddress);
  }, [nodeAddress]);

  useEffect(() => {
    if (peerID.length === 0) {
      setIsPeerIDValid(true);
      return;
    }

    setIsPeerIDValid(true);
    const validatePeerID = async () => {
      createFromJSON({ id: peerID })
        .then(() => {
          setIsPeerIDValid(true);
        })
        .catch(() => {
          setIsPeerIDValid(false);
        });
    };

    validatePeerID();
  }, [peerID]);

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
    setInvalidInfoError('');
    try {
      const response = await checkIPwithNodeSpecificationsAPI({
        nodeIP: nodeIP,
        peerID: peerID,
        nodeAddress: nodeAddress,
      });
      if (!response.success) {
        setIsAddingNodeLoading(false);
        setInvalidInfoError(response.message);
        return;
      }

      if (response.success) {
        await addNode?.({
          pending: 'Waiting for Confirmation',
          success: 'Node Added Successfully!',
          failed: 'Error Adding Node!',
        });
        setIsAddingNodeLoading(false);
      }
    } catch (e: any) {
      console.log(e);
      setIsAddingNodeLoading(false);
    }
  }, [addNode, nodeAddress, nodeIP, peerID]);

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
    invalidInfoError,
    nodeIP,
    setNodeIP,
    peerID,
    setPeerID,
    nodeAddress,
    setNodeAddress,
    isAddingNodeLoading,
    setIsAddingNodeLoading,
    nodeIP,
    setNodeIP,
    isNodeAddressValid,
    isPeerIDValid,
    invalidInfoError,
  };
};

export default useNodeBonALICE;
