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
import { ActionType } from '../../types';

const Actions = () => {
  const { stakerAddressInfo } = useNodeBonALICE();
  const { muonNodeStakingUsers } = useMuonNodeStaking();
  const { setSelectedAction } = useActions();

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      if (muonNodeStakingUsers && muonNodeStakingUsers[4] === BigInt(0)) {
        window.open('/dashboard', '_self');
      } else {
        setSelectedAction(ActionType.UPGRADE);
      }
    }
  }, [stakerAddressInfo, muonNodeStakingUsers, setSelectedAction]);

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
