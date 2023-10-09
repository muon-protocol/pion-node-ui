import { Plan } from '../../types';
import { FadeIn } from '../../animations';

export const ActionsPlansCard = ({
  plan,
  className = '',
  animationDelay,
  animationDuration,
  active,
  color,
  POA,
  activePower,
}: {
  plan: Plan;
  className?: string;
  animationDelay?: number;
  animationDuration?: number;
  active: boolean;
  POA?: boolean;
  color?: string;
  activePower?: number;
}) => {
  return (
    <FadeIn delay={animationDelay} duration={animationDuration}>
      <div
        className={`actions-plans-card rounded-2xl p-8 py-5 flex flex-col bg-so-dark-gray ${
          active ? '!border-2' : 'border-0'
        } ${className}`}
      >
        <div className="mb-2 flex justify-between w-full">
          <p className={`text-2xl font-semibold ${color}`}>{plan.title}</p>
          {active && <p className={color}>Your tier</p>}
        </div>
        <div className=" flex justify-between w-full items-center">
          <p className="">Minimum Required Node Power</p>
          <p className="font-semibold text-lg">
            +{plan.requiredNodePower} PION
          </p>
        </div>

        {active && activePower && !POA && (
          <div className=" flex justify-between w-full items-center">
            <p className="">Your BonPION Node Power</p>
            <p className="font-semibold text-xl">{activePower} PION</p>
          </div>
        )}
        {!POA && (
          <div className="flex justify-between w-full items-center">
            <p className="">Verification Required</p>
            <p
              className="underline cursor-pointer font-semibold text-lg"
              onClick={() => window.open(plan.verificationLink, '_blank')}
            >
              {plan.verificationMethods}
            </p>
          </div>
        )}
        {POA && (
          <p className="text-[#918EF5] text-center">
            This tier is a Proof of Authority based network, to get POA Tier
            please contact the team
          </p>
        )}
      </div>
    </FadeIn>
  );
};
