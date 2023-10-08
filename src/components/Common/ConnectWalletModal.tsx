import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import Modal from './Modal.tsx';
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

export const ConnectWalletModal = ({
  redirectRoute,
}: {
  redirectRoute?: string;
}) => {
  const { walletAddress } = useUserProfile();
  const navigate = useNavigate();

  return (
    <Modal
      closeModalHandler={() => navigate(redirectRoute || '/')}
      isOpen={!walletAddress}
      size="sm"
    >
      <div className="pb-4 px-3 flex flex-col justify-center items-center">
        <img
          className="w-22 mb-12"
          src="/assets/images/modal/connect-wallet-modal-icon.svg"
          alt=""
        />
        <p className="text-center mb-6 text-black">
          please connect your wallet to continue.
        </p>
        <ConnectWalletButton size="md" />
      </div>
    </Modal>
  );
};
