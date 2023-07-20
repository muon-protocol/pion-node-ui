import { formatWalletAddress } from '../../utils/web3.ts';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';

const ConfirmClaimModal = () => {
  const { stakingAddress, handleConfirmClaimClicked } = useClaimPrize();

  return (
    <div className="pb-2 px-2 flex flex-col justify-center items-center">
      <img
        className="w-[108px] mb-10"
        src="/assets/images/claim/switch-wallet-modal-icon.svg"
        alt=""
      />
      <p className="text-center mb-5">
        Be aware that if you press confirm button, you will be only able to
        claim your reward on the staking address{' '}
        <strong>({formatWalletAddress(stakingAddress)})</strong>.
      </p>
      <button
        className="btn btn--secondary"
        onClick={() => handleConfirmClaimClicked()}
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmClaimModal;
