import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import { ConnectWalletButton } from './ConnectWalletButton.tsx';
import { weiToEther } from '../../utils/web3.ts';

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
  const { balance } = useALICE();

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
          <Link className={'flex--1'} to={'/create'}>
            <button className="btn btn--small">Create BonALICE</button>
          </Link>
          <button className="btn btn--small">Buy ALICE</button>
          {isConnected && balance !== undefined && balance !== null && (
            <button className="btn btn--small btn--dark-primary">
              Balance:{' '}
              <strong className="ml-2 mr-1">
                {weiToEther(balance.toString())}
              </strong>
              <strong className="text-xyz-75">ALICE</strong>
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
