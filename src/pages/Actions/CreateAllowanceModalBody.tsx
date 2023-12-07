import Lottie from 'lottie-react';
import waitingForApproveAnimation from '../../../public/assets/animations/waiting-for-approve.json';
import strings from '../../constants/strings.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';

const CreateAllowanceModalBody = () => {
  const {
    handleApproveALICEClicked,
    handleApproveLPTokenClicked,
    isApproveMetamaskLoading,
    isApproveTransactionLoading,
    createAmount,
    createBoostAmount,
  } = useCreateAction();

  const {
    ALICEAllowanceForBooster,
    ALICEAllowance,
    LPTokenAllowanceForBooster,
  } = useBonALICE();

  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        animationData={waitingForApproveAnimation}
        className={`w-60 h-auto`}
      />
      <p className="text-center text-black mb-6 font-medium">
        Please approve by signing the message that appears in your wallet. This
        allows the smart contract to securely lock your{' '}
        {createBoostAmount.dsp > 0 &&
        ALICEAllowanceForBooster &&
        ALICEAllowanceForBooster.big < createAmount.big
          ? strings.token + ' '
          : createBoostAmount.dsp === 0 &&
            ALICEAllowance &&
            ALICEAllowance.big < createAmount.big
          ? strings.token + ' '
          : LPTokenAllowanceForBooster &&
            LPTokenAllowanceForBooster.big < createBoostAmount.big
          ? 'USDC '
          : ''}
        tokens in the{' '}
        {createBoostAmount && createBoostAmount.dsp > 0
          ? 'Booster contract'
          : strings.nft + ' contract'}
        .
      </p>
      {ALICEAllowanceForBooster &&
      ALICEAllowanceForBooster?.big < createAmount?.big ? (
        <button
          className="btn btn--primary"
          onClick={() =>
            !isApproveMetamaskLoading &&
            !isApproveTransactionLoading &&
            handleApproveALICEClicked()
          }
        >
          {isApproveMetamaskLoading
            ? 'Waiting for Metamask...'
            : isApproveTransactionLoading
            ? 'Waiting for Tx...'
            : 'Approve'}
        </button>
      ) : (
        <button
          className="btn btn--primary"
          onClick={() =>
            !isApproveMetamaskLoading &&
            !isApproveTransactionLoading &&
            handleApproveLPTokenClicked()
          }
        >
          {isApproveMetamaskLoading
            ? 'Waiting for Metamask...'
            : isApproveTransactionLoading
            ? 'Waiting for Tx...'
            : 'Approve'}
        </button>
      )}
    </div>
  );
};

export default CreateAllowanceModalBody;
