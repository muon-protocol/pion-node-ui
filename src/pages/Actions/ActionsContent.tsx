import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';

import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal';
import AddressInput from '../../components/Common/AddressInput.tsx';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Seekbar from '../../components/Common/Seekbar.tsx';
import { FadeIn } from '../../animations';
import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import BonPIONCard from '../../components/Common/BonPIONCard.tsx';
import { mergeModalItems, upgradeModalItems } from '../../data';
import useMergeAction from '../../contexts/MergeAction/useMergeAction.ts';
import useSplitAction from '../../contexts/SplitAction/useSplitAction.ts';

const ActionsContent = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-content w-full md:bg-card-bg-70-purple md:px-11 py-10 rounded-2xl flex flex-col">
      {selectedAction === ActionType.CREATE ? (
        <RenderCreateBody />
      ) : selectedAction === ActionType.UPGRADE ? (
        <RenderUpgradeBody />
      ) : selectedAction === ActionType.MERGE ? (
        <MergeBody />
      ) : selectedAction === ActionType.SPLIT ? (
        <SplitBody />
      ) : selectedAction === ActionType.TRANSFER ? (
        <RenderTransferBody />
      ) : (
        <></>
      )}
    </div>
  );
};

const RenderCreateBody = () => {
  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <p className="font-light text-gray10 underline mb-10 cursor-pointer">
          I Want to Boost Bonded PION Power with LP Tokens
        </p>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between text-gray10 mb-2">
          <p className="font-light">Your bonPION power will be</p>
          <p className="font-medium">5030 bonPION</p>
        </span>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between text-gray10">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">Pion Supreme (Tier 3)</p>
        </span>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="btn btn--secondary mt-auto mx-auto"
      >
        <button>Create Bounded PION</button>
      </FadeIn>
    </>
  );
};

const RenderUpgradeBody = () => {
  const {
    isUpgradeModalOpen,
    openUpgradeModal,
    closeUpgradeModal,
    handleUpgradeModalItemClicked,
    isSelectedUpgradeBonPION,
  } = useUpgradeAction();

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <SelectButtonWithModal
          title="Select BonPion"
          onClick={() => openUpgradeModal()}
          isModalOpen={isUpgradeModalOpen}
          closeModalHandler={() => closeUpgradeModal()}
          modalTitle="Select BonPION"
        >
          <div className="flex flex-col gap-3">
            {upgradeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleUpgradeModalItemClicked(item)}
                  compact
                  selected={isSelectedUpgradeBonPION(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <p className="font-light text-gray10 underline mb-10 cursor-pointer">
          I Want to Boost Bonded PION Power with LP Tokens
        </p>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between text-gray10 mb-2">
          <p className="font-light">Your current bonPION power</p>
          <p className="font-medium">2000</p>
        </span>
        <span className="flex justify-between text-gray10 mb-2">
          <p className="font-light">Your bonPION power will be</p>
          <p className="font-medium">5030 bonPION</p>
        </span>
        <span className="flex justify-between text-gray10">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">Pion Supreme (Tier 3)</p>
        </span>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="btn btn--secondary mt-auto mx-auto"
      >
        <button>Upgrade</button>
      </FadeIn>
    </>
  );
};

const MergeBody = () => {
  const {
    isMergeModalOpen,
    openMergeModal,
    closeMergeModal,
    handleMergeModalItemClicked,
    isInSelectedMergeBonPIONs,
  } = useMergeAction();

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <SelectButtonWithModal
          title="Select BonPIONs"
          onClick={() => openMergeModal()}
          isModalOpen={isMergeModalOpen}
          closeModalHandler={() => closeMergeModal()}
          modalTitle="Select BonPIONs to Merge"
          multiple
        >
          <div className="flex flex-col gap-3">
            {mergeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleMergeModalItemClicked(item)}
                  compact
                  selected={isInSelectedMergeBonPIONs(item)}
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
          className="mx-auto mb-6 select-none"
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <BonPIONCard
          title="New Bonded PION"
          subTitle1="Node Power"
          subValue1="530"
          subTitle2="Tier"
          subValue2="Pion Supreme (Tier 3)"
          selected
        />
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="btn btn--secondary mt-auto mx-auto"
      >
        <button>Merge</button>
      </FadeIn>
    </>
  );
};

const SplitBody = () => {
  const {
    splitValue,
    setSplitValue,
    isSplitModalOpen,
    openSplitModal,
    closeSplitModal,
    handleSplitModalItemClicked,
    isSelectedSplitBonPION,
  } = useSplitAction();

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <SelectButtonWithModal
          title="Select BonPion"
          onClick={() => openSplitModal()}
          isModalOpen={isSplitModalOpen}
          closeModalHandler={() => closeSplitModal()}
          modalTitle="Select BonPION"
        >
          <div className="flex flex-col gap-3">
            {upgradeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleSplitModalItemClicked(item)}
                  compact
                  selected={isSelectedSplitBonPION(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <img
          src="/assets/images/actions/split-content-icon.svg"
          alt=""
          className="mx-auto mb-2 select-none"
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <Seekbar
          min={0}
          max={100}
          value={splitValue}
          onValueChange={setSplitValue}
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <div className="new-bounded-pions flex gap-3 w-full select-none">
          <BonPIONCard
            title="New Bonded PION"
            subTitle1="Node Power"
            subValue1="530"
            subTitle2="Tier"
            subValue2="Pion Supreme (Tier 3)"
            selected
          />
          <BonPIONCard
            title="New Bonded PION"
            subTitle1="Node Power"
            subValue1="530"
            subTitle2="Tier"
            subValue2="Pion Supreme (Tier 3)"
            selected
          />
        </div>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="btn btn--secondary mt-auto mx-auto"
      >
        <button>Split</button>
      </FadeIn>
    </>
  );
};

const RenderTransferBody = () => {
  const {
    isSplitModalOpen,
    openSplitModal,
    closeSplitModal,
    handleSplitModalItemClicked,
    isSelectedSplitBonPION,
  } = useSplitAction();

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <SelectButtonWithModal
          title="Select BonPion"
          onClick={() => openSplitModal()}
          isModalOpen={isSplitModalOpen}
          closeModalHandler={() => closeSplitModal()}
          modalTitle="Select BonPION"
        >
          <div className="flex flex-col gap-3">
            {upgradeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleSplitModalItemClicked(item)}
                  compact
                  selected={isSelectedSplitBonPION(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AddressInput />
      </FadeIn>

      <FadeIn
        duration={0.1}
        delay={0.1}
        className="btn btn--secondary mt-auto mx-auto"
      >
        <button>Transfer</button>
      </FadeIn>
    </>
  );
};
export default ActionsContent;
