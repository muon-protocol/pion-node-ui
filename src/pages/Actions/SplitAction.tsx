import useSplitAction from '../../contexts/SplitAction/useSplitAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
// import { useMemo } from 'react';
import { FadeIn, MoveUpIn, SwingIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import Seekbar from '../../components/Common/Seekbar.tsx';
// import { getCurrentChainId } from '../../constants/chains.ts';
// import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import BonALICEModalBody from '../../components/Common/BonALICEModalBody.tsx';
import { getTier } from '../../utils';
import strings from '../../constants/strings.ts';

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
    // handleSplit,
    // isMetamaskLoading,
    // isTransactionLoading,
  } = useSplitAction();
  const { bonALICEs } = useBonALICE();
  // const { chainId, handleSwitchNetwork } = useUserProfile();

  // const isSplitBonALICEsButtonDisabled = useMemo(() => {
  //   return !selectedSplitBonALICE;
  // }, [selectedSplitBonALICE]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title={`Select ${strings.nft}`}
          onClick={() => openSplitModal()}
          isModalOpen={isSplitModalOpen}
          closeModalHandler={() => closeSplitModal()}
          modalTitle={`Select ${strings.nft}`}
          selectedItems={selectedSplitBonALICE ? [selectedSplitBonALICE] : []}
          removeItem={() => {}}
        >
          <BonALICEModalBody
            bonALICEs={bonALICEs}
            handleUpgradeModalItemClicked={handleSplitModalItemClicked}
            isSelectedUpgradeBonALICE={isSelectedSplitBonALICE}
          />
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
                  title={`New Bonded ${strings.token}`}
                  subTitle1="Node Power"
                  subValue1={Math.round(
                    selectedSplitBonALICE.nodePower * (splitValue / 100),
                  )}
                  subTitle2="Tier"
                  subValue2={getTier(
                    Math.round(
                      selectedSplitBonALICE.nodePower * (splitValue / 100),
                    ),
                  )}
                  selected
                />
                <BonALICECard
                  title={`New Bonded ${strings.token}`}
                  subTitle1="Node Power"
                  subValue1={Math.round(
                    selectedSplitBonALICE.nodePower * (1 - splitValue / 100),
                  )}
                  subTitle2="Tier"
                  subValue2={getTier(
                    Math.round(
                      selectedSplitBonALICE.nodePower * (1 - splitValue / 100),
                    ),
                  )}
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
        className="mt-auto max-md:mt-10 max-md:w-[80vw] md:mx-auto !w-full"
      >
        <button
          disabled
          className="btn btn--white dark:!bg-alice-primary dark:text-white !w-full"
        >
          Currently Disabled
        </button>
        {/*{chainId !== getCurrentChainId() ? (*/}
        {/*  <button*/}
        {/*    onClick={() => handleSwitchNetwork(getCurrentChainId())}*/}
        {/*    className="btn btn--white dark:!bg-alice-primary dark:text-white !w-full"*/}
        {/*  >*/}
        {/*    Switch Network*/}
        {/*  </button>*/}
        {/*) : isMetamaskLoading || isTransactionLoading ? (*/}
        {/*  <button className="btn btn--white dark:!bg-alice-primary dark:text-white !w-full" disabled>*/}
        {/*    {isMetamaskLoading*/}
        {/*      ? 'Waiting for Metamask...'*/}
        {/*      : 'Waiting for Tx...'}*/}
        {/*  </button>*/}
        {/*) : (*/}
        {/*  <button*/}
        {/*    onClick={() => {*/}
        {/*      !isSplitBonALICEsButtonDisabled && handleSplit();*/}
        {/*    }}*/}
        {/*    disabled={isSplitBonALICEsButtonDisabled}*/}
        {/*    className="btn btn--white dark:!bg-alice-primary dark:text-white !w-full"*/}
        {/*  >*/}
        {/*    Split Bonded ALICE*/}
        {/*  </button>*/}
        {/*)}*/}
      </FadeIn>
    </>
  );
};

export default RenderSplitBody;
