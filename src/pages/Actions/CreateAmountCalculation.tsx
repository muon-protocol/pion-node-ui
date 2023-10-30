import { MoveUpIn } from '../../animations';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
import { useBooster } from '../../hooks/booster/useBooster.ts';
import strings from '../../constants/strings.ts';

const CreateAmountCalculation = () => {
  const { createAmount, createBoostAmount } = useCreateAction();
  const { ALICEPrice } = useTokenPrice();
  const { boostCoefficient } = useBooster();

  if (!createAmount.hStr && !createBoostAmount.hStr) return null;
  if (!boostCoefficient) return null;

  if (!ALICEPrice) {
    return (
      <MoveUpIn
        y={-10}
        duration={0.1}
        delay={0.1}
        className="flex w-full justify-between items-center"
      >
        <span className="text-gray10">
          <p className="font-light">New {strings.nft} amount:</p>
          <p className="h-5"></p>
        </span>
        <span className="rounded-md bg-primary-dark dark:bg-alice-primary px-3 py-2.5 text-xl font-bold text-white">
          {Number(createAmount.hStr).toFixed(2) + ' ' + strings.token}
        </span>
      </MoveUpIn>
    );
  }

  return (
    <>
      <MoveUpIn
        y={-10}
        duration={0.1}
        delay={0.1}
        className="flex w-full justify-between items-center"
      >
        <span className="text-gray10">
          <p className="font-light">New {strings.nft} amount:</p>
          {createBoostAmount.big > BigInt(0) ? (
            <p className="font-light text-sm flex gap-1">
              {Number(createBoostAmount.hStr) +
                ' USDC -> ' +
                (
                  Number(createBoostAmount.hStr) /
                  (Math.round(ALICEPrice * 10000) / 10000)
                ).toFixed(2) +
                ` ${strings.token} `}
              <p className="text-uptime font-bold">x{boostCoefficient?.dsp}</p>
              {' + ' + Number(createAmount.hStr) + ` ${strings.token}`}
            </p>
          ) : (
            <p className="h-5"></p>
          )}
        </span>
        <span className="rounded-md bg-primary-dark dark:bg-alice-primary px-3 py-2.5 text-xl font-bold text-white">
          {(
            (Number(createBoostAmount.hStr) /
              (Math.round(ALICEPrice * 10000) / 10000)) *
              boostCoefficient.dsp +
            Number(createAmount.hStr)
          ).toFixed(2) + ` ${strings.token}`}
        </span>
      </MoveUpIn>
    </>
  );
};

export default CreateAmountCalculation;
