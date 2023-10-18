import { useState } from 'react';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (location.pathname === '/pion/getting-started') return null;

  return (
    <div
      className={`sidebar flex flex-col z-[1000] bg-so-dark-gray p-[18px] pt-6 w-[110px] transition-all absolute left-0 top-0 h-full ${
        isSidebarOpen ? '!w-[213px]' : ''
      }`}
    >
      <div
        className={`sidebar__logo flex transition-all items-center gap-4 pl-[22px] mb-10 ${
          isSidebarOpen && '!pl-0'
        }`}
      >
        <img
          src="/assets/images/sidebar/logo.svg"
          className="w-[26px] h-8"
          alt=""
        />
        {isSidebarOpen && (
          <img
            src="/assets/images/sidebar/logo-typo.svg"
            className="w-[px]"
            alt=""
          />
        )}
      </div>

      <SidebarItem
        className="mb-[18px]"
        title="Get Started"
        isSidebarOpen={isSidebarOpen}
        isActive={false}
        onClick={() => {}}
        icon="/assets/images/sidebar/get-started.svg"
      />

      <p
        className={`text-light-text text-sm pl-3.5 mb-[18px] transition-all ${
          isSidebarOpen && '!pl-0 !mb-3'
        }`}
      >
        Steps:
      </p>

      <SidebarItem
        className="mb-[18px]"
        title="Buy PION"
        isSidebarOpen={isSidebarOpen}
        isActive={false}
        onClick={() => {}}
        icon="/assets/images/sidebar/step-1.svg"
      />

      <SidebarItem
        className="mb-[18px]"
        title="Create bonPION"
        isSidebarOpen={isSidebarOpen}
        isActive={false}
        onClick={() => {}}
        icon="/assets/images/sidebar/step-2.svg"
      />

      <SidebarItem
        className="mb-[18px]"
        title="Finalize Setup"
        isSidebarOpen={isSidebarOpen}
        isActive={false}
        onClick={() => {}}
        icon="/assets/images/sidebar/step-3.svg"
      />
      <img
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute z-[1001] transition-all left-[110px] -translate-x-1/2 top-7 ${
          isSidebarOpen && 'rotate-180 left-[213px]'
        }`}
        src="/assets/images/sidebar/arrow.svg"
        alt=""
      />
    </div>
  );
};

const SidebarItem = ({
  className,
  title,
  isActive,
  isSidebarOpen,
  onClick,
  icon,
}: {
  className?: string;
  title: string;
  isActive: boolean;
  isSidebarOpen: boolean;
  onClick: () => void;
  icon: string;
}) => {
  return (
    <div
      className={`sidebar__logo flex transition-all cursor-pointer items-center group hover:text-primary-L1 gap-0 pl-1.5 mb-10 ${
        isSidebarOpen && '!pl-0 gap-4'
      } ${isActive && 'text-primary-L1'} ${className}`}
      onClick={onClick}
    >
      <div
        className={`sidebar__item flex justify-center transition-all items-center group-hover:bg-primary-L1 bg-body-background gap-3 rounded-lg w-[60px] h-[60px] ${
          isSidebarOpen && '!w-[42px] !h-[42px]'
        } ${isActive && 'bg-primary-L1'}`}
      >
        <img
          src={icon}
          className={`transition-all h-[28px] ${isSidebarOpen && '!h-[24px]'}`}
          alt=""
        />
      </div>
      <p
        className={`group-hover:text-primary-L1 text-white transition-all text-[14px] font-medium line-clamp-1 w-0 ${
          isSidebarOpen && '!w-[110px]'
        } ${isActive && 'text-primary-L1'}`}
      >
        {title}
      </p>
    </div>
  );
};
