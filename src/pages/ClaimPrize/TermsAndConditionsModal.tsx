import { useContext, useState } from 'react';
import { ClaimPrizeContext } from '../../contexts/ClaimPrize/ClaimPrizeContext.tsx';

export const TermsAndConditionsModal = () => {
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);
  const [termsOfAcquisitionChecked, setTermsOfAcquisitionChecked] =
    useState(false);

  const {
    handleClaimRewardsClicked,
    agreeWithTermsAndConditionsSig,
    handleApproveTermsAndConditions,
    isMetamaskLoadingVerify,
  } = useContext(ClaimPrizeContext);

  return (
    <div className="text-black">
      <Checkbox
        checked={termsAndConditionsChecked}
        setChecked={setTermsAndConditionsChecked}
      >
        Please sign this message to confirm that you agree with{' '}
        <span
          className="underline cursor-pointer"
          onClick={() =>
            window.open(
              'https://docs.muon.net/muon-network/terms-of-service',
              '_blank',
            )
          }
        >
          Terms and Conditions of MUON Network
        </span>
        .
      </Checkbox>
      <Checkbox
        checked={termsOfAcquisitionChecked}
        setChecked={setTermsOfAcquisitionChecked}
      >
        Please sign this message to confirm that you agree with{' '}
        <span
          className="underline cursor-pointer"
          onClick={() =>
            window.open(
              'https://docs.muon.net/muon-network/terms-of-aquisition',
              '_blank',
            )
          }
        >
          Terms of Acquisition of $PION tokens
        </span>
        .
      </Checkbox>

      <section className="actions">
        <button
          onClick={() => {
            agreeWithTermsAndConditionsSig
              ? handleClaimRewardsClicked()
              : handleApproveTermsAndConditions();
          }}
          disabled={
            !termsAndConditionsChecked ||
            !termsOfAcquisitionChecked ||
            isMetamaskLoadingVerify
          }
          className="btn btn--white mb-2 mt-5 mx-auto !min-w-[280px]"
        >
          {isMetamaskLoadingVerify
            ? 'Metamask...'
            : agreeWithTermsAndConditionsSig
            ? 'Claim rewards'
            : 'Sign & Accept Terms of Service'}
        </button>
      </section>
    </div>
  );
};

const Checkbox = ({
  checked,
  setChecked,
  children,
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  children: React.ReactNode;
}) => {
  const { agreeWithTermsAndConditionsSig } = useContext(ClaimPrizeContext);

  return (
    <section
      className={`checkbox flex gap-4 mb-6 justify-start items-center ${
        !agreeWithTermsAndConditionsSig ? 'cursor-pointer' : ''
      }`}
      onClick={() => {
        if (!agreeWithTermsAndConditionsSig) setChecked(!checked);
      }}
    >
      <img
        src={
          checked
            ? '/assets/images/checkbox-checked.svg'
            : '/assets/images/checkbox-unchecked.svg'
        }
        alt=""
      />
      <p className="font-medium">{children}</p>
    </section>
  );
};
