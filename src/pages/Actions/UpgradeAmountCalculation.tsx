import { MoveUpIn } from '../../animations';
// import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import { useBooster } from '../../hooks/booster/useBooster.ts';
import strings from '../../constants/strings.ts';

const UpgradeAmountCalculation = () => {
  const { upgradeAmount, upgradeBoostAmount, selectedUpgradeBonALICE } =
    useUpgradeAction();
  const { boostCoefficient } = useBooster();

  if (!selectedUpgradeBonALICE) return null;
  if (!upgradeAmount.hStr && !upgradeBoostAmount.hStr) return null;
  if (upgradeAmount.big === BigInt(0) && upgradeBoostAmount.big === BigInt(0))
    return null;
  if (!boostCoefficient) return null;

  return (
    <MoveUpIn
      y={-10}
      duration={0.1}
      delay={0.1}
      className="flex w-full justify-between items-center"
    >
      <span className="text-gray10">
        <p className="font-light">You get:</p>
        {upgradeAmount.big > BigInt(0) ? (
          <p className="font-light text-sm flex gap-1">
            {(Number(upgradeAmount.hStr) * boostCoefficient?.dsp).toFixed(2) +
              ' + ' +
              selectedUpgradeBonALICE.nodePower +
              ` ${strings.token}`}
          </p>
        ) : (
          <p className="h-5"></p>
        )}
      </span>
      <span className="rounded-md bg-primary-dark dark:bg-alice-primary px-3 py-2.5 text-xl font-bold text-white">
        {(
          Number(upgradeAmount.hStr) * boostCoefficient?.dsp +
          selectedUpgradeBonALICE.nodePower
        ).toFixed(2)}
      </span>
    </MoveUpIn>
  );
};

export default UpgradeAmountCalculation;
