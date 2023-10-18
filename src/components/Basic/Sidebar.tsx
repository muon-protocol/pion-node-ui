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
        className={`sidebar__logo flex transition-all items-center gap-4 pl-[22px] ${
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
