// import ActionsSidebar from './ActionsSidebar.tsx';
// import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';
import { FadeIn } from '../../animations';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { useEffect } from 'react';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import { Plans } from './Plans.tsx';
import useActions from '../../contexts/Actions/useActions.ts';
import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import { useNavigate } from 'react-router-dom';
import { ActionType } from '../../types';
import strings from '../../constants/strings.ts';
import routes from '../../routes';

const Actions = () => {
  const { stakerAddressInfo } = useNodeBonALICE();
  const { setUpgradeModalSelectedBonALICE } = useUpgradeAction();
  const { muonNodeStakingUsers, nodeBonALICE } = useMuonNodeStaking();
  const { setSelectedAction } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === routes.create.path) {
      setSelectedAction(ActionType.CREATE);
    } else if (location.pathname === routes.view.path) {
      setSelectedAction(ActionType.VIEW);
    } else if (location.pathname === routes.increase.path) {
      setSelectedAction(ActionType.UPGRADE);
    } else if (location.pathname === routes.merge.path) {
      setSelectedAction(ActionType.MERGE);
    } else if (location.pathname === routes.split.path) {
      setSelectedAction(ActionType.SPLIT);
    } else if (location.pathname === routes.transfer.path) {
      setSelectedAction(ActionType.TRANSFER);
    }
  }, [setSelectedAction, location.pathname]);

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      if (muonNodeStakingUsers && muonNodeStakingUsers[4] === BigInt(0)) {
        window.open('/dashboard/', '_self');
      } else if (
        muonNodeStakingUsers &&
        muonNodeStakingUsers[4] > BigInt(0) &&
        nodeBonALICE.length > 0
      ) {
        setUpgradeModalSelectedBonALICE(nodeBonALICE[0]);
      }
    }
  }, [
    stakerAddressInfo,
    muonNodeStakingUsers,
    setSelectedAction,
    nodeBonALICE,
    setUpgradeModalSelectedBonALICE,
    navigate,
  ]);

  return (
    <div className="page__bg">
      <div className="page page--centered page--actions">
        <ConnectWalletModal />

        <FadeIn className="flex flex-col w-full gap-4 md:gap-6">
          <span className="flex justify-between w-full items-end">
            <p className="text-2xl font-medium font-tomorrow">
              Manage Bonded {strings.token} NFT
            </p>
            {muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0) && (
              <div
                className="ml-auto flex gap-1.5 items-center cursor-pointer"
                onClick={() => window.open('/dashboard/', '_self')}
              >
                <img src="/assets/images/actions/back-icon.svg" alt="" />
                <p className="font-medium text-sm underline ">
                  Back to Dashboard
                </p>
              </div>
            )}
          </span>
          <ActionsBody />
        </FadeIn>
      </div>
    </div>
  );
};

const ActionsBody = () => {
  return (
    <div className="actions-body flex md:min-h-[607px] flex-col-reverse md:flex-row w-full gap-8">
      <ActionsContent />
      <Plans />
    </div>
  );
};
export default Actions;
