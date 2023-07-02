import BonALICECard from '../../components/Common/BonALICECard.tsx';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import AddressInput from '../../components/Common/AddressInput.tsx';

const ReviewDetail = () => {
  const windowHight = window.innerHeight;
  const bodyHeight = windowHight - 108 - 70;

  return (
    <div
      style={{ minHeight: bodyHeight }}
      className={`page page--review-details`}
    >
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
            <ReviewDetailCard className="" />
            <TransferCard className="!w-[365px] !min-w-[365px]" />
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

const ReviewDetailCard = ({ className = '' }: { className: string }) => {
  const { bonALICEs } = useBonALICE();

  return (
    <div className={`bg-white px-10 py-9 rounded-2xl w-full ${className}`}>
      <div className="flex w-full gap-3 mb-7">
        <SelectButtonWithModal
          title=""
          onClick={() => {}}
          isModalOpen={false}
          closeModalHandler={() => {}}
          modalTitle="Select BonALICE"
          removeItem={() => {}}
          selectedItems={[]}
        >
          <div className="flex flex-col gap-3">
            {bonALICEs.map((item) => {
              return (
                <BonALICECard
                  className="cursor-pointer"
                  title={'BonALICE #' + item.tokenId}
                  subTitle1="Node Power"
                  subValue1={1200}
                  subTitle2="Tier"
                  subValue2={'ALICE Starter (Tier 1)'}
                  onClick={() => {}}
                  compact
                  selected={true}
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
          <span className="font-semibold ">0x5a03...C7ef</span>
        </span>
        <span className="flex w-full justify-between leading-5 font-light">
          <span className="flex gap-1 min-w-[170px]">Node Power: </span>
          <span>
            <span className="mr-1 font-semibold">1200</span>(
            <span className="font-medium">500</span> ALICE +
            <span className="font-medium"> 0</span> LP)
          </span>
        </span>
        <span className="flex w-full justify-between leading-5 font-light">
          <span className="min-w-[170px]">Tier:</span>
          <span className="font-semibold ">ALICE Starter</span>
        </span>
        <span className="flex w-full justify-between leading-5 font-light">
          <span className="min-w-[170px]">Verification Required:</span>
          <span className="font-semibold underline  cursor-pointer">
            6 Methods
          </span>
        </span>
      </div>
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

const TransferCard = ({ className = '' }: { className: string }) => {
  return (
    <div
      className={`w-full bg-white px-6 py-9 rounded-2xl flex flex-col ${className}`}
    >
      <AddressInput
        title="Node IP"
        placeholder="Enter Node IP"
        value={''}
        onValueChanged={() => {}}
      />
      <button className="btn btn--secondary mt-auto mx-auto">Add Node</button>
    </div>
  );
};

export default ReviewDetail;
