"use client";

import * as React from "react";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, bscTestnet, bsc } from "@wagmi/core/chains";

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, bscTestnet, bsc],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case 1:
            return { http: "https://ethereum.publicnode.com/" };
          case 56:
            return { http: "https://bsc.publicnode.com" };
          case 97:
            return { http: "https://bsc-testnet.publicnode.com" };
          default:
            return { http: "https://ethereum.publicnode.com/" };
        }
      },
    }),
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const myCustomTheme = {
  blurs: {
    modalOverlay: "...",
  },
  colors: {
    accentColor: "#E3E5FE",
    accentColorForeground: "#5158F6",
    actionButtonBorder: "...",
    actionButtonBorderMobile: "...",
    actionButtonSecondaryBackground: "...",
    closeButton: "...",
    closeButtonBackground: "...",
    connectButtonBackground: "#E3E5FE",
    connectButtonBackgroundError: "...",
    connectButtonInnerBackground: "...",
    connectButtonText: "...",
    connectButtonTextError: "...",
    connectionIndicator: "...",
    downloadBottomCardBackground: "...",
    downloadTopCardBackground: "...",
    error: "...",
    generalBorder: "...",
    generalBorderDim: "...",
    menuItemBackground: "...",
    modalBackdrop: "...",
    modalBackground: "#E3E5FE",
    modalBorder: "white",
    modalText: "black",
    modalTextDim: "white",
    modalTextSecondary: "black",
    profileAction: "...",
    profileActionHover: "...",
    profileForeground: "...",
    selectedOptionBorder: "#5158F6",
    standby: "...",
  },
  fonts: {
    body: "Inter",
  },
  radii: {
    actionButton: "8px",
    connectButton: "8px",
    menuButton: "8px",
    modal: "8px",
    modalMobile: "8px",
  },
  shadows: {
    connectButton: "...",
    dialog: "...",
    profileDetailsAction: "...",
    selectedOption: "...",
    selectedWallet: "...",
    walletLogo: "...",
  },
};

export function RainbowProvider({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={myCustomTheme}
        chains={chains}
        appInfo={demoAppInfo}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
