import { plans } from '../../data/constants.ts';
import { ActionsPlansCard } from './ActionsPlansCard.tsx';

export const Plans = () => {
  return (
    <div className="plans min-w-[430px] flex flex-col justify-between flex-grow">
      <ActionsPlansCard
        plan={plans[0]}
        className="w-full bg-white border-plan-1"
        animationDelay={0.1}
        animationDuration={0.3}
        active={false}
        color="text-plan-1"
      />
      <ActionsPlansCard
        plan={plans[1]}
        className="w-full bg-white border-plan-2"
        animationDelay={0.2}
        animationDuration={0.3}
        active={true}
        color="text-plan-2"
      />
      <ActionsPlansCard
        plan={plans[2]}
        className="w-full bg-white border-plan-3"
        animationDelay={0.3}
        animationDuration={0.3}
        active={false}
        color="text-plan-3"
      />
    </div>
  );
};
