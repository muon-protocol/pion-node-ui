import { Plan } from '../../types';
import { MoveUpIn } from '../../animations';

const PlanCard = ({
  plan,
  className,
  animationDelay,
}: {
  plan: Plan;
  className?: string;
  animationDelay: number;
}) => {
  return (
    <MoveUpIn
      className={(className || '') + ' rounded-3xl'}
      delay={animationDelay}
    >
      <div className={`plan-card p-9 pb-10 pt-[130px] relative max-w-[430px]`}>
        <div
          className={`plan-card__title-shadow absolute left-9 top-9 ${plan.shadowColor} text-[40px] font-bold`}
        >
          {plan.title}
        </div>
        <div className="plan-card__title absolute left-9 top-9 -ml-1 text-black text-[32px] font-bold">
          {plan.title}
        </div>
        <div className="plan-card__content mb-1 flex flex-col gap-6">
          <div className="plan-card__content__item flex flex-col">
            <div className="plan-card__content__item__title">
              Required Node Power
            </div>
            <div className="plan-card__content__item__value">
              {plan.requiredNodePower}
            </div>
          </div>
          <div className="plan-card__content__item flex flex-col">
            <div className="plan-card__content__item__title">
              Verification Methods
            </div>
            <div className="plan-card__content__item__value underline">
              {plan.verificationMethods}
            </div>
          </div>
          <div className="plan-card__content__item flex flex-col">
            <div className="plan-card__content__item__title">APR</div>
            <div className="plan-card__content__item__value">{plan.APR}</div>
          </div>
          <div className="plan-card__content__item flex flex-col">
            <div className="plan-card__content__item__title">Profitability</div>
            <div className="plan-card__content__item__value">
              {plan.profitability}
            </div>
          </div>
        </div>
      </div>
    </MoveUpIn>
  );
};

export default PlanCard;
