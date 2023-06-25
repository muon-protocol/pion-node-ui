import useALICE from '../../contexts/ALICE/useALICE.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useMemo } from 'react';
import { FadeIn } from '../../animations';
import AmountInput from '../../components/Common/AmountInput.tsx';

export const RenderCreateBody = () => {
  const { ALICEBalance, allowance } = useALICE();
  const {
    createAmount,
    handleCreateAmountChange,
    handleCreateBonALICEClicked,
    createActionLoading,
    handleApproveALICEClicked,
  } = useCreateAction();

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
  }, [ALICEBalance, createAmount, createActionLoading]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          balance={ALICEBalance ? ALICEBalance.dsp : '...'}
          value={createAmount.hStr}
          onValueChanged={handleCreateAmountChange}
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <p className="max-md:text-sm font-light underline mb-8 md:mb-10 cursor-pointer">
          I Want to Boost Bonded ALICE Power with LP Tokens
        </p>
      </FadeIn>
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
    </>
  );
};
