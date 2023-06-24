import { FC } from 'react';

const BonALICECard: FC<{
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
      className={`new-bounded-ALICE-card rounded-2xl p-[18px] flex-1 bg-primary-card flex flex-col 
        ${className} ${
        selected
          ? 'bg-primary-dark text-gray10'
          : 'bg-primary-10-solid text-black hover:bg-primary-dark-500'
      }`}
    >
      <p className={`text-white font-semibold ${compact ? 'md:mb-3' : 'mb-4 md:mb-6'}`}>
        {title}
      </p>
      <span className="text-sm flex mb-0.5 md:mb-2 justify-between">
        <p className="text-white font-light">{subTitle1}</p>
        <p className="text-white font-medium">{subValue1}</p>
      </span>
      <span className="text-sm flex justify-between">
        <p className="text-white font-light">{subTitle2}</p>
        <p className="text-white font-medium">{subValue2}</p>
      </span>
    </div>
  );
};

export default BonALICECard;
