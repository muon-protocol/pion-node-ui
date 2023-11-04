import { useLocation, useNavigate } from 'react-router-dom';
import { FadeIn, Scale } from '../../animations';
// import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
// import useALICE from '../../contexts/ALICE/useALICE.ts';
import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
import { useStats } from '../../hooks/useStats.ts';
import strings from '../../constants/strings.ts';
import routes from '../../routes';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
// import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
// import { useRef, useState } from 'react';
// import useOnClickOutside from '../../hooks/useOnClickOutside.ts';
// import { useMuonNodeStaking } from '../../hooks/muonNodeStaking/useMuonNodeStaking.ts';

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const DesktopNavbar = () => {
  // const { isConnected } = useUserProfile();
  // const { ALICEBalance } = useALICE();
  // const { bonALICEs } = useBonALICE();
  const location = useLocation();

  // const [isManageBonALICEDialogOpen, setIsManageBonALICEDialogOpen] =
  //   useState(false);

  // const ref = useRef(null);

  // const { hasNodeBonALICE } = useMuonNodeStaking();

  // useOnClickOutside(ref, () => setIsManageBonALICEDialogOpen(false));

  return (
    <FadeIn delay={0.3}>
      <div className="hidden md:flex absolute w-full navbar justify-between items-center py-9 pl-14 pr-12">
        <div className="navbar__left">
          {location.pathname === routes.migration.path && (
            <div>
              <img
                src={strings.navbar.logoSrc}
                alt={''}
                className="w-auto h-9"
              />
            </div>
          )}
        </div>
        <div className="navbar__right flex justify-end items-center gap-4">
          {location &&
            location.pathname !== routes.gettingStarted.path &&
            location.pathname !== routes.claim.path && (
              <>
                {/*<button*/}
                {/*  className="btn btn--small"*/}
                {/*  onClick={() =>*/}
                {/*    window.open(*/}
                {/*      'https://pancakeswap.finance/swap?chain=bscTestnet&outputCurrency=0xF43CD517385237fe7A48927073151D12f4eADC53&inputCurrency=tBNB',*/}
                {/*      '_blank',*/}
                {/*    )*/}
                {/*  }*/}
                {/*>*/}
                {/*  Buy PION*/}
                {/*</button>*/}

                {/*{!hasNodeBonALICE && (*/}
                {/*  <button*/}
                {/*    onClick={() =>*/}
                {/*      setIsManageBonALICEDialogOpen(!isManageBonALICEDialogOpen)*/}
                {/*    }*/}
                {/*    className="btn btn--small--with-icon relative"*/}
                {/*  >*/}
                {/*    <img*/}
                {/*      className="mr-2.5 w-6"*/}
                {/*      src="/assets/images/pion-nft.png"*/}
                {/*      alt=""*/}
                {/*    />*/}
                {/*    Manage bonPION*/}
                {/*    {isManageBonALICEDialogOpen && (*/}
                {/*      <FadeIn*/}
                {/*        duration={0.1}*/}
                {/*        delay={0.1}*/}
                {/*        className="absolute bottom-0 translate-y-[110%] right-0"*/}
                {/*      >*/}
                {/*        <div*/}
                {/*          ref={ref}*/}
                {/*          onClick={(e) => e.stopPropagation()}*/}
                {/*          className="dialog py-5 px-4 bg-primary-very-dark rounded-lg flex flex-col gap-4"*/}
                {/*        >*/}
                {/*          <div className="dialog__top flex gap-4 justify-between items-center">*/}
                {/*            <div className="dialog__top__left flex flex-col items-start gap-0">*/}
                {/*              <p className="text-sm">Balance:</p>*/}
                {/*              <p className="text-sm font-medium min-w-[100px] text-left">*/}
                {/*                {bonALICEs.length > 0*/}
                {/*                  ? bonALICEs.length + ' bonPIONs'*/}
                {/*                  : 'No bonPION'}*/}
                {/*              </p>*/}
                {/*            </div>*/}
                {/*            <div className="dialog__top__right flex items-center">*/}
                {/*              {bonALICEs.length > 0 ? (*/}
                {/*                <Link to={'/pion/bonPION/create'}>*/}
                {/*                  <button*/}
                {/*                    onClick={() =>*/}
                {/*                      setIsManageBonALICEDialogOpen(false)*/}
                {/*                    }*/}
                {/*                    className="btn btn--small"*/}
                {/*                  >*/}
                {/*                    Manage*/}
                {/*                  </button>*/}
                {/*                </Link>*/}
                {/*              ) : (*/}
                {/*                <Link to={'/pion/bonPION/create'}>*/}
                {/*                  <button*/}
                {/*                    onClick={() =>*/}
                {/*                      setIsManageBonALICEDialogOpen(false)*/}
                {/*                    }*/}
                {/*                    className="btn btn--small"*/}
                {/*                  >*/}
                {/*                    Create*/}
                {/*                  </button>*/}
                {/*                </Link>*/}
                {/*              )}*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*          <div className="dialog--bottom">*/}
                {/*            <Link to={'/pion/claim'}>*/}
                {/*              <button*/}
                {/*                onClick={() =>*/}
                {/*                  setIsManageBonALICEDialogOpen(false)*/}
                {/*                }*/}
                {/*                className="btn btn--small--with-icon !w-full"*/}
                {/*              >*/}
                {/*                <img*/}
                {/*                  className="mr-2.5"*/}
                {/*                  src="/assets/images/navbar/prize-icon.svg"*/}
                {/*                  alt=""*/}
                {/*                />*/}
                {/*                Claim Node-Drop*/}
                {/*              </button>*/}
                {/*            </Link>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*      </FadeIn>*/}
                {/*    )}*/}
                {/*  </button>*/}
                {/*)}*/}
                {/*{!hasNodeBonALICE &&*/}
                {/*  !location.pathname.includes('/bonPION/') && (*/}
                {/*    <Link*/}
                {/*      to={'/pion/bonPION/create'}*/}
                {/*      className="btn btn--small--with-icon relative"*/}
                {/*    >*/}
                {/*      <img*/}
                {/*        className="mr-2.5 w-6"*/}
                {/*        src="/assets/images/pion-nft.png"*/}
                {/*        alt=""*/}
                {/*      />*/}
                {/*      Manage bonPION*/}
                {/*    </Link>*/}
                {/*  )}*/}
                {/*{!hasNodeBonALICE ? (*/}
                {/*  <Link to="/pion/setup-node">*/}
                {/*    <button className="btn btn--small">Setup Node</button>*/}
                {/*  </Link>*/}
                {/*) : (*/}
                {/*  <div onClick={() => window.open('/dashboard/', '_self')}>*/}
                {/*    <button className="btn btn--small">Dashboard</button>*/}
                {/*  </div>*/}
                {/*)}*/}
              </>
            )}

          {/*{isConnected && ALICEBalance !== null && (*/}
          {/*  <button className="btn btn--small flex">*/}
          {/*    <img*/}
          {/*      src="/assets/images/pion-token.svg"*/}
          {/*      alt=""*/}
          {/*      className="mr-3 h-[18px]"*/}
          {/*    />*/}
          {/*    <span className="text-white">Balance: </span>*/}
          {/*    <strong className="text-white ml-2 mr-1">*/}
          {/*      {ALICEBalance.dsp}*/}
          {/*    </strong>*/}
          {/*    <strong className="text-white font-semibold">PION</strong>*/}
          {/*  </button>*/}
          {/*)}*/}
          <PriceTVLButton />
          <ConnectWalletButton />
        </div>
      </div>
    </FadeIn>
  );
};

