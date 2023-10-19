import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BonALICE } from '../../types';
import { useMergeArgs } from '../../hooks/useContractArgs.ts';
import useWagmiContractWrite from '../../hooks/useWagmiContractWrite.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import BONALICE_ABI from '../../abis/BonALICE.json';
import MUON_NODE_STAKING_ABI from '../../abis/MuonNodeStaking.ts';
import {
  BONALICE_ADDRESS,
  MUON_NODE_STAKING_ADDRESS,
} from '../../constants/addresses.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { useBonAliceGetApproved } from '../../abis/types/generated.ts';

const MergeActionContext = createContext<{
  isMergeModalOpen: boolean;
  openMergeModal: () => void;
  closeMergeModal: () => void;
  selectedMergeBonALICEs: BonALICE[];
  isInSelectedMergeBonALICEs: (bonALICE: BonALICE) => boolean;
  handleMergeModalItemClicked: (bonALICE: BonALICE) => void;
  handleMerge: () => void;
  isMetamaskLoading: boolean;
  isTransactionLoading: boolean;
  tokenApprovedContractAddress: string | undefined;
  handleApproveNFT: () => void;
}>({
  isMergeModalOpen: false,
  openMergeModal: () => {},
  closeMergeModal: () => {},
  selectedMergeBonALICEs: [],
  isInSelectedMergeBonALICEs: () => false,
  handleMergeModalItemClicked: () => {},
  handleMerge: () => {},
  isMetamaskLoading: false,
  isTransactionLoading: false,
  tokenApprovedContractAddress: undefined,
  handleApproveNFT: () => {},
});

const MergeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [mergeModalSelectedBonALICEs, setMergeModalSelectedBonALICEs] =
    useState<BonALICE[]>([]);

  const handleMergeModalItemClicked = (bonALICE: BonALICE) => {
    if (
      mergeModalSelectedBonALICEs.find((b) => b.tokenId === bonALICE.tokenId)
    ) {
      removeMergeModalSelectedBonALICE(bonALICE);
    } else {
      if (mergeModalSelectedBonALICEs.length < 2) {
        addMergeModalSelectedBonALICE(bonALICE);
      }
    }
  };

  const mergeArgs = useMergeArgs({
    tokenId1: mergeModalSelectedBonALICEs[0]?.tokenId,
    tokenId2: mergeModalSelectedBonALICEs[1]?.tokenId,
  });

  const {
    callback: merge,
    isMetamaskLoading,
    isTransactionLoading,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'merge',
    args: mergeArgs,
    chainId: getCurrentChainId(),
  });

  const { nodeBonALICE } = useMuonNodeStaking();

  const isInSelectedMergeBonALICEs = useCallback(
    (bonALICE: BonALICE) => {
      return !!mergeModalSelectedBonALICEs.find(
        (b) => b.tokenId === bonALICE.tokenId,
      );
    },
    [mergeModalSelectedBonALICEs],
  );

  const selectedTokenId = useMemo(() => {
    if (mergeModalSelectedBonALICEs.length < 2 || nodeBonALICE.length === 0)
      return undefined;
    if (isInSelectedMergeBonALICEs(nodeBonALICE[0])) {
      return mergeModalSelectedBonALICEs.find(
        (nft) => nft.tokenId !== nodeBonALICE[0]?.tokenId,
      )?.tokenId;
    }
    return undefined;
  }, [mergeModalSelectedBonALICEs, nodeBonALICE, isInSelectedMergeBonALICEs]);

  const { data: tokenApprovedContractAddress } = useBonAliceGetApproved({
    address: BONALICE_ADDRESS[getCurrentChainId()],
    args: [selectedTokenId],
    watch: true,
  });

  const {
    callback: mergeWithNodeNFT,
    isMetamaskLoading: isMergeWithNodeNFTLoading,
    isTransactionLoading: isMergeWithNodeNFTTransactionLoading,
  } = useWagmiContractWrite({
    abi: MUON_NODE_STAKING_ABI,
    address: MUON_NODE_STAKING_ADDRESS[getCurrentChainId()],
    functionName: 'mergeBondedTokens',
    args: [
      mergeModalSelectedBonALICEs.find(
        (nft) => nft.tokenId !== nodeBonALICE[0]?.tokenId,
      )?.tokenId,
    ],
    chainId: getCurrentChainId(),
  });
  const handleMerge = async () => {
    if (!mergeArgs) return;
    try {
      if (
        nodeBonALICE.length > 0 &&
        isInSelectedMergeBonALICEs(nodeBonALICE[0])
      ) {
        await mergeWithNodeNFT?.({
          pending: 'Merging with Node BonPION...',
          success: 'Merged!',
          failed: 'Failed to Merge with Node BonPION.',
        });
      } else {
        await merge?.({
          pending: 'Merging Bonded PIONs...',
          success: 'Merged!',
          failed: 'Failed to Merge Bonded PIONs.',
        });
      }
      setMergeModalSelectedBonALICEs([]);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    callback: approveNFT,
    isMetamaskLoading: isApproveNFTLoading,
    isTransactionLoading: isApproveNFTTransactionLoading,
  } = useWagmiContractWrite({
    abi: BONALICE_ABI,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'approve',
    args: [MUON_NODE_STAKING_ADDRESS[getCurrentChainId()], selectedTokenId],
    chainId: getCurrentChainId(),
  });

  const handleApproveNFT = useCallback(async () => {
    try {
      await approveNFT?.({
        pending: 'Approving NFT...',
        success: 'Approved!',
        failed: 'Failed to Approve NFT.',
      });
    } catch (error) {
      console.log(error);
    }
  }, [approveNFT]);

  useEffect(() => {
    if (mergeModalSelectedBonALICEs.length === 2) {
      closeMergeModal();
    }
  }, [mergeModalSelectedBonALICEs]);

  const addMergeModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setMergeModalSelectedBonALICEs([...mergeModalSelectedBonALICEs, bonALICE]);
  };

  const removeMergeModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setMergeModalSelectedBonALICEs(
      mergeModalSelectedBonALICEs.filter((b) => b.tokenId !== bonALICE.tokenId),
    );
  };

  const { walletAddress } = useUserProfile();

  useEffect(() => {
    setMergeModalSelectedBonALICEs([]);
  }, [walletAddress]);

  const openMergeModal = () => setIsMergeModalOpen(true);
  const closeMergeModal = () => setIsMergeModalOpen(false);

  return (
    <MergeActionContext.Provider
      value={{
        isMergeModalOpen,
        openMergeModal,
        closeMergeModal,
        selectedMergeBonALICEs: mergeModalSelectedBonALICEs,
        isInSelectedMergeBonALICEs,
        handleMergeModalItemClicked,
        handleMerge,
        isMetamaskLoading:
          isMetamaskLoading || isMergeWithNodeNFTLoading || isApproveNFTLoading,
        isTransactionLoading:
          isTransactionLoading ||
          isMergeWithNodeNFTTransactionLoading ||
          isApproveNFTTransactionLoading,
        tokenApprovedContractAddress,
        handleApproveNFT,
      }}
    >
      {children}
    </MergeActionContext.Provider>
  );
};

export { MergeActionProvider, MergeActionContext };
