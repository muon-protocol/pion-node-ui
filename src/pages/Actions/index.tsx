import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';
import { FadeIn } from '../../animations';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { useEffect } from 'react';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';

const Actions = () => {
  const { walletAddress } = useUserProfile();
  const { stakerAddressInfo } = useNodeBonALICE();
  const { muonNodeStakingUsers } = useMuonNodeStaking(walletAddress);

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      if (muonNodeStakingUsers && muonNodeStakingUsers[0] === BigInt(0)) {
        console.log(muonNodeStakingUsers);
        window.open('/dashboard', '_self');
      }
    }
  }, [stakerAddressInfo, muonNodeStakingUsers]);

  return (
    <div className="page__bg">
      <div className="page page--centered">
        <ConnectWalletModal />

        <FadeIn className="flex flex-col w-[664px] gap-2 md:gap-6">
          <ActionsHeader />
          <ActionsBody />
        </FadeIn>
      </div>
    </div>
  );
};

const ActionsBody = () => {
  return (
    <div className="actions-body flex flex-col-reverse md:flex-row w-full gap-10">
      <ActionsSidebar />
      <ActionsContent />
    </div>
  );
};
export default Actions;
