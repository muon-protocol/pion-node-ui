import ActionsSidebar from './ActionsSidebar.tsx';
import ActionsHeader from './ActionsHeader.tsx';
import ActionsContent from './ActionsContent.tsx';
import { FadeIn } from '../../animations';

const Actions = () => {
  return (
    <div className="page page--centered">
      <FadeIn className="flex flex-col w-[664px] gap-6">
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
