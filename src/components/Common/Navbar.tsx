import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick.ts';

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

  // const ref = useOutsideClick(() => setIsManageBonALICEDialogOpen(false));

  return (
    <FadeIn delay={0.3}>
      <div className="hidden relative md:flex navbar justify-between items-center py-9 pl-14 pr-12">
        <div className="navbar__left">
          <Link to={'/'}>
            <img
              src="/assets/images/navbar/logo.svg"
              alt={''}
              className="w-[120px] h-auto"
            />
          </Link>
        </div>
        <div className="navbar__right flex justify-end items-center gap-4 relative">
          <button
            onClick={() =>
              setIsManageBonALICEDialogOpen(!isManageBonALICEDialogOpen)
            }
            className="btn btn--small--with-icon"
          >
            <img
              className="mr-2.5"
              src="/assets/images/alice-icon.svg"
              alt=""
            />
            Manage bonALICE
          </button>

          {isManageBonALICEDialogOpen && (
            <FadeIn
              duration={0.1}
              delay={0.1}
              className="absolute bottom-0 translate-y-[110%] -left-8"
            >
              <div className="dialog py-5 px-4 bg-primary-dark rounded-lg flex flex-col gap-4">
                <div className="dialog__top flex gap-4 justify-between items-center">
                  <div className="dialog__top__left flex flex-col gap-0">
                    <p className="text-white text-sm">Balance:</p>
                    <p className="text-white text-sm font-medium">
                      {bonALICEs.length > 0
                        ? bonALICEs.length + 'BonALICEs'
                        : 'No bonALICE'}
                    </p>
                  </div>
                  <div className="dialog__top__right flex items-center">
                    {bonALICEs.length > 0 ? (
                      <Link to={'/review'}>
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

          <button className="btn btn--small">Buy ALICE</button>
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
