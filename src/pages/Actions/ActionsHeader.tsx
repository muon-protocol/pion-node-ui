import useActions from '../../contexts/Actions/useActions.ts';

import { ActionType } from '../../types';

import createIcon from '../../assets/images/actions/create.svg';
const ActionsHeader = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-header flex gap-10 w-full">
      <div className="w-[90px]">{renderActionImageAndName(selectedAction)}</div>
      <div className="w-full">
        <p className="text-lg font-light text-white">
          {renderActionDescription(selectedAction)}
        </p>
      </div>
    </div>
  );
};

const renderActionImageAndName = (action: ActionType) => {
  return (
    <div className="w-[90px] flex flex-col justify-center items-center gap-2">
      <div className="action-image ">{renderActionImage(action)}</div>
      <div className="action-name text-primary-10-solid text-2xl font-medium text-center">
        <p>{action}</p>
      </div>
    </div>
  );
};

const renderActionImage = (action: ActionType) => {
  if (action === ActionType.CREATE) {
    return <img src={createIcon} alt="create" width="52" height="52" />;
  }
};

const renderActionDescription = (action: ActionType) => {
  if (action === ActionType.CREATE)
    return 'Begin your journey by crafting your Bonded PION NFT This requires locking PION and PION LP tokens. Remember, the amount of tokens you lock will directly influence your NFT Power, tier, and rewards.';
  if (action === ActionType.UPGRADE)
    return 'Boost your Node Power by adding more PION and PION LP tokens to your Bonded PION NFT. This upgrade could change your tier and enhance your APR.';
  if (action === ActionType.MERGE)
    return 'Choose two bonPIONs from your collection to merge into a single, more powerful NFT for increased earnings.';
  if (action === ActionType.SPLIT)
    return 'Choose a bonPION to split and adjust the slider to distribute the power as desired.';
  if (action === ActionType.TRANSFER)
    return 'Choose a bonPION from your collection, then enter the destination address where you want to send it.';
};

export default ActionsHeader;
