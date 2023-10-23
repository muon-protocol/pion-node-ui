import { useLocation } from 'react-router-dom';
import { FadeIn } from '../../animations';
// import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
// import useALICE from '../../contexts/ALICE/useALICE.ts';
import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import { useTokenPrice } from '../../hooks/tokenPrice/useTokenPrice.ts';
import { useStats } from '../../hooks/useStats.ts';
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
          {/*<Link to={'/pion/getting-started'}>*/}
          {/*  <img*/}
          {/*    src="/assets/images/navbar/pion-logo.svg"*/}
          {/*    alt={''}*/}
          {/*    className="w-auto h-9"*/}
          {/*  />*/}
          {/*</Link>*/}
        </div>
        <div className="navbar__right flex justify-end items-center gap-4">
          {location &&
            location.pathname !== '/pion/getting-started' &&
            location.pathname !== '/pion/claim' && (
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
      <img
        src="/assets/images/navbar/pion-rounded-logo.svg"
        alt=""
        className="mr-2.5"
      />
      <p className="text-white text-sm font-medium">
        {ALICEPrice ? `$${ALICEPrice}` : ''} (TVL:{' '}
        {stats?.total_value_locked || '...'})
      </p>
    </button>
  );
};

const MobileNavbar = () => {
  return <div className="visible md:hidden"></div>;
};
export default Navbar;
