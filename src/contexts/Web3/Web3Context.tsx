import { createContext, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const Web3Context = createContext({});

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const { chains, publicClient } = configureChains(
    [mainnet],
    [publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: 'PION',
    projectId: 'YOUR_PROJECT_ID',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export { Web3Provider, Web3Context };
