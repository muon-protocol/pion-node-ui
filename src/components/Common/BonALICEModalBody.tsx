import BonALICECard from './BonALICECard.tsx';
import { BonALICE } from '../../types';
import { getTier } from '../../utils';
import strings from '../../constants/strings.ts';

const BonALICEModalBody = ({
  bonALICEs,
  handleUpgradeModalItemClicked,
  isSelectedUpgradeBonALICE,
}: {
  bonALICEs: BonALICE[];
  handleUpgradeModalItemClicked: (item: BonALICE) => void;
  isSelectedUpgradeBonALICE: (item: BonALICE) => boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {bonALICEs.find((nft) => nft.nodePower > 0) ? (
        bonALICEs.map((item: BonALICE) => {
          return (
            item.nodePower > 0 && (
              <BonALICECard
                key={item.tokenId}
                isNodeBonALICE={item.isNodeBonALICE}
                className="cursor-pointer"
                title={`${strings.nft} #` + item.tokenId}
                subTitle1="Node Power"
                subValue1={item.nodePower}
                subTitle2="Tier"
                subValue2={getTier(item.nodePower)}
                onClick={() => handleUpgradeModalItemClicked(item)}
                compact
                selected={isSelectedUpgradeBonALICE(item)}
              />
            )
          );
        })
      ) : (
        <p className="text-center py-24 px-3 text-white">
          You have no {strings.nft} NFTs to show.
        </p>
      )}
    </div>
  );
};

export default BonALICEModalBody;
