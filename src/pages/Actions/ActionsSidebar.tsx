// import { sidebarItems } from '../../data/constants.ts';
import useActions from '../../contexts/Actions/useActions.ts';
import { useEffect, useMemo, useState } from 'react';
import { ActionType, SidebarItem } from '../../types';
import { useNavigate } from 'react-router-dom';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';

const ActionsSidebar = () => {
  const { bonALICEs } = useBonALICE();

  const sidebarItems: SidebarItem[] = useMemo(
    () => [
      {
        id: 0,
        title: 'View',
        icon: '/assets/images/actions/view-icon.svg',
        hoverIcon: '/assets/images/actions/view-colored-icon.svg',
        link: ActionType.VIEW,
        grayIcon: '/assets/images/actions/view-gray-icon.svg',
        disabled: false,
        disabledMessage: '',
      },
      {
        id: 1,
        title: 'Create',
        icon: '/assets/images/actions/create-icon.svg',
        hoverIcon: '/assets/images/actions/create-colored-icon.svg',
        link: ActionType.CREATE,
        grayIcon: '/assets/images/actions/create-gray-icon.svg',
        disabled: false,
        disabledMessage: '',
      },
      {
        id: 2,
        title: 'Increase',
        icon: '/assets/images/actions/upgrade-icon.svg',
        hoverIcon: '/assets/images/actions/upgrade-colored-icon.svg',
        link: ActionType.UPGRADE,
        grayIcon: '/assets/images/actions/upgrade-gray-icon.svg',
        disabled: bonALICEs.length === 0,
        disabledMessage: 'Create a bonPION first',
        disabledIcon: '/assets/images/actions/upgrade-disabled-icon.svg',
      },
      {
        id: 3,
        title: 'Merge',
        icon: '/assets/images/actions/merge-icon.svg',
        hoverIcon: '/assets/images/actions/merge-colored-icon.svg',
        link: ActionType.MERGE,
        grayIcon: '/assets/images/actions/merge-gray-icon.svg',
        disabled: bonALICEs.length < 2,
        disabledMessage: 'You should have at least 2 BonPIONs',
        disabledIcon: '/assets/images/actions/merge-disabled-icon.svg',
      },
      {
        id: 4,
        title: 'Split',
        icon: '/assets/images/actions/split-icon.svg',
        hoverIcon: '/assets/images/actions/split-colored-icon.svg',
        link: ActionType.SPLIT,
        grayIcon: '/assets/images/actions/split-gray-icon.svg',
        disabled: true,
        disabledMessage: 'Coming in 2024',
        disabledIcon: '/assets/images/actions/split-gray-icon.svg',
      },
      {
        id: 5,
        title: 'Transfer',
        icon: '/assets/images/actions/transfer-icon.svg',
        hoverIcon: '/assets/images/actions/transfer-colored-icon.svg',
        link: ActionType.TRANSFER,
        grayIcon: '/assets/images/actions/transfer-gray-icon.svg',
        disabled: true,
        disabledMessage: 'Coming in 2024',
        disabledIcon: '/assets/images/actions/transfer-gray-icon.svg',
      },
    ],
    [bonALICEs],
  );

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
            {item.disabledMessage}
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
        </div>
      )}
      <img
        src={
          item.disabled
            ? item.disabledIcon
            : (selectedAction === item.link || isHovered) && !item.disabled
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
