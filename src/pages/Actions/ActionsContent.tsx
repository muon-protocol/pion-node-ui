import AmountInput from '../../components/Common/AmountInput.tsx';
import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';

const ActionsContent = () => {
  const { selectedAction } = useActions();
  return (
    <div className="actions-content w-full bg-card-bg-70-purple px-11 py-10 rounded-2xl flex flex-col">
      {selectedAction === ActionType.CREATE
        ? renderCreateBody()
        : selectedAction === ActionType.UPGRADE
        ? renderUpgradeBody()
        : ''}
    </div>
  );
};

const renderCreateBody = () => {
  return (
    <>
      <AmountInput />
      <p className="font-light text-gray10 underline mb-10 cursor-pointer">
        I Want to Boost Bonded PION Power with LP Tokens
      </p>
      <span className="flex justify-between text-gray10 mb-2">
        <p className="font-light">Your bonPION power will be</p>
        <p className="font-medium">5030 bonPION</p>
      </span>
      <span className="flex justify-between text-gray10">
        <p className="font-light">Your tier will be</p>
        <p className="font-medium">Pion Supreme (Tier 3)</p>
      </span>
      <button className="btn btn--secondary mt-auto mx-auto">
        Create Bounded PION
      </button>
    </>
  );
};

const renderUpgradeBody = () => {
  return (
    <>
      <SelectButtonWithModal />
      <AmountInput />
      <p className="font-light text-gray10 underline mb-10 cursor-pointer">
        I Want to Boost Bonded PION Power with LP Tokens
      </p>
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
      <button className="btn btn--secondary mt-auto mx-auto">Upgrade</button>
    </>
  );
};

export default ActionsContent;
