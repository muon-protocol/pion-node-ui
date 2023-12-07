import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import { formatWalletAddress } from '../../utils/web3.ts';
import strings from '../../constants/strings.ts';

const SwitchBackToWalletModal = () => {
  const { stakingAddress, stakingAddressFromPast } = useClaimPrize();

  return (
    <div className="pb-4 px-3 flex flex-col justify-center items-center">
      <img
        className="w-24 h-24 mb-10"
        src="/assets/images/modal/wrong-wallet-icon.svg"
        alt=""
      />
      <p className="text-center text-black">
        To claim your {strings.nft}, please switch back to your Staking Address
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
