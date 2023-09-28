import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import AmountInput from '../../components/Common/AmountInput.tsx';
import useLPToken from '../../contexts/LPToken/useLPToken.ts';
import Modal from '../../components/Common/Modal.tsx';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import BonALICEModalBody from '../../components/Common/BonALICEModalBody.tsx';
import { getTier } from '../../utils';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { useALICEAllowance } from '../../hooks/alice/useALICEAllowance.ts';
import { useLPTokenAllowance } from '../../hooks/lpToken/useLPTokenAllowance.ts';
import BoostingAmountInput from '../../components/Common/BoostingAmountInput.tsx';

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
  const { bonALICEs, ALICEAllowance, LPTokenAllowance } = useBonALICE();

  const { allowanceForMuonNodeStaking: aliceAllowanceForMuon } =
    useALICEAllowance();
  const { allowanceForMuonNodeStaking: lpTokenAllowanceForMuon } =
    useLPTokenAllowance();

  const { LPTokenBalance } = useLPToken();
  const { chainId, handleSwitchNetwork } = useUserProfile();

  const { nodeBonALICE } = useMuonNodeStaking();

  const showApproveALICE = useMemo(() => {
    if (nodeBonALICE.length > 0 && isSelectedUpgradeBonALICE(nodeBonALICE[0])) {
      if (aliceAllowanceForMuon)
        return aliceAllowanceForMuon.big < upgradeAmount.big;
    } else {
      if (ALICEAllowance) return ALICEAllowance.big < upgradeAmount.big;
    }
  }, [
    nodeBonALICE,
    isSelectedUpgradeBonALICE,
    aliceAllowanceForMuon,
    ALICEAllowance,
    upgradeAmount,
  ]);

  const showApproveLPToken = useMemo(() => {
    if (nodeBonALICE.length > 0 && isSelectedUpgradeBonALICE(nodeBonALICE[0])) {
      if (lpTokenAllowanceForMuon)
        return lpTokenAllowanceForMuon.big < upgradeBoostAmount.big;
    } else {
      if (LPTokenAllowance)
        return LPTokenAllowance.big < upgradeBoostAmount.big;
    }
  }, [
    nodeBonALICE,
    isSelectedUpgradeBonALICE,
    lpTokenAllowanceForMuon,
    LPTokenAllowance,
    upgradeBoostAmount,
  ]);

  const isUpgradeBonALICEButtonDisabled = useMemo(() => {
    return (
      !selectedUpgradeBonALICE ||
      !(upgradeAmount || upgradeBoostAmount) ||
      !(upgradeAmount.dsp || upgradeBoostAmount.dsp) ||
      !ALICEBalance?.hStr ||
      upgradeAmount.dsp > ALICEBalance.dsp ||
      !LPTokenBalance ||
      upgradeBoostAmount.dsp > LPTokenBalance.dsp
    );
  }, [
    selectedUpgradeBonALICE,
    upgradeAmount,
    ALICEBalance,
    LPTokenBalance,
    upgradeBoostAmount,
  ]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonALICE"
          onClick={() => openUpgradeModal()}
          isModalOpen={isUpgradeModalOpen}
          closeModalHandler={() => closeUpgradeModal()}
          modalTitle={
            [...nodeBonALICE, ...bonALICEs].length > 0
              ? 'Select BonALICE'
              : 'No BonALICEs to Upgrade'
          }
          selectedItems={
            selectedUpgradeBonALICE ? [selectedUpgradeBonALICE] : []
          }
          removeItem={(item) => handleUpgradeModalItemClicked(item)}
        >
          <BonALICEModalBody
            bonALICEs={[...nodeBonALICE, ...bonALICEs]}
            handleUpgradeModalItemClicked={handleUpgradeModalItemClicked}
            isSelectedUpgradeBonALICE={isSelectedUpgradeBonALICE}
          />
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          withLink
          rightText={'ALICE'}
          balance={ALICEBalance}
          value={upgradeAmount}
          onValueChanged={handleUpgradeAmountChange}
        />
      </FadeIn>
      <FadeIn className="mb-4" duration={0.1} delay={0.1}>
        <BoostingAmountInput
          withLink
          rightText={'USDC'}
          balance={LPTokenBalance}
          value={upgradeBoostAmount}
          onValueChanged={handleUpgradeBoostAmountChange}
        />
      </FadeIn>

      {selectedUpgradeBonALICE && (
        <MoveUpIn y={-10} className="mb-6" duration={0.1} delay={0.3}>
          <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
            <p className="font-light">Your bonALICE current amount:</p>
            <p className="font-medium">{selectedUpgradeBonALICE.nodePower}</p>
          </span>
          {(upgradeAmount.dsp > 0 || upgradeBoostAmount.dsp > 0) && (
            <>
              <MoveUpIn
                y={-10}
                duration={0.1}
                delay={0.1}
                className="flex w-full justify-between items-center"
              >
                <span className="text-gray10">
                  <p className="font-light">Your bonALICE amount will be:</p>
                  <p className="font-light text-sm flex gap-1">
                    {upgradeBoostAmount.dsp +
                      ' USDC -> ' +
                      upgradeBoostAmount.dsp +
                      ' ALICE '}
                    <p className="text-uptime">x2</p>
                    {' + ' +
                      upgradeAmount.dsp +
                      ' ALICE + ' +
                      selectedUpgradeBonALICE.nodePower}
                  </p>
                </span>
                <span className="rounded-md bg-primary px-3 py-2.5 text-xl font-bold text-white">
                  {upgradeBoostAmount.dsp * 2 +
                    upgradeAmount.dsp +
                    selectedUpgradeBonALICE.nodePower}
                </span>
              </MoveUpIn>
            </>
          )}
        </MoveUpIn>
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
        ) : showApproveALICE ? (
          <button
            onClick={() => handleApproveALICEClicked()}
            className="btn !w-full"
            disabled={isUpgradeBonALICEButtonDisabled}
          >
            Approve{' '}
            {ALICEBalance && upgradeAmount.big < ALICEBalance.big
              ? upgradeAmount.hStr + ' ALICEs'
              : 'All ALICEs'}
          </button>
        ) : showApproveLPToken ? (
          <button
            onClick={() => handleApproveLPTokenClicked()}
            className="btn !w-full"
            disabled={isUpgradeBonALICEButtonDisabled}
          >
            Approve{' '}
            {LPTokenBalance && upgradeBoostAmount.big < LPTokenBalance.big
              ? upgradeBoostAmount.hStr + ' LP Tokens'
              : 'All LP Tokens'}
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
            {(nodeBonALICE.length > 0 &&
              isSelectedUpgradeBonALICE(nodeBonALICE[0]) &&
              aliceAllowanceForMuon &&
              aliceAllowanceForMuon.big < upgradeAmount.big) ||
            (ALICEAllowance && ALICEAllowance?.big < upgradeAmount?.big)
              ? 'ALICE'
              : 'LP'}{' '}
            token to be spent by the{' '}
            {nodeBonALICE.length > 0 &&
            isSelectedUpgradeBonALICE(nodeBonALICE[0])
              ? 'Muon node staking'
              : 'Bonded ALICE'}{' '}
            Contract. Enter at least the amount you want to create and click
            Next then Approve button on metamask.
          </p>
          {(nodeBonALICE.length > 0 &&
            isSelectedUpgradeBonALICE(nodeBonALICE[0]) &&
            aliceAllowanceForMuon &&
            aliceAllowanceForMuon.big < upgradeAmount.big) ||
          (ALICEAllowance && ALICEAllowance?.big < upgradeAmount?.big) ? (
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
