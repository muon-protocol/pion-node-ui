import { Plan } from '../../types';
import { FadeIn } from '../../animations';
import strings from '../../constants/strings.ts';

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
        className={`actions-plans-card rounded-2xl p-8 py-5 flex flex-col bg-so-dark-gray dark:bg-alice-card-background ${
          active ? '!border-2' : 'border-0'
        } ${className}`}
      >
        <div className="mb-2 flex justify-between w-full">
          <p className={`text-2xl font-semibold ${color}`}>{plan.title}</p>
          {active && <p className={color}>Your tier</p>}
        </div>

        {plan.minNodePower && (
          <div className="flex justify-between w-full items-center">
            <p className="">Minimum Node Power</p>
            <p className="font-semibold text-lg">{plan.minNodePower}</p>
          </div>
        )}

        <div className="flex justify-between w-full items-center">
          <p className="">Maximum Node Power</p>
          <p className="font-semibold text-lg">{plan.maxNodePower}</p>
        </div>

        {active && activePower && (
          <div className="flex justify-between w-full items-center">
            <p className="">Your {strings.nft} Node Power</p>
            <p className="font-semibold text-lg">
              {activePower} {strings.token}
            </p>
          </div>
        )}
        <p
          onClick={() => window.open(plan.verificationLink, '_blank')}
          className="text-white underline cursor-pointer font-bold"
        >
          {!POA
            ? `Verify Tier ${plan.id}`
            : `Learn more about ${strings.token}'s PoA Network.`}
        </p>
      </div>
    </FadeIn>
  );
};
