import { createContext, ReactNode } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const UserProfileContext = createContext<{
  walletAddress: `0x${string}` | undefined;
  isConnecting: boolean;
  isConnected: boolean;
  chainId: number;
  handleSwitchNetwork: (chainId: number) => void;
}>({
  walletAddress: undefined,
  isConnecting: false,
  isConnected: false,
  chainId: 0,
  handleSwitchNetwork: () => {},
});

const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress, isConnecting, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitchNetwork = (chainId: number) => {
    if (!chain || chainId === chain.id) return;
    switchNetwork?.(chainId);
  };

  return (
    <UserProfileContext.Provider
      value={{
        walletAddress,
        isConnecting,
        isConnected,
        chainId: chain?.id || 0,
        handleSwitchNetwork,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileProvider, UserProfileContext };
