import useMergeAction from '../../contexts/MergeAction/useMergeAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo } from 'react';
import { FadeIn, MoveUpIn, SwingIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';

const RenderMergeBody = () => {
  const {
    isMergeModalOpen,
    openMergeModal,
    closeMergeModal,
    handleMergeModalItemClicked,
    selectedMergeBonALICEs,
    isInSelectedMergeBonALICEs,
    merge,
  } = useMergeAction();
  const { bonALICEs } = useBonALICE();

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
          <div className="flex flex-col gap-3">
            {bonALICEs.map((item) => {
              return (
                <BonALICECard
                  className="cursor-pointer"
                  title={'BonALICE #' + item.tokenId}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={'ALICE Starter (Tier 1)'}
                  onClick={() => handleMergeModalItemClicked(item)}
                  compact
                  selected={isInSelectedMergeBonALICEs(item)}
                />
              );
            })}
          </div>
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
                subValue2="ALICE Starter (Tier 1)"
                selected
              />
            </FadeIn>
          </MoveUpIn>
        </>
      )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          onClick={() => merge()}
          disabled={isMergeBonALICEsButtonDisabled}
          className="btn !w-full"
        >
          Merge
        </button>
      </FadeIn>
    </>
  );
};

export default RenderMergeBody;
