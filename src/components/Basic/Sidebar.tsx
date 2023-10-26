import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionType } from '../../types';
import { useStats } from '../../hooks/useStats.ts';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { FadeIn } from '../../animations';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { stats } = useStats();

  useEffect(() => {
    if (location.pathname) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const { nodeBonALICE } = useMuonNodeStaking();
  const { bonALICEs } = useBonALICE();
  const { muonNodeStakingUsers } = useMuonNodeStaking();

  return (
    <div
      className={`sidebar max-md:hidden z-[1000] bg-[#18171a] transition-all ease-in sticky duration-[0.2s] left-0 top-0 h-[100vh] ${
        isSidebarOpen ? '!w-[213px]' : ''
      }`}
    >
      <span
        className={`h-full flex flex-col py-[18px] pl-[18px] pt-6 w-[110px] transition-all ease-in duration-[0.2s] overflow-y-auto overflow-x-hidden no-scrollbar ${
          isSidebarOpen ? '!w-[213px]' : ''
        }`}
      >
        <div
          className={`sidebar__logo flex transition-all ease-in duration-[0.2s] items-center gap-4 pl-[22px] mb-10 ${
            isSidebarOpen && '!pl-0'
          }`}
          onClick={() => navigate('/pion/getting-started')}
        >
          <img
            src="/assets/images/sidebar/logo.svg"
            className="w-[26px] h-8"
            alt=""
          />
          {isSidebarOpen && (
            <img
              src="/assets/images/sidebar/logo-typo.svg"
              className=""
              alt=""
            />
          )}
        </div>

        {!(muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0)) && (
          <SidebarItem
            className="mb-[18px]"
            title="Get Started"
            isSidebarOpen={isSidebarOpen}
            isActive={location.pathname === '/pion/getting-started'}
            onClick={() => navigate('/pion/getting-started')}
            icon="/assets/images/sidebar/get-started.svg"
          />
        )}

        {muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0) ? (
          <SidebarItem
            className="mb-[18px]"
            title="Dashboard"
            isSidebarOpen={isSidebarOpen}
            isActive={location.pathname === '/dashboard/'}
            onClick={() => window.open('/dashboard/', '_self')}
            icon="/assets/images/sidebar/dashboard-icon.svg"
          />
        ) : (
          <p
            className={`text-light-text text-sm pl-3.5 mb-[18px] transition-all ease-in duration-[0.2s] ${
              isSidebarOpen && '!pl-0 !mb-3'
            }`}
          >
            Steps:
          </p>
        )}
        <SidebarItem
          className="mb-[18px]"
          title="Buy PION"
          isSidebarOpen={isSidebarOpen}
          isActive={location.pathname === '/pion/buy-pion'}
          onClick={() => navigate('/pion/buy-pion')}
          icon={
            muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0)
              ? '/assets/images/navbar/pion-rounded-logo.svg'
              : '/assets/images/sidebar/step-1.svg'
          }
        />

        <SidebarItem
          className="mb-[18px]"
          title={
            bonALICEs.length + nodeBonALICE.length > 0
              ? 'Manage bonPION'
              : 'Create bonPION'
          }
          isSidebarOpen={isSidebarOpen}
          isActive={[
            ActionType.VIEW,
            ActionType.CREATE,
            ActionType.UPGRADE,
            ActionType.MERGE,
            ActionType.TRANSFER,
            ActionType.SPLIT,
          ].includes(location.pathname as ActionType)}
          onClick={() => {
            if (bonALICEs.length + nodeBonALICE.length > 0) {
              navigate('/pion/bonPION/increase');
            } else {
              navigate('/pion/bonPION/create');
            }
          }}
          icon={
            muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0)
              ? '/assets/images/pion-nft-2.svg'
              : '/assets/images/sidebar/step-2.svg'
          }
        />
        {!(muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0)) && (
          <SidebarItem
            className="mb-10"
            title="Finalize Setup"
            isSidebarOpen={isSidebarOpen}
            isActive={location.pathname === '/pion/setup-node'}
            onClick={() => navigate('/pion/setup-node')}
            icon="/assets/images/sidebar/step-3.svg"
          />
        )}

        <section className="stats w-full flex gap-6 mb-7 mt-auto">
          <div className="stats__left flex flex-col gap-3">
            <StatItem value={stats?.annual_percentage_yield} title="Nope APR" />
            <StatItem value={stats?.pion_staked_in_staking} title="Staked" />
            <StatItem value={stats?.total_value_locked} title="TVL" />
          </div>
          {isSidebarOpen && (
            <FadeIn duration={0.3} delay={0.1}>
              <div className="stats__left flex flex-col gap-3">
                <StatItem value={stats?.protocol_owned_liquidity} title="POL" />
                <StatItem value={stats?.market_cap} title="MCAP" />
                <StatItem value={stats?.pion_in_circulation} title="Supply" />
              </div>
            </FadeIn>
          )}
        </section>

        {/*<section className="links flex flex-col gap-3 w-full items-center">*/}
        {/*  <p*/}
        {/*    className={`cursor-pointer text-center h-0 underline text-light-text font-medium hover:text-white transition-all ease-in duration-[0.1s] line-clamp-1 opacity-0 ${*/}
        {/*      isSidebarOpen && 'opacity-100 !h-5'*/}
        {/*    }`}*/}
        {/*  >*/}
        {/*    Muon Explorer*/}
        {/*  </p>*/}
        {/*  <p*/}
        {/*    className={`cursor-pointer text-center h-0 underline text-light-text font-medium hover:text-white transition-all ease-in duration-[0.1s] line-clamp-1 opacity-0 ${*/}
        {/*      isSidebarOpen && 'opacity-100 !h-5'*/}
        {/*    }`}*/}
        {/*  >*/}
        {/*    Build on Muon*/}
        {/*  </p>*/}
        {/*</section>*/}
        <img
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute z-[1001] transition-all ease-in duration-[0.2s] left-[110px] cursor-pointer -translate-x-1/2 top-7 ${
            isSidebarOpen && 'rotate-180 left-[213px]'
          }`}
          src="/assets/images/sidebar/arrow.svg"
          alt=""
        />
      </span>
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
      className={`sidebar__logo relative flex transition-all ease-in duration-[0.2s] cursor-pointer items-center group hover:text-primary-L1 gap-0 pl-1.5 mb-10 ${
        isSidebarOpen && '!pl-0 gap-4'
      } ${isActive && 'text-primary-L1'} ${className}`}
      onClick={onClick}
    >
      <div
        className={`sidebar__item flex justify-center transition-all ease-in duration-[0.2s] items-center group-hover:bg-primary-L1 bg-so-dark-gray gap-3 rounded-lg w-[60px] h-[60px] ${
          isSidebarOpen && '!w-[42px] !h-[42px]'
        } ${isActive && '!bg-primary-L1'}`}
      >
        <img
          src={icon}
          className={`transition-all ease-in duration-[0.2s] h-[28px] ${
            isSidebarOpen && '!h-[24px]'
          }`}
          alt=""
        />
      </div>
      <p
        className={`group-hover:text-primary-L1 text-white transition-all ease-in duration-[0.2s] text-[14px] font-medium line-clamp-1 w-0 opacity-0 ${
          isSidebarOpen && '!w-[125px] opacity-100'
        } ${isActive && '!text-primary-L1 !font-bold'}`}
      >
        {title}
      </p>

      {!isSidebarOpen && (
        <span className="fixed bg-light-text left-[92px] w-0 rounded transition-all ease-in duration-[0.2s] opacity-0 group-hover:w-max group-hover:p-3 group-hover:opacity-100">
          <p
            className={`text-black transition-all ease-out duration-300 text-sm font-medium line-clamp-1 w-full ${
              isActive && 'text-primary !font-bold'
            }`}
          >
            {title}
          </p>
        </span>
      )}
    </div>
  );
};

const StatItem = ({
  value,
  title,
}: {
  value: string | undefined;
  title: string;
}) => {
  return (
    <div className="stat-item flex flex-col items-center justify-center gap-1">
      <span className="w-[76px] h-[60px] rounded-[10px] flex justify-center items-center bg-body-background">
        <p className="stat-item__value font-bold text-[18px]">
          {value ? value : '...'}
        </p>
      </span>
      <p className="text-light-text text-sm">{title}</p>
    </div>
  );
};
