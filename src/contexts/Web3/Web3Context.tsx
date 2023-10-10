import { createContext, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
const Web3Context = createContext({});

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const { chains, publicClient } = configureChains(
    [bscTestnet],
    [publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: 'ALICE',
    projectId: '76b32982e9b97ae09f81d531761798ba',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#4D3E9E',
          accentColorForeground: '#FFFFFF',
        })}
      >
        <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export { Web3Provider, Web3Context };
