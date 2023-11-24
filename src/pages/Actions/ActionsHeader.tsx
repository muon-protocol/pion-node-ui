import { FadeIn, Scale } from '../../animations';
import { AnimatePresence } from 'framer-motion';
import strings from '../../constants/strings.ts';
import routes from '../../routes';
import { useBooster } from '../../hooks/booster/useBooster.ts';

const ActionsHeader = () => {
  return (
    <div className="actions-header flex flex-col md:flex-row items-center w-full gap-6">
      <div className="w-[85px] flex items-center h-full">
        <ActionImageAndName />
      </div>
      <div className="w-full">
        <div className="text-center md:text-left md:text-lg font-light text-white md:leading-[23px] md:min-h-[70px] max-md:min-h-[96px] flex items-center">
          <ActionDescription />
        </div>
      </div>
    </div>
  );
};

const ActionImageAndName = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-1 -translate-y-3">
      <div className="action-image relative min-h-[32px] md:min-h-[40px] flex justify-center w-full">
        <ActionImage />
      </div>
      <div className="action-name text-primary-10-solid text-lg font-medium flex justify-center w-full text-center">
        <ActionName />
      </div>
    </div>
  );
};

const ActionImage = () => {
  return (
    <AnimatePresence>
      {location.pathname === routes.view.path ? (
        <Scale
          className="absolute"
          key={routes.view.path}
          duration={0.1}
          delay={0.1}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={strings.actions.view.icon}
            alt="view"
          />
        </Scale>
      ) : location.pathname === routes.create.path ? (
        <Scale
          className="absolute"
          key={routes.create.path}
          duration={0.1}
          delay={0.1}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={strings.actions.create.icon}
            alt="create"
          />
        </Scale>
      ) : location.pathname === routes.increase.path ? (
        <Scale
          className="absolute"
          key={routes.increase.path}
          duration={0.1}
          delay={0.1}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={strings.actions.increase.icon}
            alt="boost"
          />
        </Scale>
      ) : location.pathname === routes.merge.path ? (
        <Scale
          className="absolute"
          key={routes.merge.path}
          duration={0.1}
          delay={0.1}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={strings.actions.merge.icon}
            alt="merge"
          />
        </Scale>
      ) : location.pathname === routes.split.path ? (
        <Scale
          className="absolute"
          key={routes.split.path}
          duration={0.1}
          delay={0.1}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={strings.actions.split.icon}
            alt="split"
          />
        </Scale>
      ) : location.pathname === routes.transfer.path ? (
        <Scale
          className="absolute"
          key={routes.transfer.path}
          duration={0.1}
          delay={0.1}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={strings.actions.transfer.icon}
            alt="transfer"
          />
        </Scale>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

const ActionDescription = () => {
  const { boostCoefficient } = useBooster();

  return (
    <>
      {location.pathname === routes.view.path ? (
        <FadeIn
          key={location.pathname}
          duration={0.1}
          delay={0.1}
          className="w-full"
        >
          <p className="max-md:text-center max-md:w-full">
            Here are all your {strings.nft} NFTs.
          </p>
        </FadeIn>
      ) : location.pathname === routes.create.path ? (
        <FadeIn
          key={location.pathname}
          duration={0.1}
          delay={0.1}
          className="w-full"
        >
          <p className="max-md:text-center max-md:w-full">
            Create {strings.nft} using {strings.token} tokens. You need{' '}
            {strings.nft} to setup a node, join {strings.token} Network and earn
            reward.<br/><span className={'italic'}>(current boosting rate: <span className={'text-primary-L1 font-bold not-italic'}>{boostCoefficient?.dsp}x</span>)</span>
          </p>
        </FadeIn>
      ) : location.pathname === routes.increase.path ? (
        <FadeIn
          key={location.pathname}
          duration={0.1}
          delay={0.1}
          className="w-full"
        >
          <p className="max-md:text-center max-md:w-full">
            Select your {strings.nft} and boost its power using {strings.token}{' '}
            token <span className={'italic'}>(current boosting rate: <span className={'text-primary-L1 font-bold not-italic'}>{boostCoefficient?.dsp}x</span>)</span>
          </p>
        </FadeIn>
      ) : location.pathname === routes.merge.path ? (
        <FadeIn
          key={location.pathname}
          duration={0.1}
          delay={0.1}
          className="w-full"
        >
          <p className="max-md:text-center max-md:w-full">
            This page enables you to select some {strings.nft} NFTs and merge
            them to one NFT.
          </p>
        </FadeIn>
      ) : location.pathname === routes.split.path ? (
        <FadeIn
          key={location.pathname}
          duration={0.1}
          delay={0.1}
          className="w-full"
        >
          <p className="max-md:text-center max-md:w-full">
            Choose a {strings.nft} to split and adjust the slider to distribute
            the power as desired.
          </p>
        </FadeIn>
      ) : location.pathname === routes.transfer.path ? (
        <FadeIn
          key={location.pathname}
          duration={0.1}
          delay={0.1}
          className="w-full"
        >
          <p className="max-md:text-center max-md:w-full">
            Choose a {strings.nft} from your collection, then enter the
            destination address where you want to send it.
          </p>
        </FadeIn>
      ) : (
        <></>
      )}
    </>
  );
};

const ActionName = () => {
  return (
    <>
      <AnimatePresence>
        {location.pathname === routes.view.path ? (
          <Scale
            className="absolute"
            key={location.pathname}
            duration={0.1}
            delay={0.1}
          >
            <p>View</p>
          </Scale>
        ) : location.pathname === routes.create.path ? (
          <Scale
            className="absolute"
            key={location.pathname}
            duration={0.1}
            delay={0.1}
          >
            <p>Create</p>
          </Scale>
        ) : location.pathname === routes.increase.path ? (
          <Scale
            className="absolute"
            key={location.pathname}
            duration={0.1}
            delay={0.1}
          >
            <p>Boost</p>
          </Scale>
        ) : location.pathname === routes.merge.path ? (
          <Scale
            className="absolute"
            key={location.pathname}
            duration={0.1}
            delay={0.1}
          >
            <p>Merge</p>
          </Scale>
        ) : location.pathname === routes.split.path ? (
          <Scale
            className="absolute"
            key={location.pathname}
            duration={0.1}
            delay={0.1}
          >
            <p>Split</p>
          </Scale>
        ) : location.pathname === routes.transfer.path ? (
          <Scale
            className="absolute"
            key={location.pathname}
            duration={0.1}
            delay={0.1}
          >
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
