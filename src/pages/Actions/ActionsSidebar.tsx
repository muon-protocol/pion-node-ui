import { sidebarItems } from '../../data/constants.ts';
import useActions from '../../contexts/Actions/useActions.ts';
import { useEffect, useState } from 'react';
import { ActionType, SidebarItem } from '../../types';
import { useNavigate } from 'react-router-dom';

const ActionsSidebar = () => {
  return (
    <div className="action-sidebar bg-white rounded-2xl z-[100] w-auto fixed bottom-2 left-2 right-2 flex justify-evenly px-2 pb-1.5 pt-3 md:left-0 md:right-0 md:bottom-0 md:relative md:w-auto md:rounded-2xl md:flex-col md:gap-10 md:bg-so-dark-gray md:px-4 md:py-14">
      {sidebarItems.map((item) => (
        <SidebarItem item={item} key={item.id} />
      ))}
    </div>
  );
};

const SidebarItem = ({ item }: { item: SidebarItem }) => {
  const { selectedAction } = useActions();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
    navigate('/' + item);
  };

  return (
    <div
      className={`sidebar-item flex-1 relative flex flex-col gap-1.5 md:gap-2 items-center justify-center group ${
        !item.disabled ? 'cursor-pointer' : 'cursor-default'
      }`}
      key={item.id}
      id={'sidebar-item-' + item.id}
      onClick={() =>
        !item.disabled &&
        handleSidebarItemClick(
          item.link.slice(1, item.link.length) as ActionType,
        )
      }
    >
      {item.disabled && (
        <div className="absolute top-0 -translate-y-[120%] flex flex-col items-center hidden mb-6 group-hover:flex">
          <span className="relative z-10 p-2 w-32 text-center text-xs leading-none text-primary whitespace-no-wrap bg-white font-bold rounded shadow-lg">
            Coming in 2024
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
        </div>
      )}
      <img
        src={
          (selectedAction === item.link || isHovered) && !item.disabled
            ? item.icon
            : item.grayIcon
        }
        alt={item.title}
        className={`transition-opacity top-0 w-6 h-[22px] md:h-6 z-10`}
      />
      <div
        className={`text-xs md:text-sm font-semibold transition-all text-gray3 
          ${isHovered && !item.disabled && 'md:text-white'} 
          ${selectedAction === item.link && 'md:text-white'}`}
      >
        {item.title}
      </div>
    </div>
  );
};

export default ActionsSidebar;
