import { steps } from '../../data/constants';
import { FadeIn } from '../../animations';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { StepCard } from './StepCard.tsx';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';

const Home = () => {
  const navigate = useNavigate();
  const { stakerAddressInfo } = useNodeBonALICE();

  useEffect(() => {
    // if (stakerAddressInfo?.active) {
    //   window.open('/dashboard', '_self');
    // }
  }, [navigate, stakerAddressInfo]);

  const { ALICEBalance } = useALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  return (
    <div className="page__bg--home">
      <div className="page page--home page--centered flex flex-col md:px-10">
        <div className="mobile-logo w-full flex justify-center mb-20 md:hidden">
          <img
            src="/assets/images/navbar/logo.svg"
            alt={''}
            className="w-[150px] h-auto"
          />
        </div>
        <FadeIn delay={0.1}>
          <p className="moto w-full text-center mb-3 text-5xl font-semibold leading-10 md:mb-2 md:text-[65px] md:font-bold">
            PION NETWORK
          </p>
        </FadeIn>
        <FadeIn delay={0.15} className="mb-20">
          <p className="moto font-tourney text-center text-xl">
            request the information you need, in real-time
          </p>
        </FadeIn>
        <div className="steps flex flex-col gap-12 md:gap-8 md:flex-row justify-between">
          <StepCard
            step={steps[0]}
            className="w-full md:w-1/3"
            animationDelay={0.1}
          >
            <>
              <p className="font-tomorrow text-2xl font-medium mb-6">
                Buy $PION
              </p>

              <span className="descriptions font-tomorrow mb-7 leading-[19px] flex flex-col gap-1">
                <p>
                  Buy $PION to create your bonPION and start earning rewards!
                </p>
              </span>
              <div className="mb-5 mt-auto">
                {ALICEBalance && (
                  <div className="text-light-text">
                    Your Balance:{' '}
                    <strong className="text-primary-L3">
                      {ALICEBalance.dsp}
                    </strong>{' '}
                    <span className="text-primary-L3">PION</span>
                  </div>
                )}
              </div>
              <div
                className="btn !px-6 mx-auto "
                onClick={() =>
                  window.open(
                    'https://pancakeswap.finance/swap?chain=bscTestnet&outputCurrency=0xF43CD517385237fe7A48927073151D12f4eADC53&inputCurrency=tBNB',
                    '_blank',
                  )
                }
              >
                Buy $PION
              </div>
            </>
          </StepCard>
          <StepCard
            step={steps[1]}
            className="w-full md:w-1/3"
            animationDelay={0.2}
          >
            <p className="font-tomorrow text-2xl font-medium mb-6">
              {nodeBonALICE.length > 0 ? 'Manage bonPION' : 'Create bonPION'}
            </p>
            <span className="descriptions font-tomorrow mb-7 leading-[19px] flex flex-col gap-1">
              <p>
                {nodeBonALICE.length > 0
                  ? 'You can add more $PION and USDC to increase your bonPION amount and node power'
                  : 'Create bonPION using your $PION to be able to setup your node'}
              </p>
            </span>
            {nodeBonALICE.length > 0 ? (
              <>
                <div className="mb-5">
                  <p className="text-light-text">
                    bonPION#{nodeBonALICE[0].tokenId.toString()} amount:{' '}
                    <strong className="text-primary-L3">
                      {nodeBonALICE[0].nodePower}
                    </strong>
                  </p>
                </div>
                <div
                  className="btn !px-6 mx-auto "
                  onClick={() => window.open('/bonPION/increase', '_self')}
                >
                  Manage BonPION
                </div>
              </>
            ) : (
              <>
                <p className="mb-auto"></p>
                <div
                  className="btn !px-6 mx-auto "
                  onClick={() => window.open('/bonPION/create', '_self')}
                >
                  Create bonPION
                </div>
              </>
            )}
          </StepCard>
          <StepCard
            step={steps[2]}
            className="w-full md:w-1/3"
            animationDelay={0.3}
          >
            <p className="font-tomorrow text-2xl font-medium mb-6">
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
                onClick={() => window.open('/dashboard', '_self')}
              >
                Go to Dashboard
              </div>
            ) : (
              <div
                className="btn !px-6 mx-auto"
                onClick={() => window.open('/setup-node', '_self')}
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
