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

const ClaimPrize = () => {
  const {
    isSwitchBackToWalletModalOpen,
    alreadyRegisteredWallet,
    closeSwitchBackToWalletModal,
    stakingAddressFromPast,
    eligibleAddresses,
    rewardWalletsFromPast,
  } = useClaimPrize();
  const { walletAddress } = useUserProfile();

  return (
    <div className="page page--claim-prize">
      <FadeIn duration={0.3} className="w-full">
        <ConnectWalletModal redirectRoute="/get-started" />
        <p className="text-2xl font-light mb-5">
          Go to your wallet and choose the address linked to your pioneer
          activities. Repeat this step for each address associated with pioneer
          activities.
        </p>

        <Alert show={!!stakingAddressFromPast} type="info">
          You have a signature for this address{' '}
          <strong>({formatWalletAddress(stakingAddressFromPast)})</strong> with
          the following information. Please claim them if you haven't already.
        </Alert>
        <Alert
          show={!!alreadyRegisteredWallet?.isAlreadyRegistered}
          type="error"
        >
          <strong>{formatWalletAddress(walletAddress)} </strong>
          has been already registered with{' '}
          <strong>{alreadyRegisteredWallet?.registeredTo}</strong>.
        </Alert>
        <div className="reward-wallets-section w-full bg-primary-13 p-6 rounded-2xl flex gap-4 mb-6 min-h-[244px] mt-4">
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
      </FadeIn>
      <Modal
        size="sm"
        isOpen={isSwitchBackToWalletModalOpen}
        closeModalHandler={closeSwitchBackToWalletModal}
      >
        <SwitchBackToWalletModal />
      </Modal>
    </div>
  );
};

export default ClaimPrize;
