import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ConnectWalletButton = ({
  size,
}: {
  size?: 'sm' | 'md' | 'lg';
}) => {
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
                  className={`btn btn--secondary !text-white ${
                    size === 'md' ? '' : 'btn--small'
                  } btn--dark-primary`}
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
