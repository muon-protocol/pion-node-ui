import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { RawRewardSection } from '../../types';
import { useState } from 'react';
import { MoveUpIn } from '../../animations';
import { formatWalletAddress, w3bNumberFromNumber } from '../../utils/web3.ts';

export const PrizeCalculationDetailModal = () => {
  const { rawRewards, rawRewardsFromPast } = useClaimPrize();
  const rewards = rawRewardsFromPast || rawRewards;

  return (
    <div className="text-white">
      {/*<RewardSource source={rewards?.deus_presale} title="Deus Presale" />*/}
      <RewardSource source={rewards?.muon_presale} title="MUON Presale" />
      <RewardSource
        source={rewards?.early_alice_operator}
        title="PION Operator"
        subTitle="(Early stage)"
        headerDetail="20% Reward"
        detailDescription="The early stage of the PION Operator is from 1st of July 2021 to 31st of July 2021"
      />
      <RewardSource
        source={rewards?.alice_operator}
        title="PION Operator"
        subTitle="(Main stage)"
        headerDetail="40% Reward"
        detailDescription="The main stage of the ALICE Operator is from 1st of August 2021 to 31st of August 2021"
      />
      <RewardSource
        source={rewards?.alice_operator_bounce}
        title="ALICE Operator"
        subTitle="(Bounce stage)"
      />
    </div>
  );
};

const RewardSource = ({
  source,
  title,
  subTitle,
  headerDetail,
  detailDescription,
}: {
  source: RawRewardSection | undefined;
  title: string;
  subTitle?: string;
  headerDetail?: string;
  detailDescription?: string;
}) => {
  const [detailHovered, setDetailHovered] = useState(false);

  if (!source || !source.contributors || !source.reward) return null;

  return (
    <div className="prize-section mb-6">
      <div className="section-title mb-2 flex items-center justify-between">
        <p className="text-lg font-semibold">
          {title} <span className="text-lg font-normal">{subTitle}</span>
        </p>
        {headerDetail && (
          <div
            className="flex gap-1 cursor-pointer items-center"
            onMouseEnter={() => setDetailHovered(true)}
            onMouseLeave={() => setDetailHovered(false)}
          >
            <p className="text-sm">{headerDetail}</p>
            <img
              className="w-4 h-4"
              src="/assets/images/modal/detail-description-icon.svg"
              alt=""
            />
            {detailHovered && (
              <MoveUpIn y={5} duration={0.1} className="absolute w-60">
                <p className="p-2 bg-primary-dark font-semibold -translate-y-12 -translate-x-8 text-xs text-center rounded-lg text-white">
                  {detailDescription}
                </p>
              </MoveUpIn>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 pb-3 border-b-[1px] border-gray border-dashed">
        {source.contributors.map((contributor) => {
          if (contributor.reward > 0)
            return (
              <div className="section-description text-sm font-light flex justify-between">
                <p className="flex gap-1">
                  <span className="font-semibold">
                    &#8226; {formatWalletAddress(contributor.contributor)}
                  </span>
                  {/*Staked*/}
                  {/*<span className="font-semibold">2000</span> DEI*/}
                  <img
                    className="ml-1"
                    src="/assets/images/modal/right-arrow-icon.svg"
                    alt=""
                  />
                </p>
                <p className="flex gap-1">
                  <span className="font-semibold">
                    {w3bNumberFromNumber(contributor.reward).dsp}
                  </span>
                  ALICE
                </p>
              </div>
            );
        })}
      </div>
      <div className="flex justify-between items-center pt-2">
        <p>Total</p>
        <p className="font-semibold">
          {w3bNumberFromNumber(source.reward).dsp} ALICE
        </p>
      </div>
    </div>
  );
};
