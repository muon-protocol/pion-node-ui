import { RewardWallet } from '../../types';
import Modal from '../../components/Common/Modal.tsx';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { Link } from 'react-router-dom';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useMemo } from 'react';

const ClaimPrize = () => {
  const { isSwitchBackToWalletModalOpen, closeSwitchBackToWalletModal } =
    useClaimPrize();
  const { stakingAddress } = useClaimPrize();
  // const { openSwitchBackToWalletModal } = useClaimPrize();

  const { eligibleAddresses } = useClaimPrize();

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
            {eligibleAddresses.map((wallet) => (
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
              <strong>
                {stakingAddress?.slice(0, 6) +
                  '...' +
                  stakingAddress?.slice(-5, -1)}
              </strong>
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
  wallet: RewardWallet;
  className?: string;
}) => {
  const { handleVerifyWallet, handleRemoveWallet } = useClaimPrize();
  const { walletAddress } = useUserProfile();

  return (
    <div
      className={`bg-primary-dark px-[18px] pb-[18px] pt-4 rounded-2xl flex flex-col text-white ${className}`}
    >
      <span className="verify-wallet-card__header flex mb-4 justify-between items-center">
        <p className="text-lg text-white">
          {wallet.walletAddress.slice(0, 6) +
            '...' +
            wallet.walletAddress.slice(-5, -1)}
        </p>
        {wallet.walletAddress !== walletAddress && (
          <img
            onClick={() => handleRemoveWallet(wallet.walletAddress)}
            src="/assets/images/modal/exit-white-icon.svg"
            alt=""
            className="cursor-pointer"
          />
        )}
      </span>
      <span className="reward-sources flex-col gap-2 ml-4 mb-1">
        <span className="reward-source flex gap-2">
          <img
            className="w-4"
            src={`/assets/images/get-started/${
              wallet.wasAliceOperatorEarly || wallet.wasAliceOperator
                ? 'check-icon.svg'
                : 'dash-icon.svg'
            }`}
            alt=""
          />
          <p className="text-white">Alice Operator</p>
        </span>
        <span className="reward-source flex gap-2">
          <img
            className="w-4"
            src={`/assets/images/get-started/${
              wallet.wasInMuonPresale ? 'check-icon.svg' : 'dash-icon.svg'
            }`}
            alt=""
          />
          <p className="text-white">Muon Presale</p>
        </span>
        <span className="reward-source flex gap-2">
          <img
            className="w-4"
            src={`/assets/images/get-started/${
              wallet.wasInDeusPresale ? 'check-icon.svg' : 'dash-icon.svg'
            }`}
            alt=""
          />
          <p className="text-white">Deus Presale</p>
        </span>
      </span>
      {wallet.signature ? (
        <p className="mt-auto mb-3 w-full flex items-center justify-end text-sm font-medium text-green">
          VERIFIED!
        </p>
      ) : walletAddress === wallet.walletAddress ? (
        <button
          className="btn btn--small ml-auto"
          onClick={() => handleVerifyWallet()}
        >
          Verify
        </button>
      ) : (
        <button className="btn btn--small ml-auto" disabled>
          Switch Wallet
        </button>
      )}
    </div>
  );
};

const ClaimCard = () => {
  const { getClaimSignature } = useClaimPrize();
  const { totalRewards, stakingAddress } = useClaimPrize();
  const { walletAddress } = useUserProfile();
  const { eligibleAddresses } = useClaimPrize();

  const isClaimButtonDisabled = useMemo(() => {
    return (
      eligibleAddresses.length === 0 ||
      eligibleAddresses.some((wallet) => !wallet.signature)
    );
  }, [eligibleAddresses]);

  return (
    <div className="w-full bg-primary-13 pl-11 pr-9 pb-7 pt-8 rounded-2xl flex text-white">
      <div className="claim-card__left flex-1">
        <p className="mb-8 font-semibold text-[20px]">Your Bonded ALICE</p>
        <span className="flex justify-between font-light mb-3">
          <p>Staking address:</p>
          <p className="font-semibold">
            {walletAddress
              ? stakingAddress?.slice(0, 6) +
                '...' +
                stakingAddress?.slice(-5, -1)
              : 'connect wallet'}
          </p>
        </span>
        <span className="flex justify-between font-light mb-3">
          <p className="flex gap-1">
            <p className="font-semibold">{totalRewards.dsp}</p>
            ALICE
            <img
              src="/assets/images/claim/claim-card-right-arrow-icon.svg"
              alt=""
            />
          </p>
          <p className="flex">
            <p className="font-semibold mr-1">{totalRewards.dsp}</p>
            Node Power
          </p>
        </span>
        <span className="flex justify-between font-light mb-3">
          <p>bonALICE Tier:</p>
          <p className="font-semibold">
            {eligibleAddresses.length > 0
              ? 'ALICE Starter'
              : 'No eligible wallet'}
          </p>
        </span>
        <p className="flex justify-between font-light">
          <p>Potential APR:</p>
          <p className="font-semibold">
            {eligibleAddresses.length > 0 ? '10%-15%' : 'No eligible wallet'}
          </p>
        </p>
      </div>
      <div className="claim-card__right flex flex-col items-end justify-between flex-1">
        <p className="font-medium underline text-sm cursor-pointer">
          {eligibleAddresses.length !== 0 && 'Prize Calculation Details'}
        </p>
        <button
          onClick={() => getClaimSignature()}
          className="btn text-xl font-medium"
          disabled={isClaimButtonDisabled}
        >
          Claim
        </button>
      </div>
    </div>
  );
};

export default ClaimPrize;
