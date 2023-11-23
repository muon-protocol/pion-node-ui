// import { sidebarItems } from '../../data/constants.ts';
import { useEffect, useMemo, useState } from 'react';
import { SidebarItem } from '../../types';
import { useNavigate } from 'react-router-dom';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import strings from '../../constants/strings.ts';
import routes from '../../routes';

const ActionsSidebar = () => {
  const { bonALICEs } = useBonALICE();
  const { nodeBonALICE } = useMuonNodeStaking();

  const sidebarItems: SidebarItem[] = useMemo(
    () => [
      {
        id: 0,
        title: 'View',
        icon: strings.actions.view.icon,
        hoverIcon: strings.actions.view.hoverIcon,
        link: routes.view.path,
        grayIcon: strings.actions.view.grayIcon,
        disabled: false,
        disabledMessage: '',
      },
      {
        id: 1,
        title: 'Create',
        icon: strings.actions.create.icon,
        hoverIcon: strings.actions.create.hoverIcon,
        link: routes.create.path,
        grayIcon: strings.actions.create.grayIcon,
        disabled: false,
        disabledMessage: '',
      },
      {
        id: 2,
        title: 'Boost',
        icon: strings.actions.increase.icon,
        hoverIcon: strings.actions.increase.hoverIcon,
        link: routes.increase.path,
        grayIcon: strings.actions.increase.grayIcon,
        disabled: bonALICEs.length + nodeBonALICE.length === 0,
        disabledMessage: `Create a ${strings.nft} first`,
        disabledIcon: strings.actions.increase.disabledIcon,
      },
      {
        id: 3,
        title: 'Merge',
        icon: strings.actions.merge.icon,
        hoverIcon: strings.actions.merge.hoverIcon,
        link: routes.merge.path,
        grayIcon: strings.actions.merge.grayIcon,
        disabled: bonALICEs.length + nodeBonALICE.length < 2,
        disabledMessage: `Requires at least 2 ${strings.nfts}`,
        disabledIcon: strings.actions.merge.disabledIcon,
      },
      {
        id: 4,
        title: 'Split',
        icon: strings.actions.split.icon,
        hoverIcon: strings.actions.split.hoverIcon,
        link: routes.split.path,
        grayIcon: strings.actions.split.grayIcon,
        disabled: true,
        disabledMessage: 'Coming in 2024',
        disabledIcon: strings.actions.split.disabledIcon,
      },
      {
        id: 5,
        title: 'Transfer',
        icon: strings.actions.transfer.icon,
        hoverIcon: strings.actions.transfer.hoverIcon,
        link: routes.transfer.path,
        grayIcon: strings.actions.transfer.grayIcon,
        disabled: true,
        disabledMessage: 'Coming in 2024',
        disabledIcon: strings.actions.transfer.disabledIcon,
      },
    ],
    [bonALICEs, nodeBonALICE],
  );

  return (
    <div className="action-sidebar dark:shadow-lg bg-white rounded-2xl z-[100] w-auto fixed bottom-2 left-2 right-2 flex justify-evenly px-2 pb-1.5 pt-3 md:left-0 md:right-0 md:bottom-0 md:relative md:rounded-2xl md:flex md:gap-8 md:bg-so-dark-gray md:dark:bg-alice-card-background md:px-4 md:py-5 md:w-full">
      {sidebarItems.map((item) => (
        <SidebarItem item={item} key={item.id} />
      ))}
    </div>
  );
};

const SidebarItem = ({ item }: { item: SidebarItem }) => {
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

  const handleSidebarItemClick = (item: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(item);
  };

  return (
    <div
      className={`sidebar-item flex-1 relative flex flex-col gap-1.5 md:gap-2 items-center justify-center group ${
        !item.disabled ? 'cursor-pointer' : 'cursor-default'
      }`}
      key={item.id}
      id={'sidebar-item-' + item.id}
      onClick={() => !item.disabled && handleSidebarItemClick(item.link)}
    >
      {item.disabled && (
        <div className="absolute top-0 -translate-y-[115%] flex-col items-center flex transition-all opacity-0 mb-6 group-hover:opacity-100 group-hover:-translate-y-[125%]">
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
            : (location.pathname === item.link || isHovered) && !item.disabled
            ? item.icon
            : item.grayIcon
        }
        alt={item.title}
        className={`transition-opacity top-0 w-6 h-[22px] md:h-6 z-10`}
      />
      <div
        className={`text-xs md:text-sm font-semibold transition-all text-gray3 
          ${
            isHovered &&
            !item.disabled &&
            'md:text-white md:dark:text-alice-primary'
          }
          ${
            location.pathname === item.link &&
            'md:text-white md:dark:text-alice-primary'
          }`}
      >
        {item.title}
      </div>
    </div>
  );
};

export default ActionsSidebar;
