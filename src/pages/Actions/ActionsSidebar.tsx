import { sidebarItems } from '../../data/constants.ts';
import useActions from '../../contexts/Actions/useActions.ts';
import { useEffect, useState } from 'react';
import { SidebarItem } from '../../types';

const ActionsSidebar = () => {
  return (
    <div className="action-sidebar bg-card-bg-70-purple px-4 py-14 rounded-2xl flex flex-col gap-10">
      {sidebarItems.map((item) => (
        <SidebarItem item={item} />
      ))}
    </div>
  );
};

const SidebarItem = ({ item }: { item: SidebarItem }) => {
  const { setSelectedAction } = useActions();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      document
        .getElementById('sidebar-item-' + item.id)
        ?.addEventListener('mouseenter', () => setIsHovered(true));
      document
        .getElementById('sidebar-item-' + item.id)
        ?.addEventListener('mouseleave', () => setIsHovered(false));
    });
  }, [isHovered, item.id]);

  return (
    <div
      className="sidebar-item relative flex flex-col gap-2 items-center justify-center cursor-pointer"
      key={item.id}
      id={'sidebar-item-' + item.id}
      onClick={() => setSelectedAction(item.link)}
    >
      <img
        src={isHovered ? item.hoverIcon : item.icon}
        alt={item.title}
        className="opacity-0 top-0 w-auto h-6"
      />
      <img
        src={item.icon}
        alt={item.title}
        className={`absolute transition-opacity top-0 w-6 h-6 z-10 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={item.hoverIcon}
        alt={item.title}
        className={`absolute transition-opacity top-0 w-6 h-6 z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="text-white text-sm font-semibold">{item.title}</div>
    </div>
  );
};

export default ActionsSidebar;
