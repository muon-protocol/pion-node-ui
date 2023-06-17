import { sidebarItems } from '../../data/constants.ts';
import useActions from '../../contexts/Actions/useActions.ts';
import { useEffect, useState } from 'react';
import { ActionType, SidebarItem } from '../../types';

const ActionsSidebar = () => {
  return (
    <div className="action-sidebar bg-card-bg rounded-2xl w-auto fixed bottom-2 left-2 right-2 flex justify-evenly px-2 pb-1.5 pt-3 md:left-0 md:right-0 md:bottom-0 md:relative md:w-auto md:rounded-2xl md:flex-col md:gap-10 md:bg-card-bg-70-purple md:px-4 md:py-14">
      {sidebarItems.map((item) => (
        <SidebarItem item={item} key={item.id} />
      ))}
    </div>
  );
};

const SidebarItem = ({ item }: { item: SidebarItem }) => {
  const { setSelectedAction } = useActions();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document
      .getElementById('sidebar-item-' + item.id)
      ?.addEventListener('mouseenter', () => setIsHovered(true));
    document
      .getElementById('sidebar-item-' + item.id)
      ?.addEventListener('mouseleave', () => setIsHovered(false));
  }, [isHovered, item.id]);

  const handleSidebarItemClick = (item: ActionType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedAction(item);
  };

  return (
    <div
      className="sidebar-item relative flex-1 flex flex-col gap-1.5 md:gap-2 items-center justify-center cursor-pointer"
      key={item.id}
      id={'sidebar-item-' + item.id}
      onClick={() => handleSidebarItemClick(item.link)}
    >
      <img
        src={isHovered ? item.hoverIcon : item.icon}
        alt={item.title}
        className="opacity-0 top-0 w-auto h-[22px] md:h-6"
      />
      <img
        src={item.icon}
        alt={item.title}
        className={`absolute transition-opacity top-0 w-6 h-[22px] md:h-6 z-10 ${
          isHovered ? 'md:opacity-0' : 'md:opacity-100'
        }`}
      />
      <img
        src={item.hoverIcon}
        alt={item.title}
        className={`absolute transition-opacity top-0 w-6 h-[22px] md:h-6 z-10 ${
          isHovered ? 'md:opacity-100' : 'md:opacity-0'
        }`}
      />
      <div
        className={`text-xs md:text-sm font-semibold transition-all text-white ${
          isHovered ? 'md:text-white' : 'md:text-gray-300'
        }`}
      >
        {item.title}
      </div>
    </div>
  );
};

export default ActionsSidebar;