const PriceTVLButton = () => {
  const { ALICEPrice } = useTokenPrice();
  const { stats } = useStats();
  return (
    <button className="btn btn--small !py-[5px] flex !cursor-default">
      <img src={strings.navbar.tokenLogoSrc} alt="" className="mr-2.5" />
      <p className="!text-white text-sm font-medium">
        {ALICEPrice ? `$${ALICEPrice}` : ''} (TVL:{' '}
        {stats?.total_value_locked || '...'})
      </p>
    </button>
  );
};

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { stats } = useStats();

  const navigate = useNavigate();
  const { muonNodeStakingUsers } = useMuonNodeStaking();
  const { bonALICEs } = useBonALICE();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="visible fixed w-[100vw] top-0 z-[1000] md:hidden h-14 bg-white flex items-center justify-end px-[5vw] shadow-md">
      <section className="flex gap-4 mr-auto items-center">
        <img src={strings.sidebar.logoSrc} alt="" className="h-8" />
        <img src={strings.sidebar.logoTextSrc} alt="" className="h-8" />
      </section>
      <AnimatePresence>
        {isMenuOpen ? (
          <Scale duration={0.3} key={'1'} className="absolute right-[5vw]">
            <img
              onClick={() => setIsMenuOpen(false)}
              src="/assets/images/modal/exit-dark-icon.svg"
              className="h-8 w-auto"
              alt=""
            />
          </Scale>
        ) : (
          <Scale duration={0.3} key={'2'} className="absolute">
            <img
              onClick={() => setIsMenuOpen(true)}
              src="/assets/images/navbar/hamburger-icon.png"
              className="h-8 w-auto"
              alt=""
            />
          </Scale>
        )}
      </AnimatePresence>
      <div
        className={`menu-body z-[1000] absolute top-14 h-[calc(100vh-14*4px)] flex flex-col justify-between backdrop-blur-md w-[100vw] transition-all bg-white bg-opacity-50 py-5 px-[5vw] ${
          isMenuOpen ? 'left-0' : 'left-[100vw]'
        }`}
      >
        <section>
          {muonNodeStakingUsers && muonNodeStakingUsers[4] !== BigInt(0) ? (
            <>
              <MobileNavbarItem
                icon="/assets/images/sidebar/dashboard-icon.svg"
                title={`Dashboard`}
                isActive={location.pathname === '/dashboard/'}
                onClick={() => window.open('/dashboard/', '_self')}
              />
              <MobileNavbarItem
                icon={strings.sidebar.tokenLogoSrc}
                title={`Buy ${strings.token}`}
                isActive={location.pathname === routes.buyToken.path}
                onClick={() => navigate(routes.buyToken.path)}
              />
              <MobileNavbarItem
                icon={strings.sidebar.nftLogoSrc}
                title={`Manage ${strings.nft}`}
                isActive={[
                  routes.create.path,
                  routes.view.path,
                  routes.merge.path,
                  routes.increase.path,
                  routes.split.path,
                  routes.transfer.path,
                ].includes(location.pathname)}
                onClick={() => navigate(routes.increase.path)}
              />
            </>
          ) : (
            <>
              <MobileNavbarItem
                icon="/assets/images/sidebar/get-started.svg"
                title={`Get Started`}
                isActive={location.pathname === routes.gettingStarted.path}
                onClick={() => navigate(routes.gettingStarted.path)}
              />
              <p className="text-white dark:text-gray mb-2 mt-2">Steps:</p>
              <MobileNavbarItem
                icon={'/assets/images/sidebar/step-1.svg'}
                title={`buy ${strings.token}`}
                isActive={location.pathname === routes.buyToken.path}
                onClick={() => navigate(routes.buyToken.path)}
              />
              <MobileNavbarItem
                icon="/assets/images/sidebar/step-2.svg"
                title={
                  bonALICEs.length > 0
                    ? `Manage ${strings.nft}`
                    : `Create ${strings.nft}`
                }
                isActive={[
                  routes.create.path,
                  routes.view.path,
                  routes.merge.path,
                  routes.increase.path,
                  routes.split.path,
                  routes.transfer.path,
                ].includes(location.pathname)}
                onClick={() =>
                  bonALICEs.length > 0
                    ? navigate(routes.increase.path)
                    : navigate(routes.create.path)
                }
              />
              <MobileNavbarItem
                icon="/assets/images/sidebar/step-3.svg"
                title={`Setup Node`}
                isActive={location.pathname === routes.setupNode.path}
                onClick={() => navigate(routes.setupNode.path)}
              />
            </>
          )}
        </section>

        <section className="stats w-full flex flex-col gap-6">
          <div className="stats__left flex gap-7 justify-center">
            <MobileStatItem
              value={stats?.annual_percentage_yield}
              title="Node APR"
            />
            <MobileStatItem
              value={stats?.pion_staked_in_staking}
              title="Staked"
            />
            <MobileStatItem value={stats?.total_value_locked} title="TVL" />
          </div>
          <div className="stats__left flex gap-7 justify-center">
            <MobileStatItem
              value={stats?.protocol_owned_liquidity}
              title="POL"
            />
            <MobileStatItem value={stats?.market_cap} title="MCAP" />
            <MobileStatItem value={stats?.pion_in_circulation} title="Supply" />
          </div>
        </section>
      </div>
    </div>
  );
};

const MobileNavbarItem = ({
  title,
  icon,
  isActive,
  onClick,
}: {
  title: string;
  icon: string;
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex items-center gap-3 justify-start h-14"
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center rounded-xl w-11 h-11 ${
          isActive ? 'bg-alice-primary-g2' : 'bg-black1'
        }`}
      >
        <img src={icon} className="max-w-[20px]" alt="" />
      </div>
      <p
        className={`text-white font-medium dark:text-black ${
          isActive ? '!text-alice-primary font-semibold' : ''
        }`}
      >
        {title}
      </p>
    </div>
  );
};

const MobileStatItem = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <div className="stat-item flex flex-col items-center justify-center gap-1">
      <span className="w-[76px] h-[60px] rounded-[10px] flex justify-center items-center bg-body-background dark:bg-black">
        <p className="stat-item__value font-bold text-[18px]">
          {value ? value : '...'}
        </p>
      </span>
      <p className="text-light-text dark:text-alice-primary text-sm font-semibold">
        {title}
      </p>
    </div>
  );
};

export default Navbar;
