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
      <p className="text-center mb-5 text-black">
        Be aware that if you press the Confirm button, you will claim your
        bonPION on <strong>({formatWalletAddress(stakingAddress)})</strong> and
        will NOT be able to change it afterwards. You will have to run your node
        on this address.
      </p>
      <button
        className="btn btn--white"
        onClick={() => handleConfirmClaimClicked()}
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmClaimModal;
