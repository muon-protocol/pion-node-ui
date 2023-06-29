import useALICE from '../../contexts/ALICE/useALICE.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useMemo, useState } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Modal from '../../components/Common/Modal.tsx';
import { AnimatePresence } from 'framer-motion';

export const RenderCreateBody = () => {
  const { ALICEBalance, allowance } = useALICE();
  const {
    createAmount,
    createBoostAmount,
    handleCreateAmountChange,
    handleCreateBoostAmountChange,
    handleCreateBonALICEClicked,
    createActionLoading,
    handleApproveALICEClicked,
    isAllowanceModalOpen,
    closeAllowanceModal,
    approveLoading,
  } = useCreateAction();

  const [isBoostSectionOpen, setIsBoostSectionOpen] = useState(false);

  const isCreateBondedALICEButtonDisabled = useMemo(() => {
    return (
      !allowance ||
      !createAmount ||
      createAmount.big === BigInt(0) ||
      !ALICEBalance ||
      ALICEBalance.big === BigInt(0) ||
      ALICEBalance.dsp < createAmount.dsp ||
      createActionLoading
    );
  }, [ALICEBalance, createAmount, createActionLoading, allowance]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          rightText={'ALICE'}
          balance={ALICEBalance ? ALICEBalance.dsp : '...'}
          value={createAmount.hStr}
          onValueChanged={handleCreateAmountChange}
        />
      </FadeIn>
      <AnimatePresence>
        {isBoostSectionOpen ? (
          <MoveUpIn className="mb-4" y={-10} duration={0.3} delay={0}>
            <AmountInput
              rightText={'LP ALICE'}
              balance={null}
              withIcon
              iconClicked={() => {
                handleCreateBoostAmountChange('0');
                setIsBoostSectionOpen(false);
              }}
              value={createBoostAmount.hStr}
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
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your bonALICE power will be</p>
          <p className="font-medium">{createAmount.dsp}</p>
        </span>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between text-gray10 max-md:text-sm">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">ALICE Supreme (Tier 3)</p>
        </span>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        {allowance && allowance.big < createAmount.big ? (
          <button
            onClick={() => handleApproveALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve {createAmount.hStr} ALICE
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
        title=""
        size="sm"
        isOpen={isAllowanceModalOpen}
        closeModalHandler={closeAllowanceModal}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[108px] mb-10"
            src="/assets/images/claim/switch-wallet-modal-icon.svg"
            alt=""
          />
          <p className="text-center mb-6">
            You need to approve the ALICE token to be spent by the BonALICE.
            Enter at least the amount you want to create and click Next then
            Approve button on metamask.
          </p>
          <button
            className="btn btn--dark-primary"
            onClick={() => !approveLoading && handleApproveALICEClicked()}
          >
            {approveLoading ? 'Waiting for Metamask...' : 'Approve'}
          </button>
        </div>
      </Modal>
    </>
  );
};
