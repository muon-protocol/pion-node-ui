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
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { useALICEAllowance } from '../../hooks/alice/useALICEAllowance.ts';
// import { useLPTokenAllowance } from '../../hooks/lpToken/useLPTokenAllowance.ts';
import BoostingAmountInput from '../../components/Common/BoostingAmountInput.tsx';
import { useBooster } from '../../hooks/booster/useBooster.ts';
// import { usePancakePair } from '../../hooks/pancakePair/usePancakePair.ts';
import { w3bNumberFromBigint, w3bNumberFromNumber } from '../../utils/web3.ts';
import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
import UpgradeAmountCalculation from './UpgradeAmountCalculation.tsx';
import strings from '../../constants/strings.ts';
import UpgradeAllowanceModalBody from './UpgradeAllowanceModalBody.tsx';

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
    handleApproveLPTokenClicked,
    handleApproveALICEClicked,
    isAllowanceModalOpen,
    closeAllowanceModal,
  } = useUpgradeAction();

  const { ALICEBalance } = useALICE();
  const { bonALICEs, ALICEAllowance, LPTokenAllowanceForBooster } =
    useBonALICE();

  const { allowanceForMuonNodeStaking: aliceAllowanceForMuon } =
    useALICEAllowance();
  // const { allowanceForMuonNodeStaking: lpTokenAllowanceForMuon } =
  //   useLPTokenAllowance();

  const { boostableAmount } = useBooster(selectedUpgradeBonALICE?.tokenId);

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
    if (LPTokenAllowanceForBooster)
      return LPTokenAllowanceForBooster.big < upgradeBoostAmount.big;
    return false;
  }, [LPTokenAllowanceForBooster, upgradeBoostAmount]);

  const { boostCoefficient } = useBooster();
  const { ALICEPrice } = useTokenPrice();

  const maxAmountToBoost = useMemo(() => {
    return ALICEPrice && boostableAmount
      ? w3bNumberFromBigint(
          ((boostableAmount.big + upgradeAmount.big) *
            w3bNumberFromNumber(ALICEPrice).big) /
            BigInt(10 ** 18),
        )
      : w3bNumberFromNumber(0);
  }, [boostableAmount, upgradeAmount, ALICEPrice]);

  const isUpgradeBonALICEButtonDisabled = useMemo(() => {
    return (
      !selectedUpgradeBonALICE ||
      !(upgradeAmount || upgradeBoostAmount) ||
      !(upgradeAmount.hStr || upgradeBoostAmount.hStr) ||
      !ALICEBalance?.hStr ||
      upgradeAmount.big > ALICEBalance.big ||
      !LPTokenBalance ||
      upgradeBoostAmount.big > LPTokenBalance.big ||
      (ALICEPrice !== undefined &&
        boostableAmount &&
        upgradeBoostAmount.big > maxAmountToBoost.big)
    );
  }, [
    selectedUpgradeBonALICE,
    upgradeAmount,
    upgradeBoostAmount,
    ALICEBalance?.hStr,
    ALICEBalance?.dsp,
    LPTokenBalance,
    ALICEPrice,
    boostableAmount,
    maxAmountToBoost.big,
  ]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title={`Select ${strings.nft}`}
          onClick={() => openUpgradeModal()}
          isModalOpen={isUpgradeModalOpen}
          closeModalHandler={() => closeUpgradeModal()}
          modalTitle={
            [...nodeBonALICE, ...bonALICEs].length > 0
              ? `Select ${strings.nft}`
              : `No ${strings.nft} to Upgrade`
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
          rightText={strings.token}
          balance={ALICEBalance}
          value={upgradeAmount}
          onValueChanged={handleUpgradeAmountChange}
          disabled={!selectedUpgradeBonALICE}
        />
      </FadeIn>
      <FadeIn className="mb-4" duration={0.1} delay={0.1}>
        <BoostingAmountInput
          withLink
          rightText={'USDC'}
          balance={LPTokenBalance}
          value={upgradeBoostAmount}
          max={maxAmountToBoost}
          boostCoefficient={boostCoefficient}
          onValueChanged={handleUpgradeBoostAmountChange}
          disabled={!maxAmountToBoost || maxAmountToBoost.big === BigInt(0)}
        />
      </FadeIn>

      {selectedUpgradeBonALICE && (
        <MoveUpIn y={-10} className="mb-6" duration={0.1} delay={0.3}>
          <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
            <p className="font-light">Current ${strings.nft} amount:</p>
            <p className="font-medium">{selectedUpgradeBonALICE.nodePower}</p>
          </span>
          <UpgradeAmountCalculation />
        </MoveUpIn>
      )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] md:mx-auto !w-full"
      >
        {(ALICEBalance && upgradeAmount.dsp > ALICEBalance.dsp) ||
        (LPTokenBalance && upgradeBoostAmount.dsp > LPTokenBalance.dsp) ? (
          <button
            className="btn btn--action min-w-[360px] mx-auto !py-4"
            disabled
          >
            Insufficient Funds
          </button>
        ) : chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn btn--action min-w-[360px] mx-auto !py-4"
          >
            Switch Network
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button
            className="btn btn--action min-w-[360px] mx-auto !py-4"
            disabled
          >
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : showApproveALICE ? (
          <button
            onClick={() => handleApproveALICEClicked()}
            className="btn btn--action min-w-[360px] mx-auto !py-4"
            disabled={isUpgradeBonALICEButtonDisabled}
          >
            Approve{' '}
            {ALICEBalance && upgradeAmount.big < ALICEBalance.big
              ? upgradeAmount.hStr + ` ${strings.nft}`
              : `All ${strings.token}`}
          </button>
        ) : showApproveLPToken ? (
          <button
            onClick={() => handleApproveLPTokenClicked()}
            className="btn btn--action min-w-[360px] mx-auto !py-4"
            disabled={isUpgradeBonALICEButtonDisabled}
          >
            Approve{' '}
            {LPTokenBalance && upgradeBoostAmount.big < LPTokenBalance.big
              ? upgradeBoostAmount.hStr + ' USDC'
              : 'All USDC'}
          </button>
        ) : (
          <button
            onClick={() => handleUpgradeBonALICEClicked()}
            disabled={isUpgradeBonALICEButtonDisabled}
            className="btn btn--action min-w-[360px] mx-auto !py-4"
          >
            Increase Bonded {strings.token}
          </button>
        )}
      </FadeIn>
      <Modal
        size="sm"
        isOpen={isAllowanceModalOpen}
        closeModalHandler={closeAllowanceModal}
      >
        <UpgradeAllowanceModalBody />
      </Modal>
    </>
  );
};
