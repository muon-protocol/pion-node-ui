import { FC } from 'react';
import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
import { useNavigate } from 'react-router-dom';
import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import { BonALICE } from '../../types';
import useMergeAction from '../../contexts/MergeAction/useMergeAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';

const BonALICEViewCard: FC<{
  bonALICE: BonALICE;
  className?: string;
  onClick?: () => void;
  compact?: boolean;
  selected?: boolean;
  inverted?: boolean;
}> = ({ bonALICE, className, onClick, compact, selected, inverted }) => {
  const { ALICEPrice } = useTokenPrice();
  const navigate = useNavigate();
  const { setUpgradeModalSelectedBonALICE } = useUpgradeAction();
  const { setMergeModalSelectedBonALICEs } = useMergeAction();
  const { bonALICEs } = useBonALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  return (
    <div
      onClick={() => onClick && onClick()}
      className={`new-bounded-ALICE-card rounded-2xl p-[18px] flex-1 bg-primary-card flex flex-col gap-6
        ${className} ${
        !inverted
          ? selected
            ? 'bg-primary-dark text-gray10'
            : onClick
            ? 'bg-primary-10-solid text-black hover:bg-primary-dark-500'
            : 'bg-primary-10-solid text-black'
          : 'bg-so-dark-gray-2 text-white'
      }`}
    >
      <div
        className={`text-inherit font-semibold flex w-full justify-between gap-1.5 items-center ${
          compact ? 'md:mb-3' : 'mb-4 md:mb-6'
        } 
        `}
      >
        <p className="text-inherit flex">
          <img src="/assets/images/pion-nft-logo.svg" className="mr-2" alt="" />{' '}
          Bonded PION {bonALICE.isNodeBonALICE && '(Active Node)'}
        </p>
        <p className="text-inherit font-medium font-tomorrow flex gap-1">
          <img src="/assets/images/hashtag.svg" alt="" />{' '}
          {bonALICE.tokenId.toString()}
        </p>
      </div>
      <div className="flex justify-between">
        <span className="flex flex-col">
          <p className="text-inherit font-light text-sm">Amount:</p>
          <div className="flex gap-0.5 items-end">
            <p className="text-inherit text-[20px] -mb-[3px]">
              {bonALICE.nodePower}
            </p>
            {ALICEPrice && (
              <p className="text-inherit font-bold">
                (${(ALICEPrice * Number(bonALICE.nodePower)).toFixed(2)})
              </p>
            )}
          </div>
        </span>
        <span className="text-sm flex gap-3 items-end">
          <button
            className="btn btn--white !h-9 btn--small--with-icon"
            onClick={() => {
              setUpgradeModalSelectedBonALICE(bonALICE);
              navigate('/pion/bonPION/increase');
            }}
          >
            <img
              src="/assets/images/actions/upgrade-primary-icon.svg"
              alt=""
              className="mr-2.5 h-5"
            />
            increase
          </button>
          {bonALICEs.length + nodeBonALICE.length > 1 && (
            <button
              className="btn btn--white !h-9 btn--small--with-icon"
              onClick={() => {
                setMergeModalSelectedBonALICEs([bonALICE]);
                navigate('/pion/bonPION/merge');
              }}
            >
              <img
                src="/assets/images/actions/merge-primary-icon.svg"
                alt=""
                className="mr-2.5 h-5"
              />
              merge
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default BonALICEViewCard;
