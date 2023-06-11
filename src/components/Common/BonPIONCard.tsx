import { FC } from 'react';

const BonPIONCard: FC<{
  title: string;
  subTitle1: string;
  subValue1: string;
  subTitle2: string;
  subValue2: string;
  compact?: boolean;
  selected?: boolean;
}> = ({
  title,
  subTitle1,
  subValue1,
  subTitle2,
  subValue2,
  compact,
  selected,
}) => {
  return (
    <div
      className={`new-bounded-pion-card rounded-2xl p-[18px] flex-1 bg-primary-card flex flex-col ${
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
