import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';
import { FadeIn } from '../../animations';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { useEffect } from 'react';

const Actions = () => {
  const { stakerAddressInfo } = useNodeBonALICE();

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      window.open('/dashboard', '_self');
    }
  }, [stakerAddressInfo]);

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
