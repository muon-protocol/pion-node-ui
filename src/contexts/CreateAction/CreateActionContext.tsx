import { createContext, ReactNode, useMemo, useState } from 'react';
import useALICE from '../ALICE/useALICE.ts';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import BONALICE_API from '../../abis/BonALICE.json';
import { BONALICE_ADDRESS, ALICE_ADDRESS } from '../../constants/addresses.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../UserProfile/useUserProfile.ts';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';

const CreateActionContext = createContext<{
  createAmount: W3bNumber;
  createActionLoading: boolean;
  handleCreateAmountChange: (amount: string) => void;
  handleCreateBonALICEClicked: () => void;
}>({
  createAmount: {
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  },
  createActionLoading: false,
  handleCreateAmountChange: () => {},
  handleCreateBonALICEClicked: () => {},
});

const CreateActionProvider = ({ children }: { children: ReactNode }) => {
  const { ALICEBalance } = useALICE();
  const { walletAddress } = useUserProfile();

  const [createActionLoading, setCreateActionLoading] = useState(false);
  const [createAmount, setCreateAmount] = useState<W3bNumber>({
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  });
  const handleCreateAmountChange = (amount: string) => {
    setCreateAmount(w3bNumberFromString(amount));
  };

  const mintAndLockArgs = useMemo(() => {
    return [
      [ALICE_ADDRESS[getCurrentChainId()]],
      [createAmount.big],
      walletAddress,
    ];
  }, [walletAddress, createAmount]);

  const { config } = usePrepareContractWrite({
    abi: BONALICE_API,
    address: BONALICE_ADDRESS[getCurrentChainId()],
    functionName: 'mintAndLock',
    args: mintAndLockArgs,
    chainId: getCurrentChainId(),
  });

  const { write } = useContractWrite(config);

  const handleCreateBonALICEClicked = () => {
    if (
      !ALICEBalance ||
      !createAmount ||
      Number(createAmount) > Number(ALICEBalance.big)
    )
      return;
    setCreateActionLoading(true);
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
