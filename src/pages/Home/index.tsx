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
    <div className="page md:px-10">
      <div className="mobile-logo w-full flex justify-center mb-20 md:hidden">
        <img
          src="/assets/images/navbar/logo.svg"
          alt={''}
          className="w-[150px] h-auto"
        />
      </div>
      <FadeIn delay={0.1}>
        <p className="moto w-full text-center text-[32px] font-regular leading-10 mb-4 md:text-5xl md:font-bold md:leading-[58px]">
          ALICE TESTNET
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="description text-[19px] md:font-normal text-center md:text-[21px] mb-8 mx-auto max-w-[821px] md:leading-[38px]">
          Empower Your Node with a Bonded ALICE NFT! Secure your spot in one of
          our three distinguished tiers by locking ALICE tokens in your
          bonALICE. The more tokens you lock, the higher the tier and rewards.
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
  );
};

export default Home;
