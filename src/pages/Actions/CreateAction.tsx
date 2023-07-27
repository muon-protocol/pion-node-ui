import useALICE from '../../contexts/ALICE/useALICE.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useMemo, useState } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Modal from '../../components/Common/Modal.tsx';
import { AnimatePresence } from 'framer-motion';
import useLPToken from '../../contexts/LPToken/useLPToken.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import Lottie from 'lottie-react';
import waitingForApproveAnimation from '../../../public/assets/animations/waiting-for-approve.json';
import { getTier } from '../../utils';
import InsufficientNFTAmoutModalBody from '../../components/Common/InsufficientNFTAmoutModalBody.tsx';
import ClaimedRewardModal from '../ClaimPrize/ClaimedRewardModal.tsx';

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
  } = useCreateAction();

  const [isBoostSectionOpen, setIsBoostSectionOpen] = useState(false);
  const { chainId, handleSwitchNetwork } = useUserProfile();

  const isCreateBondedALICEButtonDisabled = useMemo(() => {
    return (
      !ALICEAllowance ||
      (!LPTokenAllowance && createBoostAmount.big > BigInt(0)) ||
      !createAmount ||
      (!createAmount.big && !createBoostAmount.big) ||
      (!ALICEBalance?.dsp && !LPTokenBalance?.dsp) ||
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

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          rightText={'ALICE'}
          balance={ALICEBalance}
          value={createAmount}
          onValueChanged={handleCreateAmountChange}
        />
      </FadeIn>
      <AnimatePresence>
        {isBoostSectionOpen ? (
          <MoveUpIn className="mb-4" y={-10} duration={0.3} delay={0}>
            <AmountInput
              rightText={'LP ALICE'}
              balance={LPTokenBalance}
              withIcon
              iconClicked={() => {
                handleCreateBoostAmountChange('');
                setIsBoostSectionOpen(false);
              }}
              value={createBoostAmount}
              onValueChanged={handleCreateBoostAmountChange}
            />
          </MoveUpIn>
        ) : (
          <FadeIn duration={0.1} delay={0.1}>
            <p
              onClick={() => setIsBoostSectionOpen(true)}
              className="max-md:text-sm font-light underline mb-8 md:mb-10 cursor-pointer"
            >
              I Want to Boost Bonded ALICE Power with LP Tokens
            </p>
          </FadeIn>
        )}
      </AnimatePresence>
      {createAmount.dsp > 0 && (
        <>
          <MoveUpIn y={-10} duration={0.1} delay={0.1}>
            <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
              <p className="font-light">Your bonALICE power will be</p>
              <p className="font-medium">
                {createAmount.dsp + createBoostAmount.dsp * 2}
              </p>
            </span>
          </MoveUpIn>
          <MoveUpIn y={-10} duration={0.1} delay={0.1}>
            <span className="flex justify-between text-gray10 max-md:text-sm">
              <p className="font-light">Your tier will be</p>
              <p className="font-medium">
                {getTier(createAmount.dsp + createBoostAmount.dsp * 2)}
              </p>
            </span>
          </MoveUpIn>
        </>
      )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] md:mx-auto !w-full"
      >
        {chainId !== getCurrentChainId() ? (
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
        ) : ALICEAllowance && ALICEAllowance.big < createAmount.big ? (
          <button
            onClick={() => handleApproveALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve{' '}
            {ALICEBalance && createAmount.big < ALICEBalance.big
              ? '> ' + createAmount.dsp + ' ALICEs'
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
              ? '> ' + createBoostAmount.dsp + ' LP Tokens'
              : 'All LP Tokens'}
          </button>
        ) : (
          <button
            onClick={() => handleCreateBonALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Create Bonded ALICE
          </button>
        )}
      </FadeIn>
      <Modal
        size="sm"
        isOpen={isInsufficientModalOpen}
        closeModalHandler={() => setIsInsufficientModalOpen(false)}
      >
        <InsufficientNFTAmoutModalBody />
      </Modal>
      <Modal
        size="sm"
        closeable={false}
        isOpen={isSufficientModalOpen}
        closeModalHandler={() => setIsSufficientModalOpen(false)}
      >
        <ClaimedRewardModal />
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
