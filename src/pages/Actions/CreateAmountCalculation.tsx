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
  if (createAmount.big === BigInt(0) && createBoostAmount.big === BigInt(0))
    return null;
  if (!boostCoefficient) return null;

  if (!ALICEPrice) {
    return (
      <MoveUpIn
        y={-10}
        duration={0.1}
        delay={0.1}
        className="flex mt-4 w-full justify-between items-center"
      >
        <span className="text-gray10">
          <p className="font-light">New {strings.nft} amount:</p>
          <p className="h-5"></p>
        </span>
        <span className="rounded-md bg-primary-dark dark:bg-alice-primary px-3 py-2.5 text-xl font-bold text-white">
          {(
            Number(Number(createAmount.hStr).toFixed(2)) * boostCoefficient?.dsp
          ).toFixed(2) +
            ' ' +
            strings.token}
        </span>
      </MoveUpIn>
    );
  }
};

export default CreateAmountCalculation;
