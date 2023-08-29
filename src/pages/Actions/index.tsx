import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
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

const Actions = () => {
  const { stakerAddressInfo } = useNodeBonALICE();
  const { setUpgradeModalSelectedBonALICE } = useUpgradeAction();
  const { muonNodeStakingUsers, nodeBonALICE } = useMuonNodeStaking();
  const { setSelectedAction } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/create') {
      setSelectedAction(ActionType.CREATE);
    } else if (location.pathname === '/upgrade') {
      setSelectedAction(ActionType.UPGRADE);
    } else if (location.pathname === '/merge') {
      setSelectedAction(ActionType.MERGE);
    } else if (location.pathname === '/split') {
      setSelectedAction(ActionType.SPLIT);
    } else if (location.pathname === '/transfer') {
      setSelectedAction(ActionType.TRANSFER);
    }
  }, [setSelectedAction, location.pathname]);

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      if (muonNodeStakingUsers && muonNodeStakingUsers[4] === BigInt(0)) {
        window.open('/dashboard', '_self');
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
      <div className="page page--centered">
        <ConnectWalletModal />

        <FadeIn className="flex flex-col w-[1130px] gap-4 md:gap-5">
          <ActionsHeader />
          <ActionsBody />
        </FadeIn>
      </div>
    </div>
  );
};

const ActionsBody = () => {
  return (
    <div className="actions-body flex flex-col-reverse md:flex-row w-full gap-9">
      <ActionsSidebar />
      <ActionsContent />
      <Plans />
    </div>
  );
};
export default Actions;
