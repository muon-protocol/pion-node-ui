import { Plan } from '../../types';
import { MoveUpIn } from '../../animations';

const PlanCard = ({
  plan,
  className = '',
  animationDelay,
}: {
  plan: Plan;
  className?: string;
  animationDelay: number;
}) => {
  return (
    <MoveUpIn className={className + ' rounded-3xl'} delay={animationDelay}>
      <div className={`plan-card p-7 pb-7 pt-[120px] relative max-w-[430px]`}>
        <div
          className={`plan-card__title-shadow max-md:left-1/2 max-md:translate-x-[-42%] absolute left-9 top-9 ${plan.shadowColor} font-semibold text-[40px]`}
        >
          {plan.title}
        </div>
        <div className="plan-card__title max-md:left-1/2 max-md:-translate-x-1/2 absolute left-9 top-9 -ml-1 text-black font-semibold text-[32px]">
          {plan.title}
        </div>
        <div className="plan-card__content mb-1 flex flex-col gap-6">
          <div className="plan-card__content__item flex flex-col z-10">
            <div className="plan-card__content__item__title">
              Minimum required ALICE
            </div>
            <div className="plan-card__content__item__value">
              {plan.requiredNodePower}
            </div>
          </div>
          <div className="plan-card__content__item flex flex-col">
            <div className="plan-card__content__item__title">
              Verification Methods
            </div>
            <div
              className="plan-card__content__item__value underline cursor-pointer"
              onClick={() => window.open(plan.verificationLink, '_blank')}
            >
              {plan.verificationMethods}
            </div>
          </div>
          {/*<div className="plan-card__content__item flex flex-col">*/}
          {/*  <div className="plan-card__content__item__title">APR</div>*/}
          {/*  <div className="plan-card__content__item__value">{plan.APR}</div>*/}
          {/*</div>*/}
          {/*<div className="plan-card__content__item flex flex-col">*/}
          {/*  <div className="plan-card__content__item__title">Profitability</div>*/}
          {/*  <div className="plan-card__content__item__value">*/}
          {/*    {plan.profitability}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </MoveUpIn>
  );
};

export default PlanCard;
