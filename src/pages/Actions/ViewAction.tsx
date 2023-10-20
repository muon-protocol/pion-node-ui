import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { BonALICE } from '../../types';
import BonALICEViewCard from '../../components/Common/BonALICEViewCard.tsx';

const RenderViewBody = () => {
  const { bonALICEs } = useBonALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  return (
    <div className="flex flex-col w-full overflow-y-auto styled-scroll !pr-0">
      <div className="flex flex-col gap-3">
        {nodeBonALICE.length > 0 && (
          <BonALICEViewCard bonALICE={nodeBonALICE[0]} compact selected />
        )}
        {bonALICEs.length > 0
          ? bonALICEs.map((item: BonALICE) => {
              return (
                item.nodePower > 0 && (
                  <BonALICEViewCard bonALICE={item} compact inverted />
                )
              );
            })
          : nodeBonALICE.length === 0 && (
              <p className="text-center py-56 px-3 mt-auto mb-auto text-white">
                You have no bonPION NFTs to show.
              </p>
            )}
      </div>
    </div>
  );
};

export default RenderViewBody;
