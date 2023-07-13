import { RewardWallet } from '../../types';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { formatWalletAddress } from '../../utils/web3.ts';

export const VerifyWalletCard = ({
  wallet,
  className,
  disabled,
}: {
  wallet: RewardWallet;
  className?: string;
  disabled?: boolean;
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
        {wallet.walletAddress !== walletAddress &&
          !claimSignature &&
          !disabled && (
            <img
              onClick={() => handleRemoveWallet(wallet.walletAddress)}
              src="/assets/images/modal/exit-white-icon.svg"
              alt=""
              className="cursor-pointer"
            />
          )}
      </span>
      <span className="reward-sources flex-col gap-2 ml-4 mb-1">
        <RewardSection
          title="Alice Operator"
          validSection={
            wallet.wasAliceOperatorEarly ||
            wallet.wasAliceOperator ||
            wallet.wasAliceOperatorBounce
          }
        />
        <RewardSection
          title="Muon Presale"
          validSection={wallet.wasInMuonPresale}
        />
        <RewardSection
          title="Deus Presale"
          validSection={wallet.wasInDeusPresale}
        />
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

const RewardSection = ({
  title,
  validSection,
}: {
  title: string;
  validSection: boolean;
}) => {
  return (
    <span className="reward-source flex gap-2">
      <img
        className="w-4"
        src={`/assets/images/get-started/${
          validSection ? 'check-icon.svg' : 'dash-icon.svg'
        }`}
        alt=""
      />
      <p className="text-white">{title}</p>
    </span>
  );
};
