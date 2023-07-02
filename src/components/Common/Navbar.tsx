import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';

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

  return (
    <FadeIn delay={0.3}>
      <div className="hidden md:flex navbar justify-between items-center py-9 pl-14 pr-12">
        <div className="navbar__left">
          <Link to={'/'}>
            <img
              src="/assets/images/navbar/logo.svg"
              alt={''}
              className="w-[120px] h-auto"
            />
          </Link>
        </div>
        <div className="navbar__right flex justify-end items-center gap-4">
          {bonALICEs.length == 0 ? (
            <Link to={'/create'}>
              <button className="btn btn--small">Create BonALICE</button>
            </Link>
          ) : (
            <Link to={'/review'}>
              <button className="btn btn--small--with-icon">
                <img
                  className="mr-2.5"
                  src="/assets/images/alice-icon.svg"
                  alt=""
                />
                Manage bonALICE
              </button>
            </Link>
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
