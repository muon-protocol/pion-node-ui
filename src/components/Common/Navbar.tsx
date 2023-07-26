import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useState } from 'react';

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const DesktopNavbar = () => {
  const { isConnected } = useUserProfile();
  const { ALICEBalance } = useALICE();
  const { bonALICEs } = useBonALICE();

  const [isManageBonALICEDialogOpen, setIsManageBonALICEDialogOpen] =
    useState(false);

  return (
    <FadeIn delay={0.3}>
      <div className="hidden md:flex navbar justify-between items-center py-9 pl-14 pr-12">
        <div className="navbar__left">
          <Link to={'/'}>
            <img
              src="/assets/images/navbar/Alice_Logo.png"
              alt={''}
              className="w-auto h-9"
            />
          </Link>
        </div>
        <div className="navbar__right flex justify-end items-center gap-4">
          <button
            className="btn btn--small"
            onClick={() =>
              window.open(
                'https://pancakeswap.finance/swap?chain=bscTestnet&outputCurrency=0xF43CD517385237fe7A48927073151D12f4eADC53&inputCurrency=tBNB',
                '_blank',
              )
            }
          >
            Buy ALICE
          </button>
          <button
            onClick={() =>
              setIsManageBonALICEDialogOpen(!isManageBonALICEDialogOpen)
            }
            className="btn btn--small--with-icon relative"
          >
            <img
              className="mr-2.5"
              src="/assets/images/alice-icon.svg"
              alt=""
            />
            Manage bonALICE
            {isManageBonALICEDialogOpen && (
              <FadeIn
                duration={0.1}
                delay={0.1}
                className="absolute bottom-0 translate-y-[110%] right-0"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="dialog py-5 px-4 bg-primary-dark rounded-lg flex flex-col gap-4"
                >
                  <div className="dialog__top flex gap-4 justify-between items-center">
                    <div className="dialog__top__left flex flex-col items-start gap-0">
                      <p className="text-white text-sm">Balance:</p>
                      <p className="text-white text-sm font-medium min-w-[100px] text-left">
                        {bonALICEs.length > 0
                          ? bonALICEs.length + ' BonALICEs'
                          : 'No bonALICE'}
                      </p>
                    </div>
                    <div className="dialog__top__right flex items-center">
                      {bonALICEs.length > 0 ? (
                        <Link to={'/create'}>
                          <button
                            onClick={() => setIsManageBonALICEDialogOpen(false)}
                            className="btn btn--small"
                          >
                            Manage
                          </button>
                        </Link>
                      ) : (
                        <Link to={'/create'}>
                          <button
                            onClick={() => setIsManageBonALICEDialogOpen(false)}
                            className="btn btn--small"
                          >
                            Create
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="dialog--bottom">
                    <Link to={'/claim'}>
                      <button
                        onClick={() => setIsManageBonALICEDialogOpen(false)}
                        className="btn btn--small--with-icon !w-full"
                      >
                        <img
                          className="mr-2.5"
                          src="/assets/images/navbar/prize-icon.svg"
                          alt=""
                        />
                        Claim as a Prize
                      </button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            )}
          </button>
          <Link to="/review">
            <button className="btn btn--small">Setup Node</button>
          </Link>

          {isConnected && ALICEBalance !== null && (
            <button className="btn btn--small btn--secondary flex">
              <img
                src="/assets/images/navbar/muon-icon.svg"
                alt=""
                className="mr-3 h-[18px]"
              />
              <span className="text-black">Balance: </span>
              <strong className="ml-2 mr-1">{ALICEBalance.dsp}</strong>
              <strong className="text-black font-semibold">ALICE</strong>
            </button>
          )}
          <ConnectWalletButton />
        </div>
      </div>
    </FadeIn>
  );
};

const MobileNavbar = () => {
  return <div className="visible md:hidden"></div>;
};
export default Navbar;
