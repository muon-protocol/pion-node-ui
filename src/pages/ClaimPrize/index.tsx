import { userWallets } from '../../data/constants.ts';
import { UserWallet } from '../../types';

const ClaimPrize = () => {
  return (
    <div className="page page--claim-prize">
      <p className="text-2xl font-light text-white mb-9">
        Go to your wallet and choose the address linked to your pioneer
        activities. Repeat this step for each address associated with pioneer
        activities
      </p>
      <div className="w-full bg-card-bg-70-purple p-6 rounded-2xl flex gap-4 mb-6 min-h-[244px]">
        {1 === 1 ? (
          <p className="text-2xl text-white font-light text-center w-full my-auto">
            No Eligible address detected
          </p>
        ) : (
          userWallets.map((wallet) => <VerifyWalletCard wallet={wallet} />)
        )}
      </div>
      <ClaimCard />
    </div>
  );
};

const VerifyWalletCard = ({ wallet }: { wallet: UserWallet }) => {
  return (
    <div className="bg-primary-dark px-6 pb-5 py-3.5 rounded-2xl flex flex-col text-white text-center">
      <p className="mb-6 text-center text-lg">{wallet.title}</p>
      <p className="mb-2.5 text-sm font-medium">
        {wallet.address.slice(0, 5) + '...' + wallet.address.slice(-5, -1)}
      </p>
      <p className="mb-6 text-sm font-semibold">{wallet.balance}</p>
      {wallet.verified ? (
        <p className="h-9 w-full flex items-center justify-center text-sm font-medium text-green">
          VERIFIED!
        </p>
      ) : (
        <button className="btn btn--secondary btn--small !w-full">
          Verify
        </button>
      )}
    </div>
  );
};

const ClaimCard = () => {
  return (
    <div className="w-full bg-primary-dark pl-11 pr-9 py-8 rounded-2xl flex text-white">
      <div className="claim-card__left flex-1">
        <p className="mb-9 font-semibold text-[20px]">Your Bonded PION</p>
        <span className="flex justify-between font-light mb-3">
          <span className="flex gap-1">
            <span className="font-semibold">1200</span>PION
            <img src="/assets/images/claim/claim-card-right-arrow.svg" alt="" />
          </span>
          <span>
            <span className="font-semibold mr-1">0</span>Node Power
          </span>
        </span>
        <span className="flex justify-between font-light mb-3">
          <span>bonPION Tier:</span>
          <span className="font-semibold">Pion Enhancer</span>
        </span>
        <span className="flex justify-between font-light mb-3">
          <span>Potential APR:</span>
          <span className="font-semibold">15%-20%</span>
        </span>
      </div>
      <div className="claim-card__right flex items-end justify-end flex-1">
        <button
          className="btn btn--secondary text-xl font-medium"
          disabled={1 === 1}
        >
          Claim
        </button>
      </div>
    </div>
  );
};

export default ClaimPrize;
