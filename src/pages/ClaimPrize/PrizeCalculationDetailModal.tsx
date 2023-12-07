import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
// import { RawRewardSection } from '../../types';
import { useState } from 'react';
import { MoveUpIn } from '../../animations';
import { w3bNumberFromNumber } from '../../utils/web3.ts';
import strings from '../../constants/strings.ts';
// import { formatWalletAddress, w3bNumberFromNumber } from '../../utils/web3.ts';

export const PrizeCalculationDetailModal = () => {
  const { rawRewards, rawRewardsFromPast } = useClaimPrize();
  const rewards = rawRewardsFromPast || rawRewards;

  if (!rewards) return null;

  return (
    <div className="text-white mt-2">
      {/*<RewardSource source={rewards?.deus_presale} title="Deus Presale" />*/}
      <RewardSource
        title="MUON Presale"
        rewardSections={[
          {
            title: 'Reward',
            reward:
              rewards.muon_presale.reward +
              rewards.deus_presale.reward +
              rewards.deus_allocation.reward,
          },
        ]}
      />
      <RewardSource
        title="ALICE Operator"
        rewardSections={[
          {
            title: 'Jan 19 - Feb 27',
            reward: rewards.early_alice_operator.reward,
          },
          {
            title: 'Feb 28 - Apr 28',
            reward: rewards.alice_operator.reward,
          },
          {
            title: 'Apr 29 - Oct 10',
            reward: rewards.alice_operator_bounce.reward,
          },
        ]}
      />
      <RewardSource
        title="MUON Private Sale"
        rewardSections={[
          { title: 'Reward', reward: rewards.muon_private_sale.reward },
        ]}
      />

      {/*<RewardSource*/}
      {/*  source={rewards?.early_alice_operator}*/}
      {/*  title="ALICE Operator"*/}
      {/*  subTitle="(Jan 27th - Feb 27th)"*/}
      {/*  headerDetail="20% Reward"*/}
      {/*  detailDescription="The early stage of the PION Operator is before the 27th of February 2023"*/}
      {/*/>*/}
      {/*<RewardSource*/}
      {/*  source={rewards?.alice_operator}*/}
      {/*  title="ALICE Operator"*/}
      {/*  subTitle="(Feb 27th - Apr 27th)"*/}
      {/*  headerDetail="40% Reward"*/}
      {/*  detailDescription="The main stage of the PION Operator is from the 27th of February 2023 to the 27th of April 2023"*/}
      {/*/>*/}
      {/*<RewardSource*/}
      {/*  source={rewards?.alice_operator_bounce}*/}
      {/*  title="ALICE Operator"*/}
      {/*  subTitle="(Apr 27th - Oct 10th)"*/}
      {/*  headerDetail="Reward"*/}
      {/*  detailDescription="The bounce stage of the PION Operator is from the 27th of April 2023"*/}
      {/*/>*/}
      <div className="flex justify-between items-center pt-2 border-t border-dashed text-xl">
        <p className="text-primary-dark-500 font-semibold">Total</p>
        <p className="font-semibold text-primary-dark-500">
          {w3bNumberFromNumber(rewards.total_reward).dsp} {strings.token}
        </p>
      </div>
    </div>
  );
};

export interface RewardSection {
  title: string;
  reward: number | undefined;
}

const RewardSource = ({
  title,
  subTitle,
  headerDetail,
  detailDescription,
  rewardSections,
}: {
  title: string;
  subTitle?: string;
  headerDetail?: string;
  detailDescription?: string;
  rewardSections: RewardSection[];
}) => {
  const [detailHovered, setDetailHovered] = useState(false);

  return (
    <div className="prize-section mb-6">
      <div className="section-title flex items-center justify-between">
        <p className="font-semibold text-lg text-primary-dark-500">
          {title} <span className="font-normal">{subTitle}</span>
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
      {/*<div className="flex flex-col gap-2 pb-3 border-b-[1px] border-gray border-dashed">*/}
      {/*  {source.contributors.map((contributor) => {*/}
      {/*    if (contributor.reward > 0)*/}
      {/*      return (*/}
      {/*        <div className="section-description text-sm font-light flex justify-between">*/}
      {/*          <p className="flex gap-1">*/}
      {/*            <span className="font-semibold">*/}
      {/*              &#8226; {formatWalletAddress(contributor.contributor)}*/}
      {/*            </span>*/}
      {/*            /!*Staked*!/*/}
      {/*            /!*<span className="font-semibold">2000</span> DEI*!/*/}
      {/*            <img*/}
      {/*              className="ml-1"*/}
      {/*              src="/assets/images/modal/right-arrow-icon.svg"*/}
      {/*              alt=""*/}
      {/*            />*/}
      {/*          </p>*/}
      {/*          <p className="flex gap-1">*/}
      {/*            <span className="font-semibold">*/}
      {/*              {w3bNumberFromNumber(contributor.reward).dsp}*/}
      {/*            </span>*/}
      {/*            PION*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*  })}*/}
      {/*</div>*/}
      {rewardSections.map((section) => (
        <div key={section.title} className="flex justify-between items-center">
          <span className="flex gap-1 items-center">
            {section.title}
            <img
              className="ml-1"
              src="/assets/images/modal/right-arrow-icon.svg"
              alt=""
            />
          </span>
          <p className="font-semibold pr-0">
            {section.reward ? w3bNumberFromNumber(section.reward).dsp : '0'}{' '}
            {strings.token}
          </p>
        </div>
      ))}
    </div>
  );
};
