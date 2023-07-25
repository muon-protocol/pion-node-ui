import { FadeIn } from '../../animations';
import { calculateRoundAmount } from '../../utils';

const AmountInput = ({
  balance,
  value,
  onValueChanged,
  withIcon,
  iconClicked,
  rightText,
}: {
  balance?: string | number | null;
  value: string;
  onValueChanged: (value: string) => void;
  withIcon?: boolean;
  iconClicked?: () => void;
  rightText?: string;
}) => {
  return (
    <div
      className={`amount-input flex flex-col w-full gap-2 mb-2 ${
        withIcon ? 'mt-1.5' : ''
      }`}
    >
      <div className="amount-input__top relative text-sm flex justify-between">
        {withIcon && (
          <img
            onClick={iconClicked}
            className="absolute -top-2.5 right-1/2 cursor-pointer"
            src="/assets/images/actions/plus-icon.svg"
            alt=""
          />
        )}
        <span className="flex flex-col">
          <p className="balance flex text-gray">
            Balance: <span className="value ml-1 text-black">{balance}</span>
          </p>
        </span>
        <div className="amount-input__balance-and-actions flex items-center gap">
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 25, 2).toString(),
                )
              }
              className="btn btn--secondary-tag !font-normal"
            >
              25%
            </button>
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 50, 2).toString(),
                )
              }
              className="btn btn--secondary-tag !font-normal"
            >
              50%
            </button>
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 75, 2).toString(),
                )
              }
              className="btn btn--secondary-tag !font-normal"
            >
              75%
            </button>
            <button
              onClick={() =>
                onValueChanged(
                  calculateRoundAmount(Number(balance), 100, 2).toString(),
                )
              }
              className="btn btn--secondary-tag !font-normal"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      <div className="amount-input__input-wrapper flex items-center justify-between bg-catskill-white rounded-xl pl-4 md:pl-5 pr-4 h-12 md:h-14">
        <input
          className="amount-input__input text-black placeholder-gray font-medium w-full h-full bg-transparent outline-none max-md:text-sm"
          placeholder="Amount You Want to Lock"
          type="number"
          value={value}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div className="amount-input__token-name font-semibold max-md:text-sm min-w-fit">
          {rightText}
        </div>
      </div>
      {balance && Number(balance) < Number(value) ? (
        <FadeIn duration={0.3}>
          <p className="text-red-600 font-bold text-xs">
            You don't have sufficient amount of ALICE.{' '}
            <span className="underline cursor-pointer">BUY HERE</span>
          </p>
        </FadeIn>
      ) : null}
    </div>
  );
};

export default AmountInput;
