import BonALICECard from './BonALICECard.tsx';
import { BonALICE } from '../../types';
import { getTier } from '../../utils';

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
      {bonALICEs.length > 0 ? (
        bonALICEs.map((item: BonALICE) => {
          return (
            item.nodePower > 0 && (
              <BonALICECard
                isNodeBonALICE={item.isNodeBonALICE}
                className="cursor-pointer"
                title={'bonPION #' + item.tokenId}
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
          You have no bonPION NFTs to show. Please create Bonded PION NFT first.
        </p>
      )}
    </div>
  );
};

export default BonALICEModalBody;
