import { plans } from '../../data/constants.ts';
import { ActionsPlansCard } from './ActionsPlansCard.tsx';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { w3bNumberFromBigint } from '../../utils/web3.ts';

export const Plans = () => {
  const { valueOfBondedToken } = useMuonNodeStaking();

  const valueOfBondedTokenInW3BNumber = w3bNumberFromBigint(
    valueOfBondedToken || BigInt(0),
  );

  const isPlanActive = (minPower: number, maxPower: number) => {
    return (
      valueOfBondedTokenInW3BNumber.dsp >= minPower &&
      valueOfBondedTokenInW3BNumber.dsp < maxPower
    );
  };

  return (
    <div className="plans min-w-[430px] flex flex-col justify-between flex-grow">
      <ActionsPlansCard
        plan={plans[0]}
        className="w-full bg-white border-plan-1"
        animationDelay={0.1}
        animationDuration={0.3}
        active={isPlanActive(10000, 50000)}
        color="text-plan-1"
      />
      <ActionsPlansCard
        plan={plans[1]}
        className="w-full bg-white border-plan-2"
        animationDelay={0.2}
        animationDuration={0.3}
        active={isPlanActive(50000, 200000)}
        color="text-plan-2"
      />
      <ActionsPlansCard
        plan={plans[2]}
        className="w-full bg-white border-plan-3"
        animationDelay={0.3}
        animationDuration={0.3}
        active={isPlanActive(200000, 100000000000000)}
        color="text-plan-3"
      />
    </div>
  );
};
