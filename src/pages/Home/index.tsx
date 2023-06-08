import { plans } from '../../data/constants';
import PlanCard from './PlanCard.tsx';
import { MoveRightIn } from '../../animations';

const Home = () => {
  return (
    <div className="page">
      <MoveRightIn delay={0.3}>
        <p className="moto text-white md:w-1/2 text-5xl font-light leading-[58px] mb-4">
          Pion Network: Be a Pioneer, Bridge the Blockchain Islands
        </p>
      </MoveRightIn>
      <MoveRightIn delay={0.4}>
        <p className="description text-white font-light text-[28px] mb-11">
          [ Description about the NFT, tiers and verification ]
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
