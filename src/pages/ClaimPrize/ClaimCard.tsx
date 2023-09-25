import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatWalletAddress } from '../../utils/web3.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import Modal from '../../components/Common/Modal.tsx';
import { PrizeCalculationDetailModal } from './PrizeCalculationDetailModal.tsx';
import ConfirmClaimModal from './ConfirmClaimModal.tsx';
import useUserClaimedReward from '../../hooks/useUserClaimedReward.ts';
import { FadeIn } from '../../animations';

const ClaimCard = () => {
  const { totalRewards, stakingAddress } = useClaimPrize();
  const {
    eligibleAddresses,
    isMetamaskLoading,
    isTransactionLoading,
    isSuccess,
    alreadyClaimedPrize,
    setAlreadyClaimedPrize,
    stakingAddressFromPast,
    totalRewardFromPast,
    claimSignatureFromPast,
    handleClaimRewardsFromPastClicked,
    handleClaimRewardsClicked,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    rewardWalletsFromPast,
    rawRewards,
    rawRewardsFromPast,
  } = useClaimPrize();
  const { chainId, handleSwitchNetwork } = useUserProfile();

  const [
    isPrizeCalculationDetailModalOpen,
    setIsPrizeCalculationDetailModalOpen,
  ] = useState(false);

  const isClaimButtonDisabled = useMemo(() => {
    return (
      rawRewardsFromPast?.uniquenessVerified === false ||
      rawRewards?.uniquenessVerified === false ||
      (!stakingAddressFromPast &&
        (eligibleAddresses.length === 0 ||
          eligibleAddresses.some((wallet) => !wallet.signature)))
    );
  }, [
    eligibleAddresses,
    stakingAddressFromPast,
    rawRewards,
    rawRewardsFromPast,
  ]);

  const { userClaimedReward } = useUserClaimedReward();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || alreadyClaimedPrize) {
      navigate('/review');
      setAlreadyClaimedPrize(false);
    }
  }, [isSuccess, navigate, alreadyClaimedPrize, setAlreadyClaimedPrize]);

  return (
    <div className="w-full bg-primary-13 px-6 py-6 md:pl-11 md:pr-9 md:pb-7 md:pt-8 rounded-2xl flex flex-col md:flex-row text-white">
      <div className="claim-card__left flex-[4] mb-6 md:mb-0 max-md:text-sm">
        <p className="mb-8 font-semibold text-[20px]">Your Bonded ALICE</p>
        <span className="flex font-light mb-2">
          <p className="w-[143px] text-left">Staking address:</p>
          <p className="font-medium">
            {stakingAddressFromPast
              ? formatWalletAddress(stakingAddressFromPast)
              : stakingAddress
              ? formatWalletAddress(stakingAddress)
              : 'Connect eligible wallet'}
          </p>
        </span>
        <span className="flex font-light">
          <div className="flex gap-1 text-black w-[143px] text-left">
            {/*<p className="font-medium">*/}
            {/*  {stakingAddressFromPast*/}
            {/*    ? totalRewardFromPast.dsp*/}
            {/*    : totalRewards.dsp}*/}
            {/*</p>*/}
            Value:
            {/*<img*/}
            {/*  src="/assets/images/claim/claim-card-right-arrow-icon.svg"*/}
            {/*  alt=""*/}
            {/*/>*/}
          </div>
          <div className="flex text-black font-medium">
            <p className="mr-1">
              {stakingAddressFromPast
                ? totalRewardFromPast.dsp
                : totalRewards.dsp}
            </p>
            ALICE
          </div>
        </span>
        {/*<span className="flex justify-between font-light">*/}
        {/*  <p>bonALICE Tier:</p>*/}
        {/*  <p className="font-semibold">*/}
        {/*    {stakingAddressFromPast || eligibleAddresses.length > 0*/}
        {/*      ? getTier(*/}
        {/*          stakingAddressFromPast*/}
        {/*            ? totalRewardFromPast.dsp*/}
        {/*            : totalRewards.dsp,*/}
        {/*        )*/}
        {/*      : 'No eligible wallet'}*/}
        {/*  </p>*/}
        {/*</span>*/}
        {/*<div className="flex justify-between font-light text-black">*/}
        {/*  <p>Potential APR:</p>*/}
        {/*  <p className="font-semibold">*/}
        {/*    {stakingAddressFromPast || eligibleAddresses.length > 0*/}
        {/*      ? '10%-15%'*/}
        {/*      : 'No eligible wallet'}*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
      <div className="claim-card__right flex flex-col items-end justify-between flex-[3] gap-4">
        {eligibleAddresses.length > 0 || rewardWalletsFromPast.length > 0 ? (
          <>
            {/*<p*/}
            {/*  onClick={() => setIsPrizeCalculationDetailModalOpen(true)}*/}
            {/*  className="font-medium underline text-sm cursor-pointer"*/}
            {/*>*/}
            {/*  Prize Calculation Details*/}
            {/*</p>*/}
          </>
        ) : (
          <></>
        )}
        <FadeIn
          duration={0.1}
          delay={0.1}
          className="mt-auto max-md:!w-full text-xl font-medium !min-w-[180px] ml-auto"
        >
          {chainId !== getCurrentChainId() ? (
            <button
              onClick={() => handleSwitchNetwork(getCurrentChainId())}
              className="btn md:ml-auto max-md:!w-full !px-6"
            >
              Switch Network
            </button>
          ) : userClaimedReward[0] > BigInt(0) ? (
            <button
              onClick={() => navigate('/review')}
              className="btn md:ml-auto max-md:!w-full !px-10"
            >
              Create Node
            </button>
          ) : isMetamaskLoading || isTransactionLoading ? (
            <button className="btn md:ml-auto max-md:!w-full !px-6" disabled>
              {isMetamaskLoading ? 'Metamask...' : 'Transaction...'}
            </button>
          ) : claimSignatureFromPast ? (
            <button
              onClick={() => handleClaimRewardsFromPastClicked()}
              className="btn md:ml-auto max-md:!w-full"
            >
              Claim
            </button>
          ) : (
            <button
              onClick={() => handleClaimRewardsClicked()}
              className="btn md:ml-auto max-md:!w-full"
              disabled={isClaimButtonDisabled}
            >
              Claim
            </button>
          )}
        </FadeIn>
      </div>
      <Modal
        size="lg"
        closeModalHandler={() => setIsPrizeCalculationDetailModalOpen(false)}
        isOpen={isPrizeCalculationDetailModalOpen}
      >
        <PrizeCalculationDetailModal />
      </Modal>
      <Modal
        size="sm"
        isOpen={isConfirmModalOpen}
        closeModalHandler={() => setIsConfirmModalOpen(false)}
      >
        <ConfirmClaimModal />
      </Modal>
    </div>
  );
};

export default ClaimCard;
