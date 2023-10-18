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
        className="mb-16"
        title="Finalize Setup"
        isSidebarOpen={isSidebarOpen}
        isActive={false}
        onClick={() => {}}
        icon="/assets/images/sidebar/step-3.svg"
      />

      <section className="stats w-full flex gap-3 mb-8">
        <div className="stats__left flex flex-col gap-3">
          <StatItem value="25%" title="Nope APR" />
          <StatItem value="1M" title="Staked" />
          <StatItem value="$4M" title="TVL" />
        </div>
        {isSidebarOpen && (
          <div className="stats__right">
            <div className="stats__left flex flex-col gap-3">
              <StatItem value="$1M" title="POL" />
              <StatItem value="$15M" title="MCAP" />
              <StatItem value="250K" title="Supply" />
            </div>
          </div>
        )}
      </section>

      {isSidebarOpen && (
        <section className="links flex flex-col gap-3 w-full items-center">
          <p className="cursor-pointer underline text-light-text font-medium hover:text-white transition-all">
            Muon Explorer
          </p>
          <p className="cursor-pointer underline text-light-text font-medium hover:text-white transition-all">
            Build on Muon
          </p>
        </section>
      )}
      <img
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute z-[1001] transition-all left-[110px] cursor-pointer -translate-x-1/2 top-7 ${
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

const StatItem = ({ value, title }: { value: string; title: string }) => {
  return (
    <div className="stat-item flex flex-col items-center justify-center gap-1">
      <span className="w-[76px] h-[60px] rounded-[10px] flex justify-center items-center bg-body-background">
        <p className="stat-item__value font-bold text-[22px]">{value}</p>
      </span>
      <p className="text-light-text text-sm">{title}</p>
    </div>
  );
};
