import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo, useState } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import AmountInput from '../../components/Common/AmountInput.tsx';
import useLPToken from '../../contexts/LPToken/useLPToken.ts';
import Modal from '../../components/Common/Modal.tsx';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

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
    handleUpgradeBoostAmountChange,
    upgradeBoostAmount,
    handleUpgradeBonALICEClicked,
    isMetamaskLoading,
    isTransactionLoading,
    isApproveMetamaskLoading,
    handleApproveLPTokenClicked,
    isApproveTransactionLoading,
    handleApproveALICEClicked,
    isAllowanceModalOpen,
    closeAllowanceModal,
  } = useUpgradeAction();

  const { ALICEBalance } = useALICE();
  const {
    bonALICEs,
    fetchBonALICEIsLoading,
    ALICEAllowance,
    LPTokenAllowance,
  } = useBonALICE();

  const isUpgradeBonALICEButtonDisabled = useMemo(() => {
    return (
      !selectedUpgradeBonALICE ||
      !upgradeAmount ||
      !upgradeAmount.dsp ||
      !ALICEBalance?.hStr ||
      upgradeAmount.dsp > ALICEBalance.dsp
    );
  }, [selectedUpgradeBonALICE, upgradeAmount, ALICEBalance]);

  const [isBoostSectionOpen, setIsBoostSectionOpen] = useState(false);

  const { LPTokenBalance } = useLPToken();
  const { chainId, handleSwitchNetwork } = useUserProfile();

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
                    subValue1={item.nodePower}
                    subTitle2="Tier"
                    subValue2={'ALICE Starter (Tier 1)'}
                    onClick={() => handleUpgradeModalItemClicked(item)}
                    compact
                    selected={isSelectedUpgradeBonALICE(item)}
                  />
                );
              })
            ) : fetchBonALICEIsLoading ? (
              <p className="text-center py-24 px-3 text-primary">
                Fetching your BonALICEs...
              </p>
            ) : (
              <p className="text-center py-24 px-3 text-primary">
                You have no BonALICEs to upgrade. Please create Bonded ALICE
                first.
              </p>
            )}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          rightText={'ALICE'}
          balance={ALICEBalance ? ALICEBalance.dsp : '...'}
          value={upgradeAmount.hStr}
          onValueChanged={handleUpgradeAmountChange}
        />
      </FadeIn>
      {isBoostSectionOpen ? (
        <MoveUpIn className="mb-4" y={-10} duration={0.3} delay={0}>
          <AmountInput
            rightText={'LP ALICE'}
            balance={LPTokenBalance ? LPTokenBalance.dsp : '...'}
            withIcon
            iconClicked={() => {
              handleUpgradeBoostAmountChange('');
              setIsBoostSectionOpen(false);
            }}
            value={upgradeBoostAmount.hStr}
            onValueChanged={handleUpgradeBoostAmountChange}
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
      {selectedUpgradeBonALICE && (
        <MoveUpIn y={-10} className="mb-6" duration={0.1} delay={0.3}>
          <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
            <p className="font-light">Your current bonALICE power</p>
            <p className="font-medium">{selectedUpgradeBonALICE.nodePower}</p>
          </span>
          {(upgradeAmount.dsp > 0 || upgradeBoostAmount.dsp > 0) && (
            <>
              <MoveUpIn y={-10} duration={0.1}>
                <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
                  <p className="font-light">Your bonALICE power will be</p>
                  <p className="font-medium">
                    {selectedUpgradeBonALICE.nodePower +
                      upgradeAmount.dsp +
                      2 * upgradeBoostAmount.dsp}
                  </p>
                </span>
              </MoveUpIn>
              <MoveUpIn y={-10} duration={0.2}>
                <span className="flex justify-between text-gray10 max-md:text-sm">
                  <p className="font-light">Your tier will be</p>
                  <p className="font-medium">ALICE Starter (Tier 1)</p>
                </span>
              </MoveUpIn>
            </>
          )}
        </MoveUpIn>
      )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
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
        ) : ALICEAllowance && ALICEAllowance.big < upgradeAmount.big ? (
          <button
            onClick={() => handleApproveALICEClicked()}
            className="btn !w-full"
            disabled={isUpgradeBonALICEButtonDisabled}
          >
            Approve {upgradeAmount.hStr} ALICE
          </button>
        ) : LPTokenAllowance &&
          LPTokenAllowance.big < upgradeBoostAmount.big ? (
          <button
            onClick={() => handleApproveLPTokenClicked()}
            className="btn !w-full"
            disabled={isUpgradeBonALICEButtonDisabled}
          >
            Approve {upgradeBoostAmount.hStr} LP Token
          </button>
        ) : (
          <button
            onClick={() => handleUpgradeBonALICEClicked()}
            disabled={isUpgradeBonALICEButtonDisabled}
            className="btn !w-full"
          >
            Upgrade Bonded ALICE
          </button>
        )}
      </FadeIn>
      <Modal
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
            You need to approve the{' '}
            {ALICEAllowance && ALICEAllowance?.big < upgradeAmount?.big
              ? 'ALICE'
              : 'LP'}{' '}
            token to be spent by the Bonded ALICE Contract. Enter at least the
            amount you want to create and click Next then Approve button on
            metamask.
          </p>
          {ALICEAllowance && ALICEAllowance?.big < upgradeAmount?.big ? (
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
