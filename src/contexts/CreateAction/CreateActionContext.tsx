import { createContext, ReactNode, useMemo, useState } from 'react';
import useALICE from '../ALICE/useALICE.ts';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import BONALICE_API from '../../abis/BonALICE.json';
import { BONALICE_ADDRESS, ALICE_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';

const CreateActionContext = createContext<{
  createAmount: string;
  createActionLoading: boolean;
  handleCreateAmountChange: (amount: string) => void;
  handleCreateBonALICEClicked: () => void;
}>({
  createAmount: '',
  createActionLoading: false,
  handleCreateAmountChange: () => {},
  handleCreateBonALICEClicked: () => {},
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { balance } = useALICE();
  const { walletAddress } = useUserProfile();

  const [createActionLoading, setCreateActionLoading] = useState(false);
  const [createAmount, setCreateAmount] = useState('');
  const handleCreateAmountChange = (amount: string) => {
    setCreateAmount(amount.toString());
  };

  const mintAndLockArgs = useMemo(() => {
    return [[ALICE_ADDRESS[getCurrentChainId()]], [createAmount], walletAddress];
  }, [walletAddress, createAmount]);

  const { config } = usePrepareContractWrite({
    abi: BONALICE_API,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: mintAndLockArgs,
    chainId: getCurrentChainId(),
  });

  console.log('config', config);
  const { write } = useContractWrite(config);

  const handleCreateBonALICEClicked = () => {
    if (!balance || !createAmount || Number(createAmount) > Number(balance))
      return;
    setCreateActionLoading(true);
    console.log('write', write);
    write?.();
    setCreateActionLoading(false);
  };

  return (
    <CreateActionContext.Provider
      value={{
        createAmount,
        createActionLoading,
        handleCreateAmountChange,
        handleCreateBonALICEClicked,
      }}
    >
      {children}
    </CreateActionContext.Provider>
  );
};

export { CreateActionProvider, CreateActionContext };
