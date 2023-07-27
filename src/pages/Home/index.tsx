import { plans } from '../../data/constants';
import PlanCard from './PlanCard.tsx';
import { MoveRightIn } from '../../animations';
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
      <MoveRightIn delay={0.1}>
        <p className="moto w-full text-center text-[32px] font-regular leading-10 mb-6 md:text-left md:w-3/5 md:text-5xl md:font-light md:leading-[58px] md:mb-4">
          ALICE Network: <br className="md:hidden" /> Be a pioneer, Bridge the
          Blockchain Islands
        </p>
      </MoveRightIn>
      <MoveRightIn delay={0.2}>
        <p className="description font-light text-[19px] md:text-[28px] mb-11 md:w-4/6">
          Empower Your Node with a Bonded ALICE NFT!{' '}
          <br className="hidden md:flex" />
          Secure your spot in one of our three distinguished tiers by locking
          ALICE tokens in your bonALICE. The more tokens you lock, the higher
          the tier and rewards.
        </p>
      </MoveRightIn>
      <MoveRightIn delay={0.3} className="flex justify-center md:justify-start">
        <Link to="/get-started">
          <button className="btn btn--large mb-12 md:mb-32">
            Get Started Now
          </button>
        </Link>
      </MoveRightIn>
      <div className="plans flex flex-col gap-8 md:flex-row md:gap-10 justify-between">
        <PlanCard
          plan={plans[0]}
          className="w-full md:w-1/3 bg-plan-1"
          animationDelay={0.8}
        />
        <PlanCard
          plan={plans[1]}
          className="w-full md:w-1/3 bg-plan-2"
          animationDelay={1}
        />
        <PlanCard
          plan={plans[2]}
          className="w-full md:w-1/3 bg-plan-3"
          animationDelay={1.2}
        />
      </div>
    </div>
  );
};

export default Home;
