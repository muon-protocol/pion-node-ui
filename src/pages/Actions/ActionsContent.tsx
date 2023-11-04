import { RenderCreateBody } from './CreateAction.tsx';
import { RenderUpgradeBody } from './UpgradeAction.tsx';
import RenderMergeBody from './MergeAction.tsx';
import RenderSplitBody from './SplitAction.tsx';
import RenderTransferBody from './TransferAction.tsx';
import RenderViewBody from './ViewAction.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsSidebar from './ActionsSidebar.tsx';
import routes from '../../routes';

const ActionsContent = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-md:min-w-[90vw] md:min-w-[607px]">
      <ActionsSidebar />

      <ActionsHeader />

      <div className="actions-content dark:bg-alice-body-background dark:shadow-lg w-full px-4 py-5 max-md:min-w-[90vw] max-md:max-w-[90vw] md:min-w-[607px] min-h-[464px] md:min-h-[528px] md:max-h-[624px] overflow-hidden md:px-11 md:py-10 rounded-2xl flex flex-col">
        {location.pathname === routes.view.path ? (
          <RenderViewBody />
        ) : location.pathname === routes.create.path ? (
          <RenderCreateBody />
        ) : location.pathname === routes.increase.path ? (
          <RenderUpgradeBody />
        ) : location.pathname === routes.merge.path ? (
          <RenderMergeBody />
        ) : location.pathname === routes.split.path ? (
          <RenderSplitBody />
        ) : location.pathname === routes.transfer.path ? (
          <RenderTransferBody />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ActionsContent;
