import strings from '../../constants/strings.ts';
import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import { useMemo } from 'react';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useALICEAllowance } from '../../hooks/alice/useALICEAllowance.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';

const UpgradeAllowanceModalBody = () => {
  const {
    isSelectedUpgradeBonALICE,
    upgradeAmount,
    upgradeBoostAmount,
    handleApproveLPTokenClicked,
    handleApproveALICEClicked,
    isApproveTransactionLoading,
    isApproveMetamaskLoading,
  } = useUpgradeAction();

  const { ALICEAllowance, LPTokenAllowanceForBooster } = useBonALICE();

  const { allowanceForMuonNodeStaking: aliceAllowanceForMuon } =
    useALICEAllowance();

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

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-[108px] mb-10"
        src="/assets/images/claim/switch-wallet-modal-icon.svg"
        alt=""
      />
      <p className="text-center text-black mb-6">
        You need to approve the{' '}
        {showApproveALICE
          ? `${strings.token} `
          : showApproveLPToken
          ? 'USDC '
          : 'tokens '}
        to be spent by the{' '}
        {nodeBonALICE.length > 0 && isSelectedUpgradeBonALICE(nodeBonALICE[0])
          ? showApproveALICE
            ? 'Muon node staking '
            : 'Booster '
          : `Bonded ${strings.token} `}
        Contract. Enter at least the amount you want to boost and click Next
        then Approve button on metamask.
      </p>
      {(nodeBonALICE.length > 0 &&
        isSelectedUpgradeBonALICE(nodeBonALICE[0]) &&
        aliceAllowanceForMuon &&
        aliceAllowanceForMuon.big < upgradeAmount.big) ||
      (ALICEAllowance && ALICEAllowance?.big < upgradeAmount?.big) ? (
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

export default UpgradeAllowanceModalBody;
