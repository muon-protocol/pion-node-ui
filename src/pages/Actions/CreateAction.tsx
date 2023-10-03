import useALICE from '../../contexts/ALICE/useALICE.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useMemo } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Modal from '../../components/Common/Modal.tsx';
import useLPToken from '../../contexts/LPToken/useLPToken.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lottie from 'lottie-react';
import waitingForApproveAnimation from '../../../public/assets/animations/waiting-for-approve.json';
import InsufficientNFTAmoutModalBody from '../../components/Common/InsufficientNFTAmoutModalBody.tsx';
import ClaimedRewardModal from '../ClaimPrize/ClaimedRewardModal.tsx';
import BoostingAmountInput from '../../components/Common/BoostingAmountInput.tsx';
import { w3bNumberFromNumber } from '../../utils/web3.ts';
import { useBooster } from '../../hooks/booster/useBooster.ts';
import { usePancakePair } from '../../hooks/pancakePair/usePancakePair.ts';

export const RenderCreateBody = () => {
  const { ALICEBalance } = useALICE();
  const { ALICEAllowance, LPTokenAllowance } = useBonALICE();
  const { LPTokenBalance } = useLPToken();
  const {
    createAmount,
    createBoostAmount,
    handleCreateAmountChange,
    handleCreateBoostAmountChange,
    handleCreateBonALICEClicked,
    createActionLoading,
    handleApproveALICEClicked,
    handleApproveLPTokenClicked,
    isAllowanceModalOpen,
    closeAllowanceModal,
    isMetamaskLoading,
    isTransactionLoading,
    isApproveMetamaskLoading,
    isApproveTransactionLoading,
    isInsufficientModalOpen,
    setIsInsufficientModalOpen,
    isSufficientModalOpen,
    setIsSufficientModalOpen,
    boostingLoading,
  } = useCreateAction();

  const { chainId, handleSwitchNetwork } = useUserProfile();
  const { boostCoefficient } = useBooster();

  const isCreateBondedALICEButtonDisabled = useMemo(() => {
    return (
      createAmount.dsp + 2 * createBoostAmount.dsp < 10000 ||
      !ALICEAllowance ||
      (!LPTokenAllowance && createBoostAmount.big > BigInt(0)) ||
      !(createAmount || createBoostAmount) ||
      !(createAmount.big || createBoostAmount.big) ||
      (!ALICEBalance?.dsp && !LPTokenBalance?.dsp) ||
      (LPTokenBalance && LPTokenBalance.dsp < createBoostAmount.dsp) ||
      (ALICEBalance && ALICEBalance.dsp < createAmount.dsp) ||
      createActionLoading
    );
  }, [
    ALICEBalance,
    createAmount,
    createActionLoading,
    ALICEAllowance,
    LPTokenAllowance,
    createBoostAmount,
    LPTokenBalance,
  ]);

  const { USDCPrice } = usePancakePair();

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          rightText={'ALICE'}
          balance={ALICEBalance}
          value={createAmount}
          withLink
          onValueChanged={handleCreateAmountChange}
        />
      </FadeIn>

      <FadeIn className="mb-4" duration={0.1} delay={0.1}>
        <BoostingAmountInput
          withLink
          rightText={'USDC'}
          balance={LPTokenBalance}
          value={createBoostAmount}
          boostCoefficient={boostCoefficient}
          max={w3bNumberFromNumber(createAmount.dsp)}
          onValueChanged={handleCreateBoostAmountChange}
        />
      </FadeIn>

      {(createAmount.dsp > 0 || createBoostAmount.dsp > 0) &&
        USDCPrice &&
        boostCoefficient && (
          <>
            <MoveUpIn
              y={-10}
              duration={0.1}
              delay={0.1}
              className="flex w-full justify-between items-center"
            >
              <span className="text-gray10">
                <p className="font-light">Your new bonALICE amount:</p>
                <p className="font-light text-sm flex gap-1">
                  {createBoostAmount.dsp +
                    ' USDC -> ' +
                    Math.round(
                      ((createBoostAmount.dsp * Math.round(USDCPrice * 100)) /
                        100) *
                        100,
                    ) /
                      100 +
                    ' ALICE '}
                  <p className="text-primary font-bold">
                    x{boostCoefficient?.dsp}
                  </p>
                  {' + ' + createAmount.dsp + ' ALICE'}
                </p>
              </span>
              <span className="rounded-md bg-primary px-3 py-2.5 text-xl font-bold text-white">
                {Math.round(
                  (createBoostAmount.dsp *
                    (Math.round(USDCPrice * 100) / 100) *
                    boostCoefficient.dsp +
                    createAmount.dsp) *
                    100,
                ) / 100}
              </span>
            </MoveUpIn>
          </>
        )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] md:mx-auto !w-full"
      >
        {createAmount.dsp < 10000 ? (
          <button disabled className="btn !w-full" onClick={() => {}}>
            At Least 10000 Power
          </button>
        ) : chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn !w-full"
          >
            Switch Network
          </button>
        ) : isMetamaskLoading || isTransactionLoading || boostingLoading ? (
          <button className="btn !w-full" disabled>
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : boostingLoading
              ? 'Boosting you bonALICE...'
              : 'Waiting for Tx...'}
          </button>
        ) : ALICEAllowance && ALICEAllowance.big < createAmount.big ? (
          <button
            onClick={() => handleApproveALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve{' '}
            {ALICEBalance && createAmount.big < ALICEBalance.big
              ? createAmount.hStr + ' ALICEs'
              : 'All ALICEs'}
          </button>
        ) : LPTokenAllowance && LPTokenAllowance.big < createBoostAmount.big ? (
          <button
            onClick={() => handleApproveLPTokenClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve{' '}
            {LPTokenBalance && createBoostAmount.big < LPTokenBalance.big
              ? createBoostAmount.hStr + ' USDC'
              : 'All USDCs'}
          </button>
        ) : (
          <button
            onClick={() => handleCreateBonALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            {createAmount.dsp + createBoostAmount.dsp > 0 &&
            createAmount.dsp + createBoostAmount.dsp < 10000
              ? 'At Least 10000 Power'
              : 'Create Bonded ALICE'}
          </button>
        )}
      </FadeIn>
      <Modal
        size="sm"
        isOpen={isInsufficientModalOpen}
        closeModalHandler={() => setIsInsufficientModalOpen(false)}
      >
        <InsufficientNFTAmoutModalBody operation="created" />
      </Modal>
      <Modal
        size="sm"
        isOpen={isSufficientModalOpen}
        closeModalHandler={() => setIsSufficientModalOpen(false)}
      >
        <ClaimedRewardModal operation="created" />
      </Modal>
      <Modal
        size="sm"
        isOpen={isAllowanceModalOpen}
        closeModalHandler={closeAllowanceModal}
      >
        <div className="flex flex-col justify-center items-center">
          <Lottie
            animationData={waitingForApproveAnimation}
            className={`w-60 h-auto`}
          />
          <p className="text-center mb-6 font-medium">
            Please approve by signing the message that appears in your wallet.
            This allows the smart contract to securely lock your{' '}
            {ALICEAllowance && ALICEAllowance?.big < createAmount?.big
              ? 'ALICE '
              : 'LP '}
            tokens in the bonALICE.
          </p>
          {ALICEAllowance && ALICEAllowance?.big < createAmount?.big ? (
            <button
              className="btn btn--dark-primary"
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
              className="btn btn--dark-primary"
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
      </Modal>
    </>
  );
};
