import { plans } from '../../data/constants';
import PlanCard from './PlanCard.tsx';
import { FadeIn } from '../../animations';
import { Link, useNavigate } from 'react-router-dom';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useEffect } from 'react';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';

const Home = () => {
  const { bonALICEs } = useBonALICE();
  const navigate = useNavigate();
  const { stakerAddressInfo } = useNodeBonALICE();

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      window.open('/dashboard', '_self');
    } else {
      if (bonALICEs?.length > 0) {
        navigate('/review');
      }
    }
  }, [bonALICEs, navigate, stakerAddressInfo]);

  return (
    <div className="page__bg--home">
      <div className="page md:px-10">
        <div className="mobile-logo w-full flex justify-center mb-20 md:hidden">
          <img
            src="/assets/images/navbar/logo.svg"
            alt={''}
            className="w-[150px] h-auto"
          />
        </div>
        <FadeIn delay={0.1} className="mb-[30px]">
          <p className="moto w-full text-center text-2xl font-semibold leading-10 mb-2 md:text-8xl md:font-extrabold">
            ALICE
          </p>
          <p className="font-tourney text-center text-5xl">Network</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="description text-[19px] md:font-semibold text-center md:text-[20px] mb-8 mx-auto max-w-[421px]">
            Start Your Node with a Bonded ALICE NFT! Lock ALICE tokens in
            bonALICE to access one of Alice’s three node tiers.
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="flex justify-center">
          <Link to="/get-started">
            <button className="btn btn--large mb-12 md:mb-16">
              Get Started Now!
            </button>
          </Link>
        </FadeIn>
        <div className="plans flex flex-col gap-8 md:flex-row md:gap-10 justify-between">
          <PlanCard
            plan={plans[0]}
            className="w-full md:w-1/3 bg-plan-1"
            animationDelay={0.3}
          />
          <PlanCard
            plan={plans[1]}
            className="w-full md:w-1/3 bg-plan-2"
            animationDelay={0.4}
          />
          <PlanCard
            plan={plans[2]}
            className="w-full md:w-1/3 bg-plan-3"
            animationDelay={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
