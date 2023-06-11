import { FC } from 'react';

const BonPIONCard: FC<{
  title: string;
  subTitle1: string;
  subValue1: string;
  subTitle2: string;
  subValue2: string;
}> = ({ title, subTitle1, subValue1, subTitle2, subValue2 }) => {
  return (
    <div className="new-bounded-pion-card rounded-2xl p-[18px] flex-1 bg-primary-card flex flex-col bg-primary-dark">
      <p className="text-gray10 font-semibold mb-6">{title}</p>
      <span className="text-sm text-gray10 flex mb-2 justify-between">
        <p className="font-light">{subTitle1}</p>
        <p className="font-medium">{subValue1}</p>
      </span>
      <span className="text-sm text-gray10 flex justify-between">
        <p className="font-light">{subTitle2}</p>
        <p className="font-medium">{subValue2}</p>
      </span>
    </div>
  );
};

export default BonPIONCard;
