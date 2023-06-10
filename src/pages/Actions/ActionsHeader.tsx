import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';
import { FadeIn, Scale } from '../../animations';
import { AnimatePresence } from 'framer-motion';

const ActionsHeader = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-header flex gap-10 w-full">
      <div className="w-[90px]">{renderActionImageAndName(selectedAction)}</div>
      <div className="w-full">
        <p className="text-lg font-light text-white min-h-[112px]">
          {renderActionDescription(selectedAction)}
        </p>
      </div>
    </div>
  );
};

const renderActionImageAndName = (action: ActionType) => {
  return (
    <div className="w-[90px] flex flex-col justify-center items-center gap-2">
      <div className="action-image relative min-h-[54px] flex justify-center w-full">
        {renderActionImage(action)}
      </div>
      <div className="action-name text-primary-10-solid text-2xl font-medium flex justify-center w-full text-center">
        {renderActionName(action)}
      </div>
    </div>
  );
};

const renderActionImage = (action: ActionType) => {
  return (
    <>
      <AnimatePresence>
        {action === ActionType.CREATE ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <img
              src="/assets/images/actions/create-colored-icon.svg"
              alt="create"
              width="52"
              height="52"
            />
          </Scale>
        ) : action === ActionType.UPGRADE ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <img
              src="/assets/images/actions/upgrade-colored-icon.svg"
              alt="upgrade"
              width="52"
              height="52"
            />
          </Scale>
        ) : action === ActionType.MERGE ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <img
              src="/assets/images/actions/merge-colored-icon.svg"
              alt="merge"
              width="52"
              height="52"
            />
          </Scale>
        ) : action === ActionType.SPLIT ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <img
              src="/assets/images/actions/split-colored-icon.svg"
              alt="split"
              width="52"
              height="52"
            />
          </Scale>
        ) : action === ActionType.TRANSFER ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <img
              src="/assets/images/actions/transfer-colored-icon.svg"
              alt="transfer"
              width="52"
              height="52"
            />
          </Scale>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
};

const renderActionDescription = (action: ActionType) => {
  return (
    <>
      {action === ActionType.CREATE ? (
        <FadeIn key={action} duration={0.1} delay={0.1}>
          <p>
            Begin your journey by crafting your Bonded PION NFT This requires
            locking PION and PION LP tokens. Remember, the amount of tokens you
            lock will directly influence your NFT Power, tier, and rewards.
          </p>
        </FadeIn>
      ) : action === ActionType.UPGRADE ? (
        <FadeIn key={action} duration={0.1} delay={0.1}>
          <p>
            Boost your Node Power by adding more PION and PION LP tokens to your
            Bonded PION NFT. This upgrade could change your tier and enhance
            your APR.
          </p>
        </FadeIn>
      ) : action === ActionType.MERGE ? (
        <FadeIn key={action} duration={0.1} delay={0.1}>
          <p>
            Choose two bonPIONs from your collection to merge into a single,
            more powerful NFT for increased earnings.
          </p>
        </FadeIn>
      ) : action === ActionType.SPLIT ? (
        <FadeIn key={action} duration={0.1} delay={0.1}>
          <p>
            Choose a bonPION to split and adjust the slider to distribute the
            power as desired.
          </p>
        </FadeIn>
      ) : action === ActionType.TRANSFER ? (
        <FadeIn key={action} duration={0.1} delay={0.1}>
          <p>
            Choose a bonPION from your collection, then enter the destination
            address where you want to send it.
          </p>
        </FadeIn>
      ) : (
        <></>
      )}
    </>
  );
};

const renderActionName = (action: ActionType) => {
  return (
    <>
      <AnimatePresence>
        {action === ActionType.CREATE ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <p>Create</p>
          </Scale>
        ) : action === ActionType.UPGRADE ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <p>Upgrade</p>
          </Scale>
        ) : action === ActionType.MERGE ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <p>Merge</p>
          </Scale>
        ) : action === ActionType.SPLIT ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <p>Split</p>
          </Scale>
        ) : action === ActionType.TRANSFER ? (
          <Scale className="absolute" key={action} duration={0.1} delay={0.1}>
            <p>Transfer</p>
          </Scale>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActionsHeader;
