import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';

import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal';
import AddressInput from '../../components/Common/AddressInput.tsx';
import Seekbar from '../../components/Common/Seekbar.tsx';
import { FadeIn } from '../../animations';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import useMergeAction from '../../contexts/MergeAction/useMergeAction.ts';
import useSplitAction from '../../contexts/SplitAction/useSplitAction.ts';
import { useMemo } from 'react';
import useTransferAction from '../../contexts/TransferAction/useTransferAction.ts';
import { RenderCreateBody } from './CreateAction.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { RenderUpgradeBody } from './UpgradeAction.tsx';

const ActionsContent = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-content w-full md:bg-white md:px-11 py-10 rounded-2xl flex flex-col">
      {selectedAction === ActionType.CREATE ? (
        <RenderCreateBody />
      ) : selectedAction === ActionType.UPGRADE ? (
        <RenderUpgradeBody />
      ) : selectedAction === ActionType.MERGE ? (
        <RenderMergeBody />
      ) : selectedAction === ActionType.SPLIT ? (
        <RenderSplitBody />
      ) : selectedAction === ActionType.TRANSFER ? (
        <RenderTransferBody />
      ) : (
        <></>
      )}
    </div>
  );
};

const RenderMergeBody = () => {
  const {
    isMergeModalOpen,
    openMergeModal,
    closeMergeModal,
    handleMergeModalItemClicked,
    selectedMergeBonALICEs,
    isInSelectedMergeBonALICEs,
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
                  subValue1={'500'}
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
      <FadeIn duration={0.1} delay={0.1}>
        <img
          src="/assets/images/actions/merge-content-icon.svg"
          alt=""
          className="mx-auto mb-6 max-md:w-10"
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <BonALICECard
          title="New Bonded ALICE"
          subTitle1="Node Power"
          subValue1="530"
          subTitle2="Tier"
          subValue2="ALICE Supreme (Tier 3)"
          selected
        />
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          disabled={isMergeBonALICEsButtonDisabled}
          className="btn !w-full"
        >
          Merge
        </button>
      </FadeIn>
    </>
  );
};

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
                  subValue1={'500'}
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
        <FadeIn duration={0.1} delay={0.1}>
          <img
            src="/assets/images/actions/split-content-icon.svg"
            alt=""
            className="mx-auto mb-2 max-md:w-10"
          />
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
              subValue1="530"
              subTitle2="Tier"
              subValue2="ALICE Supreme (Tier 3)"
              selected
            />
            <BonALICECard
              title="New Bonded ALICE"
              subTitle1="Node Power"
              subValue1="530"
              subTitle2="Tier"
              subValue2="ALICE Supreme (Tier 3)"
              selected
            />
          </div>
        </FadeIn>
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

const RenderTransferBody = () => {
  const {
    isTransferModalOpen,
    openTransferModal,
    closeTransferModal,
    handleTransferModalItemClicked,
    selectedTransferBonALICE,
    handleTransferAddressChange,
    transferAddress,
    isSelectedTransferBonALICE,
  } = useTransferAction();
  const { bonALICEs } = useBonALICE();

  const isTransferBonALICEButtonDisabled = useMemo(() => {
    return !selectedTransferBonALICE || !transferAddress;
  }, [transferAddress, selectedTransferBonALICE]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonALICE"
          onClick={() => openTransferModal()}
          isModalOpen={isTransferModalOpen}
          closeModalHandler={() => closeTransferModal()}
          modalTitle="Select BonALICE"
          removeItem={() => {}}
          selectedItems={
            selectedTransferBonALICE ? [selectedTransferBonALICE] : []
          }
        >
          <div className="flex flex-col gap-3">
            {bonALICEs.map((item) => {
              return (
                <BonALICECard
                  className="cursor-pointer"
                  title={'BonALICE #' + item.tokenId}
                  subTitle1="Node Power"
                  subValue1={'500'}
                  subTitle2="Tier"
                  subValue2={'ALICE Starter (Tier 1)'}
                  onClick={() => handleTransferModalItemClicked(item)}
                  compact
                  selected={isSelectedTransferBonALICE(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AddressInput
          value={transferAddress}
          onValueChanged={handleTransferAddressChange}
        />
      </FadeIn>

      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          disabled={isTransferBonALICEButtonDisabled}
          className="btn !w-full"
        >
          Transfer
        </button>
      </FadeIn>
    </>
  );
};
export default ActionsContent;
