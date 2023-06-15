import { createContext, ReactNode } from 'react';
import { useAccount } from 'wagmi';

const UserProfileContext = createContext<{
  walletAddress: `0x${string}` | undefined;
  isConnecting: boolean;
  isConnected: boolean;
}>({
  walletAddress: undefined,
  isConnecting: false,
  isConnected: false,
});

const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const { address: walletAddress, isConnecting, isConnected } = useAccount();

  return (
    <UserProfileContext.Provider
      value={{ walletAddress, isConnecting, isConnected }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileProvider, UserProfileContext };
