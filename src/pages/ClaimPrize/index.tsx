import { userWallets } from '../../data/constants.ts';
import { UserWallet } from '../../types';
import Modal from '../../components/Common/Modal.tsx';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { Link } from 'react-router-dom';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import { useMemo } from 'react';
import { FadeIn } from '../../animations';

const ClaimPrize = () => {
  const { isSwitchBackToWalletModalOpen, closeSwitchBackToWalletModal } =
    useClaimPrize();

  // const { openSwitchBackToWalletModal } = useClaimPrize();

  const { rewardWallets } = useClaimPrize();

  const eligibleAddresses = useMemo(() => {
    return rewardWallets.filter(
      (wallet) =>
        wallet.hasBeenProcessed &&
        (wallet.wasInMuonPresale ||
          wallet.wasInDeusPresale ||
          wallet.wasAliceOperator ||
          wallet.wasInMuonPresale),
    );
  }, [rewardWallets]);

  return (
    <FadeIn duration={0.3} className="page page--claim-prize">
      <ConnectWalletModal redirectRoute="/get-started" />
      <p className="text-2xl font-light mb-9">
        Go to your wallet and choose the address linked to your pioneer
        activities. Repeat this step for each address associated with pioneer
        activities
      </p>
      <div className="w-full bg-primary-13 p-6 rounded-2xl flex gap-4 mb-6 min-h-[244px]">
        {eligibleAddresses.length > 0 ? (
          <span className="wallets-container flex -mx-6 px-6 gap-4 overflow-x-auto no-scrollbar">
            {userWallets.map((wallet) => (
              <VerifyWalletCard
                wallet={wallet}
                className="!min-w-[304px] scroll"
              />
            ))}
          </span>
        ) : (
          <p className="text-2xl font-light text-center w-full my-auto">
            No Eligible address detected
          </p>
        )}
      </div>
      <ClaimCard />
      <Modal
        title=""
        size="sm"
        isOpen={isSwitchBackToWalletModalOpen}
        closeModalHandler={closeSwitchBackToWalletModal}
      >
        <Link to="/review">
          <div className="pb-4 px-3 flex flex-col justify-center items-center">
            <img
              className="w-[108px] mb-10"
              src="/assets/images/claim/switch-wallet-modal-icon.svg"
              alt=""
            />
            <p className="text-center">
              To claim your bonALICE, please switch back to your Staking Address
              <br />
              <strong>(0x5a03…c7ef)</strong>
            </p>
          </div>
        </Link>
      </Modal>
    </FadeIn>
  );
};

const VerifyWalletCard = ({
  wallet,
  className,
}: {
  wallet: UserWallet;
  className?: string;
}) => {
  return (
    <div
      className={`bg-primary-dark px-[18px] pb-[18px] pt-4 rounded-2xl flex flex-col text-white ${className}`}
    >
      <span className="verify-wallet-card__header flex mb-4 justify-between items-center">
        <p className="text-lg text-white">{wallet.title}</p>
        <img
          src="/assets/images/modal/exit-white-icon.svg"
          alt=""
          className="cursor-pointer"
        />
      </span>
      <span className="reward-sources flex-col gap-2 ml-4 mb-1">
        <span className="reward-source flex gap-2">
          <img
            className="w-4"
            src="/assets/images/get-started/check-icon.svg"
            alt=""
          />
          <p className="text-white">Alice Operator</p>
        </span>
        <span className="reward-source flex gap-2">
          <img
            className="w-4"
            src="/assets/images/get-started/check-icon.svg"
            alt=""
          />
          <p className="text-white">Muon Presale</p>
        </span>
        <span className="reward-source flex gap-2">
          <img
            className="w-4"
            src="/assets/images/get-started/dash-icon.svg"
            alt=""
          />
          <p className="text-white">Deus Presale</p>
        </span>
      </span>
      {wallet.verified ? (
        <p className="mt-auto mb-3 w-full flex items-center justify-end text-sm font-medium text-green">
          VERIFIED!
        </p>
      ) : (
        <button className="btn btn--small ml-auto">Verify</button>
      )}
    </div>
  );
};

const ClaimCard = () => {
  const { openSwitchBackToWalletModal } = useClaimPrize();

  return (
    <div className="w-full bg-primary-13 pl-11 pr-9 pb-7 pt-8 rounded-2xl flex text-white">
      <div className="claim-card__left flex-1">
        <p className="mb-8 font-semibold text-[20px]">Your Bonded ALICE</p>
        <span className="flex justify-between font-light mb-3">
          <p>Staking address:</p>
          <p className="font-semibold">0x02f9…c061</p>
        </span>
        <span className="flex justify-between font-light mb-3">
          <p className="flex gap-1">
            <p className="font-semibold">1200</p>ALICE
            <img
              src="/assets/images/claim/claim-card-right-arrow-icon.svg"
              alt=""
            />
          </p>
          <p className="flex">
            <p className="font-semibold mr-1">0</p>Node Power
          </p>
        </span>
        <span className="flex justify-between font-light mb-3">
          <p>bonALICE Tier:</p>
          <p className="font-semibold">ALICE Enhancer</p>
        </span>
        <p className="flex justify-between font-light">
          <p>Potential APR:</p>
          <p className="font-semibold">15%-20%</p>
        </p>
      </div>
      <div className="claim-card__right flex flex-col items-end justify-between flex-1">
        <p className="font-medium underline text-sm cursor-pointer">
          Prize Calculation Details
        </p>
        <button
          onClick={openSwitchBackToWalletModal}
          className="btn text-xl font-medium"
          disabled={1 !== 1}
        >
          Claim
        </button>
      </div>
    </div>
  );
};

export default ClaimPrize;
