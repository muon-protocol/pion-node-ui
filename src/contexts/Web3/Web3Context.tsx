import { createContext, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const Web3Context = createContext({});

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      alchemyProvider({
        apiKey: process.env.REACT_APP_ALCHEMY_ID
          ? process.env.REACT_APP_ALCHEMY_ID
          : '',
      }),
      publicProvider(),
    ],
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
