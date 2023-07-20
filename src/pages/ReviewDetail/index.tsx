import BonALICECard from '../../components/Common/BonALICECard.tsx';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import AddressInput from '../../components/Common/AddressInput.tsx';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { formatWalletAddress } from '../../utils/web3.ts';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

const ReviewDetail = () => {
  const { stakingAddress } = useClaimPrize();
  const { bonALICEs } = useBonALICE();
  const {
    setNodeIP,
    isSelectNodeBonALICEModalOpen,
    nodeBonALICE,
    setIsSelectNodeBonALICEModalOpen,
    setNodeBonALICE,
    handleAddNodeClicked,
    nodeIP,
    isMetamaskLoading,
    isTransactionLoading,
    isGettingNodeStatusLoading,
  } = useNodeBonALICE();

  const { chainId, handleSwitchNetwork } = useUserProfile();
  const reviewDetailCard = () => {
    return (
      <div className="bg-white px-10 py-9 rounded-2xl w-full">
        <div className="flex w-full gap-3 mb-7">
          <SelectButtonWithModal
            title=""
            onClick={() => setIsSelectNodeBonALICEModalOpen(true)}
            isModalOpen={isSelectNodeBonALICEModalOpen}
            closeModalHandler={() => setIsSelectNodeBonALICEModalOpen(false)}
            modalTitle="Select BonALICE"
            removeItem={() => setNodeBonALICE(null)}
            selectedItems={nodeBonALICE ? [nodeBonALICE] : []}
          >
            <div className="flex flex-col gap-3">
              {bonALICEs.map((item) => {
                return (
                  <BonALICECard
                    className="cursor-pointer"
                    title={'BonALICE #' + item.tokenId}
                    subTitle1="Node Power"
                    subValue1={item.nodePower}
                    subTitle2="Tier"
                    subValue2={'ALICE Starter (Tier 1)'}
                    onClick={() => {
                      setNodeBonALICE(item);
                      setIsSelectNodeBonALICEModalOpen(false);
                    }}
                    compact
                    selected={item.tokenId === nodeBonALICE?.tokenId}
                  />
                );
              })}
            </div>
          </SelectButtonWithModal>
          <Link to="/create">
            <button className="btn btn--secondary btn--icon-btn !h-14 !w-14">
              <img src="/assets/images/actions/upgrade-icon.svg" alt="" />
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Staking Address:</span>
            <span className="font-semibold ">
              {formatWalletAddress(stakingAddress)}
            </span>
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="flex gap-1 min-w-[170px]">Node Power: </span>
            {nodeBonALICE ? (
              <span>
                <span className="mr-1 font-semibold">
                  {nodeBonALICE.nodePower}
                </span>
                (
                <span className="font-medium">
                  {nodeBonALICE.ALICELockAmount.dsp}
                </span>{' '}
                ALICE +{' '}
                <span className="font-medium">
                  {nodeBonALICE.LPTokenLockAmount.dsp}
                </span>{' '}
                LP)
              </span>
            ) : (
              <span className="font-semibold">Select BonALICE</span>
            )}
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Tier:</span>
            <span className="font-semibold ">
              {nodeBonALICE ? 'ALICE Starter (Tier 1)' : 'Select BonALICE'}
            </span>
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Verification Required:</span>

            {nodeBonALICE ? (
              <span className="font-semibold underline  cursor-pointer">
                6 methods
              </span>
            ) : (
              <span className="font-semibold">Select BonALICE</span>
            )}
          </span>
        </div>
      </div>
    );
  };

  const transferCard = () => {
    return (
      <div
        className={`bg-white px-6 py-9 rounded-2xl flex flex-col !w-[365px] !min-w-[365px]`}
      >
        <AddressInput
          title="Node IP"
          placeholder="Enter Node IP"
          value={nodeIP}
          onValueChanged={(value) => setNodeIP(value)}
        />
        {chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn btn--secondary mt-auto mx-auto"
          >
            Switch Network
          </button>
        ) : isGettingNodeStatusLoading ? (
          <button className="btn btn--secondary mt-auto mx-auto" disabled>
            Node Status...
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button className="btn btn--secondary mt-auto mx-auto" disabled>
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : (
          <button
            className="btn btn--secondary mt-auto mx-auto"
            onClick={() => handleAddNodeClicked()}
            disabled={!nodeIP || !nodeBonALICE}
          >
            Add Node
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="page page--review-details">
      <FadeIn duration={0.1} delay={0.1}>
        <div
          className={`content flex flex-col gap-9 justify-center items-center h-full`}
        >
          <div className="review-details--top flex gap-9">
            <p className="text-2xl font-light w-full">
              Review your bonPION details closely. When you're ready, enter the
              node IP to complete the setup.
            </p>
            <NotificationCard className="!w-[365px] !min-w-[365px]" />
          </div>
          <div className="review-details--bottom flex gap-9 w-full">
            {reviewDetailCard()}
            {transferCard()}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

const NotificationCard = ({ className }: { className: ReactNode }) => {
  return (
    <div
      className={`bg-pacific-blue-20 rounded-xl flex gap-6 py-5 px-6 items-center ${className}`}
    >
      <img src="/assets/images/review/info-icon.svg" alt="" />
      <p className="leading-5">
        Your node will be activated once you've successfully completed the
        uniqueness verification process in your dashboard
      </p>
    </div>
  );
};

export default ReviewDetail;
