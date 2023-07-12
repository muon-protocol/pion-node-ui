import { RawRewardSection, RewardWallet } from '../../types';
import Modal from '../../components/Common/Modal.tsx';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { Link, useNavigate } from 'react-router-dom';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import { FadeIn, MoveUpIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentChainId } from '../../constants/chains.ts';
import { formatWalletAddress, w3bNumberFromNumber } from '../../utils/web3.ts';

const ClaimPrize = () => {
  const { isSwitchBackToWalletModalOpen, closeSwitchBackToWalletModal } =
    useClaimPrize();
  const { stakingAddress } = useClaimPrize();
  // const { openSwitchBackToWalletModal } = useClaimPrize();

  const { eligibleAddresses } = useClaimPrize();

  const windowHight = window.innerHeight;
  const bodyHeight = windowHight - 108 - 70;

  return (
    <div style={{ minHeight: bodyHeight }} className="page page--claim-prize">
      <FadeIn duration={0.3}>
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
                To claim your bonALICE, please switch back to your Staking
                Address
                <br />
                <strong>{formatWalletAddress(stakingAddress)}</strong>
              </p>
            </div>
          </Link>
        </Modal>
      </FadeIn>
    </div>
  );
};

const VerifyWalletCard = ({
  wallet,
  className,
}: {
  wallet: RewardWallet;
  className?: string;
}) => {
  const {
    handleVerifyWallet,
    isMetamaskLoadingVerify,
    handleRemoveWallet,
    claimSignature,
  } = useClaimPrize();
  const { walletAddress } = useUserProfile();

  return (
    <div
      className={`bg-primary-dark px-[18px] pb-[18px] pt-4 rounded-2xl flex flex-col text-white ${className}`}
    >
      <span className="verify-wallet-card__header flex mb-4 justify-between items-center">
        <p className="text-lg text-white">
          {formatWalletAddress(wallet.walletAddress)}
        </p>
        {wallet.walletAddress !== walletAddress && !claimSignature && (
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
      ) : walletAddress !== wallet.walletAddress ? (
        <button className="btn btn--small ml-auto" disabled>
          Switch Wallet
        </button>
      ) : isMetamaskLoadingVerify ? (
        <button className="btn btn--small ml-auto" disabled>
          Verifying...
        </button>
      ) : (
        <button
          className="btn btn--small ml-auto"
          onClick={() => handleVerifyWallet()}
        >
          Verify
        </button>
      )}
    </div>
  );
};

const PrizeCalculationDetailModal = () => {
  const { rawRewards } = useClaimPrize();

  return (
    <div className="text-black">
      <RewardSource source={rawRewards?.deus_presale} title="Deus Presale" />
      <RewardSource source={rawRewards?.muon_presale} title="Muon Presale" />
      <RewardSource
        source={rawRewards?.alice_operator}
        title="Alice Operator"
        subTitle="(Early stage)"
        headerDetail="20% Reward"
        detailDescription="The early stage of the Alice Operator is from 1st of July 2021 to 31st of July 2021"
      />
      <RewardSource
        source={rawRewards?.early_alice_operator}
        title="Alice Operator"
        subTitle="(Main stage)"
        headerDetail="40% Reward"
        detailDescription="The main stage of the Alice Operator is from 1st of August 2021 to 31st of August 2021"
      />
      <RewardSource
        source={rawRewards?.alice_operator_bounce}
        title="Alice Operator"
        subTitle="(Bounce stage)"
      />
    </div>
  );
};

const RewardSource = ({
  source,
  title,
  subTitle,
  headerDetail,
  detailDescription,
}: {
  source: RawRewardSection | undefined;
  title: string;
  subTitle?: string;
  headerDetail?: string;
  detailDescription?: string;
}) => {
  const [detailHovered, setDetailHovered] = useState(false);

  if (!source || !source.contributors || !source.reward) return null;

  return (
    <div className="prize-section mb-6">
      <div className="section-title mb-2 flex items-center justify-between">
        <p className="text-lg font-semibold">
          {title} <span className="text-lg font-normal">{subTitle}</span>
        </p>
        {headerDetail && (
          <div
            className="flex gap-1 cursor-pointer items-center"
            onMouseEnter={() => setDetailHovered(true)}
            onMouseLeave={() => setDetailHovered(false)}
          >
            <p className="text-sm">{headerDetail}</p>
            <img
              className="w-4 h-4"
              src="/assets/images/modal/detail-description-icon.svg"
              alt=""
            />
            {detailHovered && (
              <MoveUpIn y={5} duration={0.1} className="absolute w-60">
                <p className="p-2 bg-primary-dark font-semibold -translate-y-12 -translate-x-8 text-xs text-center rounded-lg text-white">
                  {detailDescription}
                </p>
              </MoveUpIn>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 pb-3 border-b-[1px] border-gray border-dashed">
        {source.contributors.map((contributor) => {
          if (contributor.reward > 0)
            return (
              <div className="section-description text-sm font-light flex justify-between">
                <p className="flex gap-1">
                  <span className="font-semibold">
                    &#8226; {formatWalletAddress(contributor.contributor)}
                  </span>
                  {/*Staked*/}
                  {/*<span className="font-semibold">2000</span> DEI*/}
                  <img
                    className="ml-1"
                    src="/assets/images/modal/right-arrow-icon.svg"
                    alt=""
                  />
                </p>
                <p className="flex gap-1">
                  <span className="font-semibold">
                    {w3bNumberFromNumber(contributor.reward).dsp}
                  </span>
                  ALICE
                </p>
              </div>
            );
        })}
      </div>
      <div className="flex justify-between items-center pt-2">
        <p>Total</p>
        <p className="font-semibold">
          {w3bNumberFromNumber(source.reward).dsp} ALICE
        </p>
      </div>
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
      <div className="claim-card__left flex-1">
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
