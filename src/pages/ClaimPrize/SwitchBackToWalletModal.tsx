import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { formatWalletAddress } from '../../utils/web3.ts';

const SwitchBackToWalletModal = () => {
  const { stakingAddress, stakingAddressFromPast } = useClaimPrize();

  return (
    <div className="pb-4 px-3 flex flex-col justify-center items-center">
      <img
        className="w-[108px] mb-10"
        src="/assets/images/claim/switch-wallet-modal-icon.svg"
        alt=""
      />
      <p className="text-center">
        To claim your bonPION, please switch back to your Staking Address
        <br />
        <strong>
          {stakingAddressFromPast
            ? formatWalletAddress(stakingAddressFromPast)
            : formatWalletAddress(stakingAddress)}
        </strong>
      </p>
    </div>
  );
};

export default SwitchBackToWalletModal;
