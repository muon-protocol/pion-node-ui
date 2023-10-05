import { Step } from '../../types';
import { MoveUpIn } from '../../animations';

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
    <MoveUpIn className={className + ' rounded-xl'} delay={animationDelay}>
      <div className="step-card px-7 pt-5 pb-10 h-full min-h-[297px] max-w-[430px] flex flex-col relative bg-primary-13 rounded-xl bg-opacity-50 bg-black1 backdrop-blur-[12.5px]">
        <div className="font-tomorrow absolute right-7 -top-10 text-8xl font-medium text-primary">
          {step.id}
        </div>

        {children}
      </div>
    </MoveUpIn>
  );
};
