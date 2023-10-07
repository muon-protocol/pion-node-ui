import { FadeIn } from '../../animations';
// import { calculateRoundAmount } from '../../utils';
import { W3bNumber } from '../../types/wagmi.ts';
import { ethers } from 'ethers';

const AmountInput = ({
  balance,
  value,
  onValueChanged,
  rightText,
  withLink,
}: {
  balance: W3bNumber | null;
  value: W3bNumber;
  onValueChanged: (value: string) => void;
  rightText?: string;
  withLink?: boolean;
}) => {
  return (
    <div className={`amount-input flex flex-col w-full gap-2 mb-2`}>
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
                balance ? onValueChanged((balance.dsp * 0.25).toString()) : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              25%
            </button>
            <button
              onClick={() =>
                balance ? onValueChanged((balance.dsp * 0.5).toString()) : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              50%
            </button>
            <button
              onClick={() =>
                balance ? onValueChanged((balance.dsp * 0.75).toString()) : null
              }
              className="btn btn--secondary-tag !font-normal"
            >
              75%
            </button>
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
      <div className="amount-input__input-wrapper flex items-center justify-between bg-input-bg rounded-xl pl-4 md:pl-5 pr-4 h-12 md:h-14">
        <input
          className="amount-input__input text-white placeholder-white font-medium w-full h-full bg-transparent outline-none text-sm"
          placeholder="Enter amount"
          type="number"
          value={value.hStr}
          onChange={(e) => onValueChanged(e.target.value)}
        />
        <div className="amount-input__token-name text-gray10 font-semibold max-md:text-sm min-w-fit">
          {rightText}
        </div>
      </div>
      {withLink && balance && balance.big < value.big ? (
        <FadeIn duration={0.3}>
          <p className="text-red-600 font-bold text-xs">
            You don't have sufficient amount of PION.{' '}
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
