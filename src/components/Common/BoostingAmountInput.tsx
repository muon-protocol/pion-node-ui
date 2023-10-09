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
}: {
  balance: W3bNumber | null;
  value: W3bNumber;
  onValueChanged: (value: string) => void;
  rightText?: string;
  withLink?: boolean;
  boostCoefficient?: W3bNumber;
  max: W3bNumber | undefined;
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
      <div className="amount-input__input-wrapper flex items-center gap-3 w-full bg-input-bg rounded-xl overflow-hidden h-12 md:h-14">
        <input
          className="amount-input__input text-white flex-1 placeholder-white font-medium h-full pl-4 md:pl-5 bg-transparent outline-none text-sm"
          placeholder={`Enter amount ${
            max?.dsp ? '(max: ' + max.dsp + ')' : ''
          }`}
          type="number"
          value={value.hStr}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div className="amount-input__token-name text-gray10 font-semibold max-md:text-sm min-w-fit">
          {rightText}
        </div>
        <div className="bg-primary-dark px-4 h-full flex items-center gap-2">
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
