import { ConnectButton } from '@rainbow-me/rainbowkit';
import useALICE from '../../contexts/ALICE/useALICE.ts';
import strings from '../../constants/strings.ts';

export const ConnectWalletButton = ({
  size,
  withIcon,
  light,
}: {
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
  light?: boolean;
}) => {
  const { ALICEBalance } = useALICE();

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
                if (withIcon) {
                  return (
                    <button
                      className={`btn btn--with-icon ${
                        light ? 'btn--white' : 'btn--primary'
                      } `}
                      onClick={openConnectModal}
                    >
                      <img
                        className="h-6 md:h-8 w-auto"
                        src="/assets/images/migration/wallet-icon.svg"
                        alt=""
                      />
                      <p className="text-inherit">Connect Wallet</p>
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={openConnectModal}
                      className={`btn ${
                        size === 'md' ? '' : 'btn--small'
                      } btn--primary`}
                    >
                      Connect Wallet
                    </button>
                  );
                }
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className={`btn ${
                      size === 'md' ? '' : 'btn--small'
                    } btn--secondary`}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className={`btn btn--dark-primary !text-white dark:btn--white !dark:text-primary ${
                    size === 'md' ? '' : 'btn--small'
                  }`}
                >
                  {account.displayName} | {ALICEBalance?.dsp} {strings.token}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
