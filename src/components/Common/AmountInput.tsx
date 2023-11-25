import { FadeIn } from '../../animations';
// import { calculateRoundAmount } from '../../utils';
import { W3bNumber } from '../../types/wagmi.ts';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import strings from '../../constants/strings.ts';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';

const AmountInput = ({
  balance,
  value,
  onValueChanged,
  rightText,
  withLink,
  disabled,
  boostCoefficient,
}: {
  balance: W3bNumber | null;
  value: W3bNumber;
  onValueChanged: (value: string) => void;
  rightText?: string;
  withLink?: boolean;
  disabled?: boolean;
  boostCoefficient?: W3bNumber;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (disabled) {
      onValueChanged('');
    }
  }, [disabled, onValueChanged]);

  return (
    <div className={`amount-input flex flex-col w-full gap-2 mb-2`}>
      <div className="amount-input__top relative text-sm flex justify-between">
        <span className="flex flex-col">
          <p className="balance flex text-xyz-2 dark:text-alice-gray">
            Balance:{' '}
            <span className="value ml-1 text-xyz-75 dark:text-black dark:font-semibold">
              {balance ? balance.dsp : '...'}
            </span>
          </p>
        </span>
        <div className="amount-input__balance-and-actions flex items-center gap">
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                balance && !disabled
                  ? onValueChanged((balance.dsp * 0.25).toString())
                  : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              25%
            </button>
            <button
              onClick={() =>
                balance && !disabled
                  ? onValueChanged((balance.dsp * 0.5).toString())
                  : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              50%
            </button>
            <button
              onClick={() =>
                balance && !disabled
                  ? onValueChanged((balance.dsp * 0.75).toString())
                  : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              75%
            </button>
            <button
              onClick={() =>
                balance && !disabled
                  ? onValueChanged(ethers.formatEther(balance.big))
                  : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      <div className="amount-input__input-wrapper flex items-center w-full gap-3 bg-input-bg dark:bg-alice-xyz-75 rounded-xl h-12 md:h-14">
        <input
          disabled={disabled}
          className={`amount-input__input text-white max-md:min-w-0 dark:text-black flex-1 font-medium h-full pl-4 md:pl-5 bg-transparent outline-none text-sm ${
            disabled
              ? 'placeholder-gray dark:placeholder-alice-gray'
              : 'placeholder-white dark:placeholder-gray'
          }`}
          placeholder={disabled ? '-' : `Enter amount`}
          type="number"
          value={disabled ? '' : value.hStr}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div
          className={`amount-input__token-name group font-semibold max-md:text-sm min-w-fit ${
            disabled ? 'text-gray' : 'text-gray10 dark:text-black1'
          }`}
        >
          {rightText}
        </div>
        <div
          className={`px-2 md:px-4 h-full flex relative items-center rounded-r-xl gap-1.5 md:gap-2 group ${
            disabled ? 'bg-gray3' : 'bg-primary-dark'
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
          {/*<div className="absolute top-0 -translate-y-[105%] transition-all group-hover:flex -translate-x-1/2 left-1/2 flex-col items-center opacity-0 hidden mb-6 group-hover:opacity-100 group-hover:-translate-y-[115%]">*/}
          {/*  <span className="relative z-10 px-3 py-2 w-40 text-center text-xs leading-none text-primary whitespace-no-wrap bg-white font-bold rounded shadow-lg">*/}
          {/*    Use USDC to boost your power by {boostCoefficient?.dsp}x*/}
          {/*  </span>*/}
          {/*  <div className="w-3 h-3 -mt-2 rotate-45 bg-white"></div>*/}
          {/*</div>*/}
        </div>
      </div>
      {withLink && balance && balance.big < value.big ? (
        <FadeIn duration={0.3}>
          <p className="text-red-400 dark:text-red-600 font-bold text-xs">
            You don't have sufficient amount of ${strings.token}.{'  '}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate(routes.buyToken.path)}
            >
              Buy ${strings.token} here.
            </span>
          </p>
        </FadeIn>
      ) : null}
    </div>
  );
};

export default AmountInput;
