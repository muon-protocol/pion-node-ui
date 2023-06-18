import { Link } from 'react-router-dom';
import { FadeIn } from '../../animations';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import usePION from '../../contexts/PION/usePION.ts';

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
  const { balance } = usePION();
  console.log('PIONBalance', balance);

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
            <button className="btn btn--small">Create BonPION</button>
          </Link>
          <button className="btn btn--small">Buy PION</button>
          {isConnected && balance !== undefined && balance !== null && (
            <button className="btn btn--small btn--dark-primary">
              Balance:{' '}
              <strong className="ml-2 mr-1">{balance.toString()}</strong>
              <strong className="text-xyz-75">PION</strong>
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

const ConnectWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="btn btn--small btn--dark-primary"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="btn btn--small btn--secondary"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="btn btn--small btn--dark-primary"
                >
                  {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Navbar;
