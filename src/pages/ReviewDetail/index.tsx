import { upgradeModalItems } from '../../data';
import BonPIONCard from '../../components/Common/BonPIONCard.tsx';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
const ReviewDetail = () => {
  return (
    <div className="page page--review-details">
      <p className="text-2xl text-white font-light mb-20">
        Review your bonPION state before bonding it to your node
      </p>
      <ReviewDetailCard className="mb-16" />
      <TransferCard className="max-w-[536px]" />
    </div>
  );
};

const ReviewDetailCard = ({ className = '' }: { className: string }) => {
  return (
    <div
      className={`w-full bg-primary-dark pl-11 pr-9 py-8 rounded-2xl flex text-white ${className}`}
    >
      <div className="claim-card__left flex-2">
        <p className="mb-9 font-semibold text-[20px]">Bonded PION #10032</p>
        <span className="flex justify-between font-light mb-3">
          <span className="flex gap-1 min-w-[170px]">Node Power: </span>
          <span className="mr-auto">
            <span className="mr-1 font-semibold">1200</span>(
            <span className="font-medium">500</span> PION +
            <span className="font-medium"> 0</span> LP)
          </span>
        </span>
        <span className="flex justify-between font-light mb-3">
          <span className="min-w-[170px]">Tier:</span>
          <span className="font-semibold mr-auto">Pion Enhancer</span>
        </span>
        <span className="flex justify-between font-light mb-3">
          <span className="min-w-[170px]">Verification Required:</span>
          <span className="font-semibold underline mr-auto cursor-pointer">
            Aura Bronze
          </span>
        </span>
      </div>
      <div className="claim-card__right flex items-end justify-between flex-col flex-1">
        <button className="btn btn--dark-primary btn--small">
          Choose Another
        </button>
        <button
          onClick={() => {}}
          className="btn btn--secondary text-xl font-medium"
          disabled={1 !== 1}
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};

const TransferCard = ({ className = '' }: { className: string }) => {
  return (
    <div
      className={`w-full bg-card-bg-70-purple px-11 py-10 rounded-2xl flex flex-col ${className}`}
    >
      <SelectButtonWithModal
        title="Select BonPion"
        onClick={() => {}}
        isModalOpen={false}
        closeModalHandler={() => {}}
        modalTitle="Select BonPION"
      >
        <div className="flex flex-col gap-3">
          {upgradeModalItems.map((item) => {
            return (
              <BonPIONCard
                className="cursor-pointer"
                title={item.title}
                subTitle1="Node Power"
                subValue1={item.nodePower}
                subTitle2="Tier"
                subValue2={item.tier}
                onClick={() => {}}
                compact
                selected={true}
              />
            );
          })}
        </div>
      </SelectButtonWithModal>
      {/*<AddressInput value={} onValueChanged={} />*/}
      <button className="btn btn--secondary mt-5 mx-auto">Transfer</button>
    </div>
  );
};

export default ReviewDetail;
