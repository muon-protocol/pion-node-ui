import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';

const Actions = () => {
  return (
    <div className="page page--centered">
      <div className="flex flex-col w-[664px]">
        <ActionsHeader />
        <div className="flex w-full gap-10">
          <ActionsSidebar />
          <ActionsContent />
        </div>
      </div>
    </div>
  );
};

export default Actions;
