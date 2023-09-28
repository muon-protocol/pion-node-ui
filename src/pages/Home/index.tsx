import { steps } from '../../data/constants';
import { FadeIn } from '../../animations';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { StepCard } from './StepCard.tsx';

const Home = () => {
  const navigate = useNavigate();
  const { stakerAddressInfo } = useNodeBonALICE();

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      window.open('/dashboard', '_self');
    }
  }, [navigate, stakerAddressInfo]);

  return (
    <div className="page__bg--home">
      <div className="page page--centered flex flex-col md:px-10">
        <div className="mobile-logo w-full flex justify-center mb-20 md:hidden">
          <img
            src="/assets/images/navbar/logo.svg"
            alt={''}
            className="w-[150px] h-auto"
          />
        </div>
        <FadeIn delay={0.1}>
          <p className="moto w-full text-center mb-3 text-5xl font-semibold leading-10 md:mb-0 md:text-6xl md:font-bold">
            ALICE NETWORK
          </p>
        </FadeIn>
        <FadeIn delay={0.15} className="mb-20">
          <p className="moto font-tourney text-center text-xl">
            [Boundless Blocks, Infinite Interactions]
          </p>
        </FadeIn>
        <div className="steps flex flex-col gap-8 md:flex-row justify-between">
          <StepCard
            step={steps[0]}
            className="w-full md:w-1/3"
            animationDelay={0.1}
          />
          <StepCard
            step={steps[1]}
            className="w-full md:w-1/3"
            animationDelay={0.2}
          />
          <StepCard
            step={steps[2]}
            className="w-full md:w-1/3"
            animationDelay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
