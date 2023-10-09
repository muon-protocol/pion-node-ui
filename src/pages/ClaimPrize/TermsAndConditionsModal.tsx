import { useContext, useState } from 'react';
import { ClaimPrizeContext } from '../../contexts/ClaimPrize/ClaimPrizeContext.tsx';

export const TermsAndConditionsModal = () => {
  const [checked, setChecked] = useState(false);
  const {
    handleClaimRewardsClicked,
    agreeWithTermsAndConditionsSig,
    handleApproveTermsAndConditions,
    isMetamaskLoadingVerify,
  } = useContext(ClaimPrizeContext);

  return (
    <div className="text-black">
      {/*<section className="terms-and-conditions w-full h-[300px] mb-6 overflow-y-auto styled-scroll">*/}
      {/*  <iframe*/}
      {/*    className="h-full max-h-[300px] w-full"*/}
      {/*    src="https://docs.muon.net/muon-network/terms-of-service main"*/}
      {/*  ></iframe>*/}
      {/*</section>*/}

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
        <p className="font-medium">
          By signing this I confirm that I have read and I agree to the{' '}
          <span
            className="underline cursor-pointer"
            onClick={() =>
              window.open(
                'https://docs.muon.net/muon-network/terms-of-service',
                '_blank',
              )
            }
          >
            Terms of Service
          </span>
          .
        </p>
      </section>

      <section className="actions">
        <button
          onClick={() => {
            agreeWithTermsAndConditionsSig
              ? handleClaimRewardsClicked()
              : handleApproveTermsAndConditions();
          }}
          disabled={!checked || isMetamaskLoadingVerify}
          className="btn btn--white mb-2 mt-5 mx-auto !w-[280px]"
        >
          {isMetamaskLoadingVerify
            ? 'Metamask...'
            : agreeWithTermsAndConditionsSig
            ? 'Claim rewards'
            : 'Approve'}
        </button>
      </section>
    </div>
  );
};
