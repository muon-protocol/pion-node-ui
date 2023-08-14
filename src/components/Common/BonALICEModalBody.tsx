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
                className="cursor-pointer"
                title={'BonALICE #' + item.tokenId}
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
        <p className="text-center py-24 px-3 text-primary">
          You have no BonALICE NFTs to show. Please create Bonded ALICE NFT
          first.
        </p>
      )}
    </div>
  );
};

export default BonALICEModalBody;
