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
import { w3bNumberFromBigint, w3bNumberFromNumber } from '../../utils/web3.ts';
import { useBooster } from '../../hooks/booster/useBooster.ts';
import { usePancakePair } from '../../hooks/pancakePair/usePancakePair.ts';

export const RenderCreateBody = () => {
  const { ALICEBalance } = useALICE();
  const {
    ALICEAllowanceForBooster,
    ALICEAllowance,
    LPTokenAllowanceForBooster,
  } = useBonALICE();
  const { LPTokenBalance } = useLPToken();
  const {
    createAmount,
    createBoostAmount,
    handleCreateAmountChange,
    handleCreateBoostAmountChange,
    handleCreateBonALICEClicked,
    createActionLoading,
    handleApproveALICEClicked,
    handleApproveALICEForBoosterClicked,
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
  } = useCreateAction();

  const { chainId, handleSwitchNetwork } = useUserProfile();
  const { boostCoefficient } = useBooster();
  const { USDCPrice, ALICEPrice } = usePancakePair();

  const maxAmountToBoost = useMemo(() => {
    return ALICEPrice
      ? w3bNumberFromBigint(
          (createAmount.big * w3bNumberFromNumber(ALICEPrice).big) /
            BigInt(10 ** 18),
        )
      : w3bNumberFromNumber(0);
  }, [createAmount, ALICEPrice]);

  const isCreateBondedALICEButtonDisabled = useMemo(() => {
    return (
      createAmount.dsp + 2 * createBoostAmount.dsp < 10000 ||
      !ALICEAllowanceForBooster ||
      (!LPTokenAllowanceForBooster && createBoostAmount.big > BigInt(0)) ||
      !(createAmount || createBoostAmount) ||
      !(createAmount.big || createBoostAmount.big) ||
      (!ALICEBalance?.dsp && !LPTokenBalance?.dsp) ||
      (LPTokenBalance && LPTokenBalance.dsp < createBoostAmount.dsp) ||
      (ALICEBalance && ALICEBalance.dsp < createAmount.dsp) ||
      createActionLoading ||
      (createBoostAmount.dsp > 0 &&
        ALICEPrice !== undefined &&
        createBoostAmount.big > maxAmountToBoost.big)
    );
  }, [
    createAmount,
    createBoostAmount,
    ALICEAllowanceForBooster,
    LPTokenAllowanceForBooster,
    ALICEBalance,
    LPTokenBalance,
    createActionLoading,
    ALICEPrice,
    maxAmountToBoost.big,
  ]);

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
          max={maxAmountToBoost}
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
                      (w3bNumberFromBigint(
                        createBoostAmount.big *
                          BigInt(Math.round(USDCPrice * 100)),
                      ).dsp /
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
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button className="btn !w-full" disabled>
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : createBoostAmount.dsp > 0 &&
          ALICEAllowanceForBooster &&
          ALICEAllowanceForBooster.big < createAmount.big ? (
          <button
            onClick={() => handleApproveALICEForBoosterClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve{' '}
            {ALICEBalance && createAmount.big < ALICEBalance.big
              ? createAmount.hStr + ' ALICEs'
              : 'All ALICEs'}
          </button>
        ) : createBoostAmount.dsp === 0 &&
          ALICEAllowance &&
          ALICEAllowance.big < createAmount.big ? (
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
        ) : LPTokenAllowanceForBooster &&
          LPTokenAllowanceForBooster.big < createBoostAmount.big ? (
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
            {createBoostAmount.dsp > 0 &&
            ALICEAllowanceForBooster &&
            ALICEAllowanceForBooster.big < createAmount.big
              ? 'ALICE '
              : createBoostAmount.dsp === 0 &&
                ALICEAllowance &&
                ALICEAllowance.big < createAmount.big
              ? 'ALICE '
              : LPTokenAllowanceForBooster &&
                LPTokenAllowanceForBooster.big < createBoostAmount.big
              ? 'USDC '
              : ''}
            tokens in the{' '}
            {createBoostAmount && createBoostAmount.dsp > 0
              ? 'Booster contract'
              : 'BonALICE contract'}
            .
          </p>
          {ALICEAllowanceForBooster &&
          ALICEAllowanceForBooster?.big < createAmount?.big ? (
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
