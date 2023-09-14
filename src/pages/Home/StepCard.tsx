import { Step } from '../../types';
import { MoveUpIn } from '../../animations';

export const StepCard = ({
  step,
  className,
  animationDelay,
}: {
  step: Step;
  className: string;
  animationDelay: number;
}) => {
  return (
    <MoveUpIn className={className + ' rounded-xl'} delay={animationDelay}>
      <div className="step-card px-7 pt-6 pb-10 h-full min-h-[266px] max-w-[430px] flex flex-col relative bg-primary-13 rounded-xl bg-opacity-50 bg-black1 backdrop-blur-[12.5px]">
        <div className="font-tomorrow absolute right-7 -top-8 text-8xl font-medium text-primary">
          {step.id}
        </div>
        <p className="font-tomorrow text-2xl font-medium mb-6">{step.title}</p>
        <span className="descriptions font-tomorrow mb-5 flex flex-col gap-1">
          {step.descriptions.map((description, index) => (
            <p key={index}>{description}</p>
          ))}
        </span>

        <div
          className="btn mt-auto mx-auto font-tomorrow"
          onClick={() => window.open(step.buttonLink, step.buttonLinkTarget)}
        >
          {step.buttonText}
        </div>
      </div>
    </MoveUpIn>
  );
};
