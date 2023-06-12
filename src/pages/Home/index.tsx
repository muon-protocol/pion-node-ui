import { plans } from '../../data/constants';
import PlanCard from './PlanCard.tsx';
import { MoveRightIn } from '../../animations';

const Home = () => {
  return (
    <div className="page">
      <MoveRightIn delay={0.3}>
        <p className="moto text-white md:w-3/5 text-5xl font-light leading-[58px] mb-4">
          Pion Network: Be a Pioneer, Bridge the Blockchain Islands
        </p>
      </MoveRightIn>
      <MoveRightIn delay={0.4}>
        <p className="description text-white font-light text-[28px] mb-11 md:w-4/6">
          Empower Your Node with a Bonded PION NFT! <br />
          Secure your spot in one of our three distinguished tiers by locking
          PION tokens in your bonPION. The more tokens you lock, the higher the
          tier and rewards.
        </p>
      </MoveRightIn>
      <MoveRightIn delay={0.6}>
        <button className="btn btn--large mb-32">Start Your Node</button>
      </MoveRightIn>
      <div className="plans flex gap-16 justify-between">
        <PlanCard
          plan={plans[0]}
          className="w-1/3 bg-plan-1"
          animationDelay={0.8}
        />
        <PlanCard
          plan={plans[1]}
          className="w-1/3 bg-plan-2"
          animationDelay={1}
        />
        <PlanCard
          plan={plans[2]}
          className="w-1/3 bg-plan-3"
          animationDelay={1.2}
        />
      </div>
    </div>
  );
};

export default Home;
