import { useState } from 'react';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (location.pathname === '/pion/getting-started') return null;

  return (
    <div
      className={`sidebar z-[1000] bg-so-dark-gray w-[110px] transition-all absolute left-0 top-0 h-[100vh] ${
        isSidebarOpen && '!w-[213px]'
      }`}
    >
      <div className="sidebar__logo">
        <img src="/assets/images/logo.svg" alt="" />
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
