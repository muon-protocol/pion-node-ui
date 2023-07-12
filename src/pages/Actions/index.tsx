import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';
import { FadeIn } from '../../animations';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';

const Actions = () => {
  const windowHight = window.innerHeight;
  const bodyHeight = windowHight - 108 - 70;

  return (
    <div style={{ minHeight: bodyHeight }} className="page page--centered">
      <ConnectWalletModal />

      <FadeIn className="flex flex-col w-[664px] gap-2 md:gap-6">
        <ActionsHeader />
        <ActionsBody />
      </FadeIn>
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
