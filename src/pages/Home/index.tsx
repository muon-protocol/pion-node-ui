import { plans } from '../../data/constants';
import PlanCard from './PlanCard.tsx';
import { FadeIn } from '../../animations';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page px-10">
      <div className="mobile-logo w-full flex justify-center mb-9 md:hidden">
        <img
          src="/assets/images/navbar/logo.svg"
          alt={''}
          className="w-[150px] h-auto"
        />
      </div>
      <FadeIn delay={0.1}>
        <p className="moto w-full text-center text-[32px] font-regular leading-10 mb-6 md:text-5xl md:font-bold md:leading-[58px]">
          ALICE TESTNET
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="description font-light text-[19px] md:font-normal text-center md:text-[27px] mb-12 mx-auto max-w-[621px] leading-[42px]">
          Empower Your Node with a Bonded ALICE NFT! Secure your spot in one of
          our three distinguished tiers by locking ALICE tokens in your
          bonALICE. The more tokens you lock, the higher the tier and rewards.
        </p>
      </FadeIn>
      <FadeIn delay={0.2} className="flex justify-center">
        <Link to="/get-started">
          <button className="btn btn--large mb-12 md:mb-24">
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
