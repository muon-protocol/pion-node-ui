import Modal from '../../components/Common/Modal.tsx';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { formatWalletAddress } from '../../utils/web3.ts';
import { VerifyWalletCard } from './VerifyWalletCard.tsx';
import Alert from '../../components/Common/Alert.tsx';
import SwitchBackToWalletModal from './SwitchBackToWalletModal.tsx';
import ClaimCard from './ClaimCard.tsx';
import useUserClaimedReward from '../../hooks/useUserClaimedReward.ts';
import ClaimedRewardModal from './ClaimedRewardModal.tsx';
import InsufficientNFTAmoutModalBody from '../../components/Common/InsufficientNFTAmoutModalBody.tsx';
import NewWalletModal from './NewWalletModal.tsx';

const ClaimPrize = () => {
  const {
    isSwitchBackToWalletModalOpen,
    alreadyRegisteredWallet,
    closeSwitchBackToWalletModal,
    stakingAddressFromPast,
    eligibleAddresses,
    rewardWalletsFromPast,
    rawRewards,
    rawRewardsFromPast,
    isInsufficientModalOpen,
    setIsInsufficientModalOpen,
    setIsSufficientModalOpen,
    isSufficientModalOpen,
    setIsNewWalletModalOpen,
    isNewWalletModalOpen,
  } = useClaimPrize();
  const { walletAddress } = useUserProfile();
  const { userClaimedReward } = useUserClaimedReward();
  // const { stakerAddressInfo } = useNodeBonALICE();

  // useEffect(() => {
  // if (stakerAddressInfo?.active) {
  //   window.open('/dashboard/', '_self');
  // }
  // }, [stakerAddressInfo]);

  return (
    <div className="page__bg">
      <div className="page page--claim-prize">
        <FadeIn duration={0.3} className="w-full">
          <ConnectWalletModal redirectRoute="/get-started" />
          <div className="w-full flex items-center justify-center gap-4 mb-8">
            <img
              src="/assets/images/claim/node-drop-icon.svg"
              alt=""
              className="w-12 h-12"
            />
            <p className="text-5xl font-bold">PION Node-Drop</p>
          </div>
          <p className="text-lg text-center md:text-left md:text-xl font-light mb-1.5">
            Alice node operators and Muon presale participants are eligible for
            the PION Node-Drop. <br />
          </p>
          <p className="text-lg text-center md:text-left md:text-xl font-light mb-6">
            1. Connect your eligible addresses <br />
            2. Claim your bonPION <br />
            3. Wait for October 18th to run your node and start earning reward
          </p>
          <Alert
            className="mb-6"
            show={!stakingAddressFromPast && userClaimedReward[0] > BigInt(0)}
            type="success"
          >
            You have already claimed your reward under{' '}
            <p className="font-semibold inline">
              {' '}
              bonPION #{userClaimedReward[1].toString()}
            </p>
            .
          </Alert>
          <Alert
            className="mb-6"
            show={
              !!stakingAddressFromPast && userClaimedReward[0] === BigInt(0)
            }
            type="error"
          >
            You have a signature for this address{' '}
            <p className="font-semibold inline">
              ({formatWalletAddress(stakingAddressFromPast)})
            </p>{' '}
            with the following information. Please claim them if you haven't
            already.
          </Alert>
          <Alert
            className="mb-6"
            show={
              !rawRewardsFromPast &&
              userClaimedReward[0] === BigInt(0) &&
              rawRewards?.uniquenessVerified === false &&
              eligibleAddresses.length > 0
            }
            type="error"
          >
            None of the provided operator node addresses have passed uniqueness
            verification.
          </Alert>
          <Alert
            className="mb-6"
            show={!!stakingAddressFromPast && userClaimedReward[0] > BigInt(0)}
            type="success"
          >
            You have claimed the rewards for this address{' '}
            <p className="font-semibold inline">
              ({formatWalletAddress(stakingAddressFromPast)})
            </p>{' '}
            under bonPION #{userClaimedReward[1].toString()}. You can setup your
            node using your bonPION on October 18th.
          </Alert>
          <Alert
            show={!!alreadyRegisteredWallet?.isAlreadyRegistered}
            type="error"
            className="mb-6"
          >
            <strong>{formatWalletAddress(walletAddress)} </strong>
            has been already registered with{' '}
            <strong>{alreadyRegisteredWallet?.registeredTo}</strong>.
          </Alert>
          <div className="reward-wallets-section w-full bg-gray-bg-70 p-6 rounded-2xl flex gap-4 mb-6 min-h-[244px]">
            {!stakingAddressFromPast && userClaimedReward[0] > BigInt(0) ? (
              <p className="text-2xl font-light text-center w-full my-auto">
                No Eligible address detected
              </p>
            ) : rewardWalletsFromPast.length > 0 ? (
              <span
                className="wallets-container flex -mx-6 px-6 gap-4 overflow-x-auto no-scrollbar"
                onWheel={(event) => {
                  event.preventDefault();
                  event.currentTarget.scrollLeft += event.deltaY;
                }}
              >
                {rewardWalletsFromPast.map((wallet) => (
                  <VerifyWalletCard
                    wallet={wallet}
                    disabled
                    className="!min-w-[304px] scroll"
                    key={wallet.walletAddress}
                  />
                ))}
              </span>
            ) : eligibleAddresses.length > 0 ? (
              <span
                className="wallets-container flex -mx-6 px-6 gap-4 overflow-x-auto no-scrollbar"
                onWheel={(event) => {
                  event.preventDefault();
                  event.currentTarget.scrollLeft += event.deltaY;
                }}
              >
                {eligibleAddresses.map((wallet) => (
                  <VerifyWalletCard
                    wallet={wallet}
                    className="!min-w-[307px] scroll"
                  />
                ))}
                <div
                  className="add-new-wallet-card border-2 rounded-xl border-titan-white min-w-[184px] flex flex-col items-center justify-center gap-6 h-full hover:bg-card-hover transition-all cursor-pointer"
                  onClick={() => setIsNewWalletModalOpen(true)}
                >
                  <img
                    src="/assets/images/claim/add-wallet-icon.svg"
                    alt=""
                    className="w-16 h-16"
                  />
                  <p className="font-medium text-white text-center">
                    Add New Address
                  </p>
                </div>
              </span>
            ) : (
              <p className="text-2xl font-light text-center w-full my-auto">
                No Eligible address detected
              </p>
            )}
          </div>
          <ClaimCard />
        </FadeIn>
        <Modal
          size="sm"
          isOpen={isSwitchBackToWalletModalOpen}
          closeModalHandler={closeSwitchBackToWalletModal}
        >
          <SwitchBackToWalletModal />
        </Modal>
        <Modal
          size="sm"
          closeable={false}
          isOpen={isInsufficientModalOpen}
          closeModalHandler={() => setIsInsufficientModalOpen(false)}
        >
          <InsufficientNFTAmoutModalBody operation="claimed" />
        </Modal>
        <Modal
          size="sm"
          closeable={false}
          isOpen={isSufficientModalOpen}
          closeModalHandler={() => setIsSufficientModalOpen(false)}
        >
          <ClaimedRewardModal operation="claimed" />
        </Modal>
        <Modal
          size="sm"
          isOpen={isNewWalletModalOpen}
          closeModalHandler={() => setIsNewWalletModalOpen(false)}
        >
          <NewWalletModal />
        </Modal>
      </div>
    </div>
  );
};

export default ClaimPrize;
