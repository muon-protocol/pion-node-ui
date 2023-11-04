import useMergeAction from '../../contexts/MergeAction/useMergeAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo } from 'react';
import { FadeIn, MoveUpIn, SwingIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import BonALICEModalBody from '../../components/Common/BonALICEModalBody.tsx';
import { getTier } from '../../utils';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { MUON_NODE_STAKING_ADDRESS } from '../../constants/addresses.ts';
import strings from '../../constants/strings.ts';

const RenderMergeBody = () => {
  const {
    isMergeModalOpen,
    openMergeModal,
    closeMergeModal,
    handleMergeModalItemClicked,
    selectedMergeBonALICEs,
    isInSelectedMergeBonALICEs,
    isMetamaskLoading,
    isTransactionLoading,
    handleMerge,
    tokenApprovedContractAddress,
    handleApproveNFT,
  } = useMergeAction();

  const { bonALICEs } = useBonALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  const { chainId, handleSwitchNetwork } = useUserProfile();

  const isMergeBonALICEsButtonDisabled = useMemo(() => {
    return selectedMergeBonALICEs.length < 2;
  }, [selectedMergeBonALICEs]);

  const isApproveNFTActive = useMemo(() => {
    if (selectedMergeBonALICEs.length !== 2) return false;
    if (nodeBonALICE.length === 0) return false;
    if (isInSelectedMergeBonALICEs(nodeBonALICE[0])) {
      if (
        tokenApprovedContractAddress !==
        MUON_NODE_STAKING_ADDRESS[getCurrentChainId()]
      ) {
        return true;
      }
    }
    return false;
  }, [
    tokenApprovedContractAddress,
    nodeBonALICE,
    isInSelectedMergeBonALICEs,
    selectedMergeBonALICEs,
  ]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title={`Select two ${strings.nfts} to merge`}
          onClick={() => openMergeModal()}
          isModalOpen={isMergeModalOpen}
          closeModalHandler={() => closeMergeModal()}
          modalTitle={
            [...nodeBonALICE, ...bonALICEs].length > 0
              ? `Select from Your ${strings.nfts} Collection (` +
                selectedMergeBonALICEs.length +
                '/2)'
              : `No ${strings.nfts} to Merge`
          }
          multiple
          selectedItems={selectedMergeBonALICEs}
          removeItem={(item) => handleMergeModalItemClicked(item)}
        >
          <BonALICEModalBody
            bonALICEs={[...nodeBonALICE, ...bonALICEs]}
            handleUpgradeModalItemClicked={handleMergeModalItemClicked}
            isSelectedUpgradeBonALICE={isInSelectedMergeBonALICEs}
          />
        </SelectButtonWithModal>
      </FadeIn>
      {selectedMergeBonALICEs.length == 2 && (
        <>
          <MoveUpIn y={-15} duration={0.3} delay={0.3}>
            <SwingIn duration={1} delay={0}>
              <img
                src="/assets/images/actions/merge-content-icon.svg"
                alt=""
                className="mx-auto mb-6 max-md:w-10"
              />
            </SwingIn>
          </MoveUpIn>
          <MoveUpIn y={-10} duration={0.5} delay={0.3}>
            <FadeIn duration={0.2} delay={0.3}>
              <BonALICECard
                title={`New Bonded ${strings.token}`}
                subTitle1="Node Power"
                subValue1={
                  selectedMergeBonALICEs[0].nodePower +
                  selectedMergeBonALICEs[1].nodePower
                }
                subTitle2="Tier"
                subValue2={getTier(
                  selectedMergeBonALICEs[0].nodePower +
                    selectedMergeBonALICEs[1].nodePower,
                )}
                selected
              />
            </FadeIn>
          </MoveUpIn>
        </>
      )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:w-[80vw] md:mx-auto !w-full"
      >
        {chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn btn--action min-w-full md:min-w-[360px] mx-auto !py-4"
          >
            Switch Network
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button
            className="btn btn--action min-w-full md:min-w-[360px] mx-auto !py-4"
            disabled
          >
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : isApproveNFTActive ? (
          <button
            className="btn btn--action min-w-full md:min-w-[360px] mx-auto !py-4"
            onClick={() => handleApproveNFT()}
          >
            Approve NFT Token
          </button>
        ) : (
          <button
            onClick={() => handleMerge()}
            disabled={isMergeBonALICEsButtonDisabled}
            className="btn btn--action min-w-full md:min-w-[360px] mx-auto !py-4"
          >
            Merge Bonded ${strings.tokens}
          </button>
        )}
      </FadeIn>
    </>
  );
};

export default RenderMergeBody;
