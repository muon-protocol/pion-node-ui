import Modal from '../../components/Common/Modal.tsx';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { Link, useNavigate } from 'react-router-dom';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentChainId } from '../../constants/chains.ts';
import { formatWalletAddress } from '../../utils/web3.ts';
import { PrizeCalculationDetailModal } from './PrizeCalculationDetailModal.tsx';
import { VerifyWalletCard } from './VerifyWalletCard.tsx';

const ClaimPrize = () => {
  const { isSwitchBackToWalletModalOpen, closeSwitchBackToWalletModal } =
    useClaimPrize();
  const { stakingAddress } = useClaimPrize();
  const { stakingAddressFromPast, rewardWalletsFromPast } = useClaimPrize();

  const { eligibleAddresses } = useClaimPrize();

  const windowHight = window.innerHeight;
  const bodyHeight = windowHight - 108 - 70;

  return (
    <div style={{ minHeight: bodyHeight }} className="page page--claim-prize">
      <FadeIn duration={0.3} className="w-full">
        <ConnectWalletModal redirectRoute="/get-started" />
        <p className="text-2xl font-light mb-9">
          Go to your wallet and choose the address linked to your pioneer
          activities. Repeat this step for each address associated with pioneer
          activities
        </p>
        {stakingAddressFromPast && (
          <div
            className={`bg-pacific-blue-20 rounded-xl flex gap-6 py-5 px-6 items-center mb-2`}
          >
            <img src="/assets/images/review/info-icon.svg" alt="" />
            <p className="leading-5">
              You have already a signature for this address with the following
              bonALICEs. Please claim them if you haven't already.
            </p>
          </div>
        )}
        <div className="w-full bg-primary-13 p-6 rounded-2xl flex gap-4 mb-6 min-h-[244px]">
          {rewardWalletsFromPast.length > 0 ? (
            <span className="wallets-container flex -mx-6 px-6 gap-4 overflow-x-auto no-scrollbar">
              {rewardWalletsFromPast.map((wallet) => (
                <VerifyWalletCard
                  wallet={wallet}
                  disabled
                  className="!min-w-[304px] scroll"
                />
              ))}
            </span>
          ) : eligibleAddresses.length > 0 ? (
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
                To claim your bonALICE, please switch back to your Staking
                Address
                <br />
                <strong>
                  {stakingAddressFromPast
                    ? formatWalletAddress(stakingAddressFromPast)
                    : formatWalletAddress(stakingAddress)}
                </strong>
              </p>
            </div>
          </Link>
        </Modal>
      </FadeIn>
    </div>
  );
};

const ClaimCard = () => {
  const { getClaimSignature } = useClaimPrize();
  const { totalRewards, stakingAddress } = useClaimPrize();
  const { walletAddress } = useUserProfile();
  const {
    eligibleAddresses,
    isMetamaskLoading,
    isTransactionLoading,
    isSuccess,
    alreadyClaimedPrize,
    setAlreadyClaimedPrize,
  } = useClaimPrize();
  const { chainId, handleSwitchNetwork } = useUserProfile();
  const [
    isPrizeCalculationDetailModalOpen,
    setIsPrizeCalculationDetailModalOpen,
  ] = useState(false);

  const isClaimButtonDisabled = useMemo(() => {
    return (
      eligibleAddresses.length === 0 ||
      eligibleAddresses.some((wallet) => !wallet.signature)
    );
  }, [eligibleAddresses]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || alreadyClaimedPrize) {
      navigate('/review');
      setAlreadyClaimedPrize(false);
    }
  }, [isSuccess, navigate, alreadyClaimedPrize, setAlreadyClaimedPrize]);

  return (
    <div className="w-full bg-primary-13 pl-11 pr-9 pb-7 pt-8 rounded-2xl flex text-white">
      <div className="claim-card__left flex-[4]">
        <p className="mb-8 font-semibold text-[20px]">Your Bonded ALICE</p>
        <span className="flex justify-between font-light mb-3">
          <p>Staking address:</p>
          <p className="font-semibold">
            {walletAddress
              ? formatWalletAddress(stakingAddress)
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
            Power
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
      <div className="claim-card__right flex flex-col items-end justify-between flex-[3]">
        <p
          onClick={() => setIsPrizeCalculationDetailModalOpen(true)}
          className="font-medium underline text-sm cursor-pointer"
        >
          {eligibleAddresses.length > 0 && 'Prize Calculation Details'}
        </p>
        {chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn text-xl font-medium"
          >
            Switch Network
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button className="btn text-xl font-medium" disabled>
            {isMetamaskLoading ? 'Metamask...' : 'Transaction...'}
          </button>
        ) : (
          <button
            onClick={() => getClaimSignature()}
            className="btn text-xl font-medium"
            disabled={isClaimButtonDisabled}
          >
            Claim
          </button>
        )}
      </div>
      <Modal
        title=""
        size="lg"
        closeModalHandler={() => setIsPrizeCalculationDetailModalOpen(false)}
        isOpen={isPrizeCalculationDetailModalOpen}
      >
        <PrizeCalculationDetailModal />
      </Modal>
    </div>
  );
};

export default ClaimPrize;
