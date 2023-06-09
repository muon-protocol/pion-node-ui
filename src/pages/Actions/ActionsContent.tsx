import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';

import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal';
import AddressInput from '../../components/Common/AddressInput.tsx';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Seekbar from '../../components/Common/Seekbar.tsx';
import { useState } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';

const ActionsContent = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-content w-full bg-card-bg-70-purple px-11 py-10 rounded-2xl flex flex-col">
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
      <MoveUpIn y={10} duration={0.2} delay={0.1}>
        <AmountInput />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.2}>
        <p className="font-light text-gray10 underline mb-10 cursor-pointer">
          I Want to Boost Bonded PION Power with LP Tokens
        </p>
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.3}>
        <span className="flex justify-between text-gray10 mb-2">
          <p className="font-light">Your bonPION power will be</p>
          <p className="font-medium">5030 bonPION</p>
        </span>
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.4}>
        <span className="flex justify-between text-gray10">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">Pion Supreme (Tier 3)</p>
        </span>
      </MoveUpIn>
      <FadeIn delay={0.2} className="btn btn--secondary mt-auto mx-auto">
        <button>Create Bounded PION</button>
      </FadeIn>
    </>
  );
};

const RenderUpgradeBody = () => {
  return (
    <>
      <MoveUpIn y={10} duration={0.2} delay={0.1}>
        <SelectButtonWithModal title="Select BonPion" />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.2}>
        <AmountInput />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.3}>
        <p className="font-light text-gray10 underline mb-10 cursor-pointer">
          I Want to Boost Bonded PION Power with LP Tokens
        </p>
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.4}>
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
      </MoveUpIn>
      <FadeIn delay={0.2} className="btn btn--secondary mt-auto mx-auto">
        <button>Upgrade</button>
      </FadeIn>
    </>
  );
};

const MergeBody = () => {
  return (
    <>
      <MoveUpIn y={10} duration={0.2} delay={0.1}>
        <SelectButtonWithModal title="Select bonPIONs to Merge" multiple />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.2}>
        <img
          src="/assets/images/actions/merge-content-icon.svg"
          alt=""
          className="mx-auto mb-6 select-none"
        />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.3}>
        <div className="new-bounded-pion-card rounded-2xl p-[18px] bg-primary-card flex flex-col bg-primary-dark">
          <p className="text-gray10 font-semibold mb-6">New Bounded PION</p>
          <span className="text-sm text-gray10 flex mb-2 justify-between">
            <p className="font-light">Node Power</p>
            <p className="font-medium">5030</p>
          </span>
          <span className="text-sm text-gray10 flex justify-between">
            <p className="font-light">Tier</p>
            <p className="font-medium">Pion Enhancer (Tier 2)</p>
          </span>
        </div>
      </MoveUpIn>
      <FadeIn delay={0.2} className="btn btn--secondary mt-auto mx-auto">
        <button>Merge</button>
      </FadeIn>
    </>
  );
};

const SplitBody = () => {
  const [splitValue, setSplitValue] = useState(50);

  return (
    <>
      <MoveUpIn y={10} duration={0.2} delay={0.1}>
        <SelectButtonWithModal title="Select BonPion" />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.2}>
        <img
          src="/assets/images/actions/split-content-icon.svg"
          alt=""
          className="mx-auto mb-2 select-none"
        />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.3}>
        <Seekbar
          min={0}
          max={100}
          value={splitValue}
          onValueChange={setSplitValue}
        />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.4}>
        <div className="new-bounded-pions flex gap-3 w-full select-none">
          <div className="new-bounded-pion-card rounded-2xl p-[18px] bg-primary-card flex-1 flex flex-col bg-primary-dark">
            <p className="text-gray10 font-semibold mb-6">New Bounded PION</p>
            <span className="text-sm text-gray10 flex mb-2 justify-between">
              <p className="font-light">Node Power</p>
              <p className="font-medium">5030</p>
            </span>
            <span className="text-sm text-gray10 flex justify-between">
              <p className="font-light">Tier</p>
              <p className="font-medium">Pion Enhancer (Tier 2)</p>
            </span>
          </div>
          <div className="new-bounded-pion-card rounded-2xl p-[18px] bg-primary-card flex-1 flex flex-col bg-primary-dark">
            <p className="text-gray10 font-semibold mb-6">New Bounded PION</p>
            <span className="text-sm text-gray10 flex mb-2 justify-between">
              <p className="font-light">Node Power</p>
              <p className="font-medium">5030</p>
            </span>
            <span className="text-sm text-gray10 flex justify-between">
              <p className="font-light">Tier</p>
              <p className="font-medium">Pion Enhancer (Tier 2)</p>
            </span>
          </div>
        </div>
      </MoveUpIn>
      <FadeIn delay={0.2} className="btn btn--secondary mt-auto mx-auto">
        <button>Split</button>
      </FadeIn>
    </>
  );
};

const RenderTransferBody = () => {
  return (
    <>
      <MoveUpIn y={10} duration={0.2} delay={0.1}>
        <SelectButtonWithModal title="Select BonPion" />
      </MoveUpIn>
      <MoveUpIn y={10} duration={0.2} delay={0.2}>
        <AddressInput />
      </MoveUpIn>

      <FadeIn delay={0.2} className="btn btn--secondary mt-auto mx-auto">
        <button>Transfer</button>
      </FadeIn>
    </>
  );
};
export default ActionsContent;
