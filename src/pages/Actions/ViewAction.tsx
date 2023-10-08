import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { BonALICE } from '../../types';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import { getTier } from '../../utils';

const RenderViewBody = () => {
  const { bonALICEs } = useBonALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  return (
    <div className="flex flex-col w-full overflow-y-auto styled-scroll">
      <div className="flex flex-col gap-3">
        {nodeBonALICE.length > 0 && (
          <BonALICECard
            isNodeBonALICE={nodeBonALICE[0].isNodeBonALICE}
            title={'BonALICE #' + nodeBonALICE[0].tokenId}
            subTitle1="Node Power"
            subValue1={nodeBonALICE[0].nodePower}
            subTitle2="Tier"
            subValue2={getTier(nodeBonALICE[0].nodePower)}
            compact
            selected
          />
        )}
        {bonALICEs.length > 0
          ? bonALICEs.map((item: BonALICE) => {
              return (
                item.nodePower > 0 && (
                  <BonALICECard
                    isNodeBonALICE={item.isNodeBonALICE}
                    title={'BonALICE #' + item.tokenId}
                    subTitle1="Amount"
                    subValue1={item.nodePower}
                    subTitle2="Tier"
                    subValue2={getTier(item.nodePower)}
                    compact
                    inverted
                  />
                )
              );
            })
          : nodeBonALICE.length === 0 && (
              <p className="text-center py-56 px-3 mt-auto mb-auto text-white">
                You have no BonPION NFTs to show. Please create Bonded PION NFT
                first.
              </p>
            )}
      </div>
    </div>
  );
};

export default RenderViewBody;
