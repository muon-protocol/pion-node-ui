import useSplitAction from '../../contexts/SplitAction/useSplitAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo } from 'react';
import { FadeIn, MoveUpIn, SwingIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import Seekbar from '../../components/Common/Seekbar.tsx';

const RenderSplitBody = () => {
  const {
    splitValue,
    setSplitValue,
    isSplitModalOpen,
    openSplitModal,
    closeSplitModal,
    handleSplitModalItemClicked,
    selectedSplitBonALICE,
    isSelectedSplitBonALICE,
  } = useSplitAction();
  const { bonALICEs } = useBonALICE();

  const isSplitBonALICEsButtonDisabled = useMemo(() => {
    return !selectedSplitBonALICE;
  }, [selectedSplitBonALICE]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonALICE"
          onClick={() => openSplitModal()}
          isModalOpen={isSplitModalOpen}
          closeModalHandler={() => closeSplitModal()}
          modalTitle="Select BonALICE"
          selectedItems={selectedSplitBonALICE ? [selectedSplitBonALICE] : []}
          removeItem={() => {}}
        >
          <div className="flex flex-col gap-3">
            {bonALICEs.map((item) => {
              return (
                <BonALICECard
                  className="cursor-pointer"
                  title={'BonALICE #' + item.tokenId}
                  subTitle1="Node Power"
                  subValue1={50}
                  subTitle2="Tier"
                  subValue2={'ALICE Starter (Tier 1)'}
                  onClick={() => handleSplitModalItemClicked(item)}
                  compact
                  selected={isSelectedSplitBonALICE(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      {selectedSplitBonALICE && (
        <>
          <MoveUpIn y={-15} duration={0.3} delay={0.3}>
            <SwingIn duration={1} delay={0}>
              <img
                src="/assets/images/actions/split-content-icon.svg"
                alt=""
                className="mx-auto mb-2 max-md:w-10"
              />
            </SwingIn>
          </MoveUpIn>
          <MoveUpIn y={-10} duration={0.5} delay={0.3}>
            <FadeIn duration={0.2} delay={0.3}>
              <Seekbar
                min={0}
                max={100}
                value={splitValue}
                onValueChange={setSplitValue}
              />
              <div className="new-bounded-ALICEs flex flex-col md:flex-row gap-3 w-full select-none">
                <BonALICECard
                  title="New Bonded ALICE"
                  subTitle1="Node Power"
                  subValue1={30}
                  subTitle2="Tier"
                  subValue2="ALICE Starter"
                  selected
                />
                <BonALICECard
                  title="New Bonded ALICE"
                  subTitle1="Node Power"
                  subValue1={30}
                  subTitle2="Tier"
                  subValue2="ALICE Starter"
                  selected
                />
              </div>
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
          disabled={isSplitBonALICEsButtonDisabled}
          className="btn !w-full"
        >
          Split
        </button>
      </FadeIn>
    </>
  );
};

export default RenderSplitBody;
