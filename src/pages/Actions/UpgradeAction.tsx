import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo } from 'react';
import { weiToEther } from '../../utils/web3.ts';
import { FadeIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import AmountInput from '../../components/Common/AmountInput.tsx';

export const RenderUpgradeBody = () => {
  const {
    isUpgradeModalOpen,
    openUpgradeModal,
    closeUpgradeModal,
    handleUpgradeModalItemClicked,
    isSelectedUpgradeBonALICE,
    selectedUpgradeBonALICE,
    upgradeAmount,
    handleUpgradeAmountChange,
  } = useUpgradeAction();

  const { ALICEBalance } = useALICE();
  const { bonALICEs } = useBonALICE();

  const isUpgradeBonALICEButtonDisabled = useMemo(() => {
    return (
      !selectedUpgradeBonALICE ||
      !upgradeAmount ||
      !ALICEBalance?.hStr ||
      Number(upgradeAmount) > Number(weiToEther(ALICEBalance.dsp.toString()))
    );
  }, [selectedUpgradeBonALICE, upgradeAmount, ALICEBalance]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonALICE"
          onClick={() => openUpgradeModal()}
          isModalOpen={isUpgradeModalOpen}
          closeModalHandler={() => closeUpgradeModal()}
          modalTitle={
            bonALICEs.length > 0 ? 'Select BonALICE' : 'No BonALICEs to Upgrade'
          }
          selectedItems={
            selectedUpgradeBonALICE ? [selectedUpgradeBonALICE] : []
          }
          removeItem={(item) => handleUpgradeModalItemClicked(item)}
        >
          <div className="flex flex-col gap-3">
            {bonALICEs.length > 0 ? (
              bonALICEs.map((item) => {
                return (
                  <BonALICECard
                    className="cursor-pointer"
                    title={'BonALICE #' + item.tokenId}
                    subTitle1="Node Power"
                    subValue1={'500'}
                    subTitle2="Tier"
                    subValue2={'ALICE Starter (Tier 1)'}
                    onClick={() => handleUpgradeModalItemClicked(item)}
                    compact
                    selected={isSelectedUpgradeBonALICE(item)}
                  />
                );
              })
            ) : (
              <p className="text-center py-24 px-3 text-primary">
                You have no BonALICEs to upgrade. Please create some first.
              </p>
            )}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          rightText={'ALICE'}
          balance={ALICEBalance ? ALICEBalance.dsp : '...'}
          value={upgradeAmount}
          onValueChanged={handleUpgradeAmountChange}
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <p className="max-md:text-sm font-light underline mb-8 md:mb-10 cursor-pointer">
          I Want to Boost Bonded ALICE Power with LP Tokens
        </p>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your current bonALICE power</p>
          <p className="font-medium">2000</p>
        </span>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your bonALICE power will be</p>
          <p className="font-medium">5030 bonALICE</p>
        </span>
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
        <button
          disabled={isUpgradeBonALICEButtonDisabled}
          className="btn !w-full"
        >
          Upgrade
        </button>
      </FadeIn>
    </>
  );
};
