import { sidebarItems } from '../../data/constants.ts';
import useActions from '../../contexts/Actions/useActions.ts';

const ActionsSidebar = () => {
  const { setSelectedAction } = useActions();

  return (
    <div className="action-sidebar bg-card-bg-70-purple px-4 py-14 rounded-2xl flex flex-col gap-10">
      {sidebarItems.map((item) => (
        <div
          className="flex flex-col gap-2 items-center justify-center cursor-pointer"
          key={item.id}
          onClick={() => setSelectedAction(item.link)}
        >
          <img src={item.icon} alt={item.title} width="auto" height="24px" />
          <div className="text-white text-sm font-semibold">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default ActionsSidebar;
