import { FC } from 'react';

const BonPIONCard: FC<{
  title: string;
  className?: string;
  subTitle1: string;
  subValue1: string;
  subTitle2: string;
  subValue2: string;
  onClick?: () => void;
  compact?: boolean;
  selected?: boolean;
}> = ({
  title,
  className,
  subTitle1,
  subValue1,
  subTitle2,
  subValue2,
  onClick,
  compact,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={`new-bounded-pion-card rounded-2xl p-[18px] flex-1 bg-primary-card flex flex-col ${className} ${
        selected
          ? 'bg-primary-dark text-gray10'
          : 'bg-primary-10-solid text-black'
      }`}
    >
      <p className={`font-semibold ${compact ? 'mb-3' : 'mb-6'}`}>{title}</p>
      <span className="text-sm flex mb-2 justify-between">
        <p className="font-light">{subTitle1}</p>
        <p className="font-medium">{subValue1}</p>
      </span>
      <span className="text-sm flex justify-between">
        <p className="font-light">{subTitle2}</p>
        <p className="font-medium">{subValue2}</p>
      </span>
    </div>
  );
};

export default BonPIONCard;
