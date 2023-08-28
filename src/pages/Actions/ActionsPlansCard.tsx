import { Plan } from '../../types';
import { Scale } from '../../animations';

export const ActionsPlansCard = ({
  plan,
  className = '',
  animationDelay,
  animationDuration,
  active,
  color,
}: {
  plan: Plan;
  className?: string;
  animationDelay?: number;
  animationDuration?: number;
  active: boolean;
  color?: string;
}) => {
  return (
    <Scale delay={animationDelay} duration={animationDuration}>
      <div
        className={`actions-plans-card rounded-2xl p-8 pt-5 flex flex-col ${
          active ? '!border-2' : 'border-0'
        } ${className}`}
      >
        <div className="mb-5 flex justify-between w-full">
          <p className={`text-[28px] font-semibold ${color}`}>{plan.title}</p>
          {active && <p className={color}>Your tier</p>}
        </div>
        <div className=" flex justify-between w-full items-center">
          <p className="text-lg">Minimum Required ALICE</p>
          <p className="font-semibold text-xl">{plan.requiredNodePower}</p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="text-lg">Verification Required</p>
          <p
            className="underline cursor-pointer font-semibold text-xl"
            onClick={() => window.open(plan.verificationLink, '_blank')}
          >
            {plan.verificationMethods}
          </p>
        </div>
      </div>
    </Scale>
  );
};
