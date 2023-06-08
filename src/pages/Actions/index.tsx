import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';

const Actions = () => {
  return (
    <div className="page page--centered">
      <div className="flex flex-col w-[664px]">
        <div>
          <ActionsHeader />
        </div>
        <div className="flex">
          <ActionsSidebar />
          <ActionsContent />
        </div>
      </div>
    </div>
  );
};

export default Actions;
