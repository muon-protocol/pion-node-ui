import { FadeIn } from '../../animations';
import { W3bNumber } from '../../types/wagmi.ts';

const AmountInput = ({
  balance,
  value,
  onValueChanged,
  rightText,
  withLink,
  boostCoefficient,
  max,
  disabled,
}: {
  balance: W3bNumber | null;
  value: W3bNumber;
  onValueChanged: (value: string) => void;
  rightText?: string;
  withLink?: boolean;
  boostCoefficient?: W3bNumber;
  max: W3bNumber | undefined;
  disabled?: boolean;
}) => {
  return (
    <div className={`amount-input flex flex-col w-full gap-2 mb-2 mt-1.5`}>
      <div className="amount-input__top relative text-sm flex justify-between">
        <span className="flex flex-col">
          <p className="balance flex text-xyz-2">
            Balance:{' '}
            <span className="value ml-1 text-xyz-75">
              {balance ? balance.dsp : '...'}
            </span>
          </p>
        </span>
        <div className="amount-input__balance-and-actions flex items-center gap">
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                balance && max
                  ? onValueChanged(
                      max.big < balance.big
                        ? max.dsp.toFixed(2)
                        : balance.dsp.toFixed(2),
                    )
                  : null
              }
              className="btn btn--secondary-tag !font-normal text-black"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      <div className="amount-input__input-wrapper flex items-center gap-3 w-full bg-input-bg rounded-xl h-12 md:h-14">
        <input
          disabled={disabled}
          className={`amount-input__input text-white flex-1 font-medium h-full pl-4 md:pl-5 bg-transparent outline-none text-sm ${
            disabled ? 'placeholder-gray' : 'placeholder-white'
          }`}
          placeholder={
            disabled
              ? '-'
              : `Enter amount ${max?.dsp ? '(max: ' + max.dsp + ')' : ''}`
          }
          type="number"
          value={value.hStr}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div
          className={`amount-input__token-name group font-semibold max-md:text-sm min-w-fit ${
            disabled ? 'text-gray' : 'text-gray10'
          }`}
        >
          {rightText}
        </div>
        <div
          className={`bg-primary-dark px-4 h-full flex relative items-center rounded-r-xl gap-2 group ${
            disabled ? 'bg-gray3' : ''
          }`}
        >
          <p className="text-xl font-bold text-white">
            {boostCoefficient?.dsp}x
          </p>
          <p className="font-semibold text-sm mr-1 text-white leading-5">
            Power
            <br />
            Boost
          </p>
          <img
            src="/assets/images/boosting-icon.svg"
            alt=""
            className="w-6 h-6"
          />
          <div className="absolute top-0 -translate-y-[120%] -translate-x-1/2 flex left-1/2 flex-col items-center hidden mb-6 group-hover:flex">
            <span className="relative z-10 px-3 py-2 w-40 text-center text-xs leading-none text-primary whitespace-no-wrap bg-white font-bold rounded shadow-lg">
              Use USDC to increase your power by {boostCoefficient?.dsp}x
            </span>
            <div className="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
          </div>
        </div>
      </div>
      {value && max && value.big > max.big ? (
        <FadeIn duration={0.3}>
          <p className="text-red-600 font-bold text-xs">
            You can't use more than max amount ({max.dsp} USDC) to increase.
          </p>
        </FadeIn>
      ) : withLink && balance && balance.big < value.big ? (
        <FadeIn duration={0.3}>
          <p className="text-red-600 font-bold text-xs">
            You don't have sufficient amount of USDC.
          </p>
        </FadeIn>
      ) : null}
    </div>
  );
};

export default AmountInput;
