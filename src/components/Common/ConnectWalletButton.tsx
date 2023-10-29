import { ConnectButton } from '@rainbow-me/rainbowkit';
import useALICE from '../../contexts/ALICE/useALICE.ts';

export const ConnectWalletButton = ({
  size,
}: {
  size?: 'sm' | 'md' | 'lg';
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
                  className={`btn btn--dark-primary dark:btn--white !dark:text-primary ${
                    size === 'md' ? '' : 'btn--small'
                  }`}
                >
                  {account.displayName} | {ALICEBalance?.dsp} PION
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
