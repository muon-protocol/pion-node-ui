import { steps } from '../../data/constants';
import { FadeIn } from '../../animations';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { StepCard } from './StepCard.tsx';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';

import { useNavigate } from 'react-router-dom';
import strings from '../../constants/strings.ts';
import routes from '../../routes';

const Home = () => {
  // const navigate = useNavigate();
  // const { stakerAddressInfo } = useNodeBonALICE();
  const { bonALICEs } = useBonALICE();

  const navigate = useNavigate();

  const { ALICEBalance } = useALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  return (
    <div className="w-full page__bg">
      <div className="page page--home page--centered flex flex-col">
        <FadeIn className="mr-auto mb-14" delay={0} duration={0.3}>
          <p className="text-2xl font-medium font-tomorrow">Getting Started</p>
        </FadeIn>
        <div className="steps flex flex-col gap-16 md:gap-8 md:flex-row justify-between">
          <StepCard
            step={steps[0]}
            className="w-full md:w-1/3"
            animationDelay={0.1}
          >
            <>
              <p className="font-tomorrow text-[22px] font-medium mb-6">
                Buy ${strings.token}
              </p>

              <span className="descriptions font-tomorrow mb-7 leading-[19px] flex flex-col gap-1">
                <p>
                  Buy ${strings.token} to create your {strings.nft} and start
                  earning rewards!
                </p>
              </span>
              <div className="mb-5 mt-auto">
                {ALICEBalance && (
                  <div className="text-light-text dark:text-alice-primary">
                    Your Balance:{' '}
                    <strong className="text-primary-L3 dark:text-alice-primary">
                      {ALICEBalance.dsp}
                    </strong>{' '}
                    <span className="text-primary-L3 dark:text-alice-primary">
                      {strings.token}
                    </span>
                  </div>
                )}
              </div>
              <button
                className="btn !px-6 mx-auto relative"
                onClick={() => navigate(routes.buyToken.path)}
              >
                Buy ${strings.token}
              </button>
            </>
          </StepCard>
          <StepCard
            step={steps[1]}
            className="w-full md:w-1/3"
            animationDelay={0.2}
          >
            <p className="font-tomorrow text-[22px] font-medium mb-6">
              {bonALICEs.length > 0
                ? 'Manage ' + strings.nft
                : 'Create ' + strings.nft}
            </p>
            <span className="descriptions font-tomorrow mb-auto leading-[19px] flex flex-col gap-1">
              <p>
                {bonALICEs.length > 0
                  ? `You can add more $${strings.token} and USDC to increase your ${strings.nft} amount and node power`
                  : `Create ${strings.nft} using your $${strings.token} to be able to setup your node`}
              </p>
            </span>
            {nodeBonALICE.length > 0 ? (
              <>
                <div className="mb-5">
                  <p className="text-light-text">
                    {strings.nft}#{nodeBonALICE[0].tokenId.toString()} amount:{' '}
                    <strong className="text-primary-L3 dark:text-alice-primary">
                      {nodeBonALICE[0].nodePower}
                    </strong>
                  </p>
                </div>
                <div
                  className="btn !px-6 mx-auto "
                  onClick={() => navigate(routes.increase.path)}
                >
                  Manage {strings.nft}
                </div>
              </>
            ) : bonALICEs.length > 0 ? (
              <>
                <p className="mb-auto"></p>
                <div
                  className="btn !px-6 mx-auto "
                  onClick={() => navigate(routes.increase.path)}
                >
                  Manage {strings.nft}
                </div>
              </>
            ) : (
              <>
                <p className="mb-auto"></p>
                <div
                  className="btn !px-6 mx-auto"
                  onClick={() => navigate(routes.create.path)}
                >
                  Create {strings.nft}
                </div>
              </>
            )}
          </StepCard>
          <StepCard
            step={steps[2]}
            className="w-full md:w-1/3"
            animationDelay={0.3}
          >
            <p className="font-tomorrow text-[22px] font-medium mb-6">
              {nodeBonALICE.length > 0 ? 'Manage Node' : 'Setup Node'}
            </p>
            <span className="descriptions font-tomorrow mb-7 leading-[19px] flex flex-col gap-1">
              <p>
                {nodeBonALICE.length > 0
                  ? `Go to your dashboard to view details about your node and manage its operation`
                  : `Setup your node an enjoy earning rewards!`}
              </p>
            </span>
            <p className="mb-auto"></p>
            {nodeBonALICE.length > 0 ? (
              <div
                className="btn !px-6 mx-auto font-tomorrow"
                onClick={() => window.open('/dashboard/', '_self')}
              >
                Go to Dashboard
              </div>
            ) : (
              <div
                className="btn !px-6 mx-auto"
                onClick={() => navigate(routes.setupNode.path)}
              >
                Setup Node
              </div>
            )}
          </StepCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
