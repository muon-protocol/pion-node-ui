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
  } = useMergeAction();
  const { bonALICEs } = useBonALICE();
  const { chainId, handleSwitchNetwork } = useUserProfile();

  const isMergeBonALICEsButtonDisabled = useMemo(() => {
    return selectedMergeBonALICEs.length < 2;
  }, [selectedMergeBonALICEs]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonALICEs"
          onClick={() => openMergeModal()}
          isModalOpen={isMergeModalOpen}
          closeModalHandler={() => closeMergeModal()}
          modalTitle="Select BonALICEs to Merge"
          multiple
          selectedItems={selectedMergeBonALICEs}
          removeItem={(item) => handleMergeModalItemClicked(item)}
        >
          <BonALICEModalBody
            bonALICEs={bonALICEs}
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
                title="New Bonded ALICE"
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
        className="mt-auto max-md:mt-10 max-md:w-[80vw] md:mx-auto !w-full"
      >
        {chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn !w-full"
          >
            Switch Network
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button className="btn !w-full" disabled>
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : (
          <button
            onClick={() => handleMerge()}
            disabled={isMergeBonALICEsButtonDisabled}
            className="btn !w-full"
          >
            Merge Bonded ALICEs
          </button>
        )}
      </FadeIn>
    </>
  );
};

export default RenderMergeBody;
