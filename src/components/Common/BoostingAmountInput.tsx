import { FadeIn } from '../../animations';
import { W3bNumber } from '../../types/wagmi.ts';
import { ethers } from 'ethers';

const AmountInput = ({
  balance,
  value,
  onValueChanged,
  rightText,
  withLink,
  max,
}: {
  balance: W3bNumber | null;
  value: W3bNumber;
  onValueChanged: (value: string) => void;
  rightText?: string;
  withLink?: boolean;
  max: W3bNumber | undefined;
}) => {
  return (
    <div className={`amount-input flex flex-col w-full gap-2 mb-2 mt-1.5`}>
      <div className="amount-input__top relative text-sm flex justify-between">
        <span className="flex flex-col">
          <p className="balance flex text-gray">
            Balance:{' '}
            <span className="value ml-1 text-black">
              {balance ? balance.dsp : '...'}
            </span>
          </p>
        </span>
        <div className="amount-input__balance-and-actions flex items-center gap">
          <div className="flex gap-1.5 max-md:items-end h-full">
            <button
              onClick={() =>
                balance ? onValueChanged(ethers.formatEther(balance.big)) : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              Max
            </button>
          </div>
        </div>
      </div>
      <div className="amount-input__input-wrapper flex items-center justify-between bg-catskill-white rounded-xl pl-4 overflow-hidden md:pl-5 h-12 md:h-14">
        <input
          className="amount-input__input text-black placeholder-gray font-medium h-full bg-transparent outline-none text-sm"
          placeholder={`Enter amount ${max ? '(max: ' + max.dsp + ')' : ''}`}
          type="number"
          value={value.hStr}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div className="amount-input__token-name font-semibold max-md:text-sm min-w-fit">
          {rightText}
        </div>
        <div className="bg-primary px-4 h-full flex items-center gap-2">
          <p className="text-xl font-bold text-white">{2}x</p>
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
      {withLink && balance && balance.big < value.big ? (
        <FadeIn duration={0.3}>
          <p className="text-red-600 font-bold text-xs">
            You don't have sufficient amount of ALICE.{' '}
            <span
              className="underline cursor-pointer"
              onClick={() =>
                window.open(
                  'https://pancakeswap.finance/swap?chain=bscTestnet&outputCurrency=0xF43CD517385237fe7A48927073151D12f4eADC53&inputCurrency=tBNB',
                  '_blank',
                )
              }
            >
              BUY HERE
            </span>
          </p>
        </FadeIn>
      ) : null}
    </div>
  );
};

export default AmountInput;
