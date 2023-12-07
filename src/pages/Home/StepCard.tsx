import { Step } from '../../types';
import { FadeIn } from '../../animations';

export const StepCard = ({
  step,
  className,
  animationDelay,
  children,
}: {
  step: Step;
  className: string;
  animationDelay: number;
  children: React.ReactNode;
}) => {
  return (
    <FadeIn
      className={className + ' rounded-3xl dark:shadow-xl'}
      delay={animationDelay}
    >
      <div className="step-card px-7 pt-5 pb-10 h-full min-h-[297px] max-w-[430px] flex flex-col relative bg-black1 bg-opacity-50 rounded-2xl backdrop-blur-[12.5px] dark:bg-alice-card-background">
        <p className="font-tomorrow absolute right-6 -top-10 text-8xl font-medium with-stroke dark:text-alice-primary-13">
          {step.id}
        </p>

        {children}
      </div>
    </FadeIn>
  );
};
