import { FadeIn } from '../../animations';
import { calculateRoundAmount } from '../../utils';

const AmountInput = ({
  balance,
  value,
  onValueChanged,
}: {
  balance?: string;
  value: string;
  onValueChanged: (value: string) => void;
}) => {
  return (
    <div className="amount-input flex flex-col w-full gap-2 mb-2">
      <div className="amount-input__top text-sm flex justify-between">
        <span className="flex flex-col">
          <div className="amount-input__title text-xyz-75 max-md:text-sm max-md:font-semibold max-md:mb-1">
            {'Token Amount'}
          </div>
          <p className="balance text-xyz-75 flex text-xs md:hidden ">
            Balance: <span className="value text-white ml-1">{balance}</span>
          </p>
        </span>
        <div className="amount-input__balance-and-actions flex items-center gap">
          <p className="balance mr-0.5 md:mr-1.5 text-xyz-75 hidden md:flex ">
            Balance: <span className="value text-white ml-1">{balance}</span>
          </p>
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 25, 2).toString(),
                )
              }
              className="btn btn--secondary-tag"
            >
              {'25%'}
            </button>
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 50, 2).toString(),
                )
              }
              className="btn btn--secondary-tag"
            >
              {'50%'}
            </button>
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 75, 2).toString(),
                )
              }
              className="btn btn--secondary-tag"
            >
              {'75%'}
            </button>
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 100, 2).toString(),
                )
              }
              className="btn btn--secondary-tag"
            >
              {'Max'}
            </button>
          </div>
        </div>
      </div>
      <div className="amount-input__input-wrapper flex items-center justify-between bg-catskill-white rounded-xl pl-4 md:pl-5 pr-4 h-12 md:h-14">
        <input
          className="amount-input__input placeholder-gray10 text-white font-medium w-full h-full bg-transparent outline-none max-md:text-sm"
          placeholder="Amount You Want to Lock"
          type="number"
          value={value}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div className="amount-input__token-name text-gray10 font-semibold max-md:text-sm">
          {'PION'}
        </div>
      </div>
      {balance && Number(balance) < Number(value) && (
        <FadeIn duration={0.3}>
          <p className="text-red-400 font-bold text-xs">
            You don't have sufficient amounts of PION.{' '}
            <span className="underline cursor-pointer">BUY HERE</span>
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default AmountInput;
