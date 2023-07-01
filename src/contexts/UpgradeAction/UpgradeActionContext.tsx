import { createContext, ReactNode, useState } from 'react';
import { BonALICE } from '../../types';
import { W3bNumber } from '../../types/wagmi.ts';
import { w3bNumberFromString } from '../../utils/web3.ts';
import useLock from '../../hooks/useLock.ts';

const UpgradeActionContext = createContext<{
  isUpgradeModalOpen: boolean;
  openUpgradeModal: () => void;
  closeUpgradeModal: () => void;
  selectedUpgradeBonALICE: BonALICE | null;
  isSelectedUpgradeBonALICE: (bonALICE: BonALICE) => boolean;
  handleUpgradeModalItemClicked: (bonALICE: BonALICE) => void;
  upgradeAmount: W3bNumber;
  upgradeBoostAmount: W3bNumber;
  handleUpgradeBoostAmountChange: (amount: string) => void;
  handleUpgradeAmountChange: (amount: string) => void;
  handleUpgradeBonALICEClicked: () => void;
}>({
  isUpgradeModalOpen: false,
  openUpgradeModal: () => {},
  closeUpgradeModal: () => {},
  selectedUpgradeBonALICE: null,
  isSelectedUpgradeBonALICE: () => false,
  handleUpgradeModalItemClicked: () => {},
  upgradeAmount: {
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  },
  upgradeBoostAmount: {
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  },
  handleUpgradeBoostAmountChange: () => {},
  handleUpgradeAmountChange: () => {},
  handleUpgradeBonALICEClicked: () => {},
});

const UpgradeActionProvider = ({ children }: { children: ReactNode }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalSelectedBonALICE, setUpgradeModalSelectedBonALICE] =
    useState<BonALICE | null>(null);

  const [upgradeAmount, setUpgradeAmount] = useState<W3bNumber>({
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  });

  const [upgradeBoostAmount, setUpgradeBoostAmount] = useState<W3bNumber>({
    dsp: 0,
    big: BigInt(0),
    hStr: '',
  });

  const { lock } = useLock(
    upgradeModalSelectedBonALICE?.tokenId,
    upgradeAmount,
    upgradeBoostAmount,
  );

  const handleUpgradeBonALICEClicked = async () => {
    if (!upgradeModalSelectedBonALICE || !upgradeAmount.dsp) {
      return;
    }
    const result = await lock();
    console.log(result);
  };

  const handleUpgradeBoostAmountChange = (amount: string) => {
    setUpgradeBoostAmount(w3bNumberFromString(amount));
  };

  const handleUpgradeAmountChange = (amount: string) => {
    setUpgradeAmount(w3bNumberFromString(amount));
  };

  const handleUpgradeModalItemClicked = (bonALICE: BonALICE) => {
    if (!upgradeModalSelectedBonALICE) {
      changeUpgradeModalSelectedBonALICE(bonALICE);
      return;
    }
    if (upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId) {
      unselectUpgradeModalSelectedBonALICE();
    } else {
      changeUpgradeModalSelectedBonALICE(bonALICE);
    }
  };

  const changeUpgradeModalSelectedBonALICE = (bonALICE: BonALICE) => {
    setUpgradeModalSelectedBonALICE(bonALICE);
    closeUpgradeModal();
  };

  const unselectUpgradeModalSelectedBonALICE = () => {
    setUpgradeModalSelectedBonALICE(null);
  };

  const isSelectedUpgradeBonALICE = (bonALICE: BonALICE) => {
    return (
      !!upgradeModalSelectedBonALICE &&
      upgradeModalSelectedBonALICE.tokenId === bonALICE.tokenId
    );
  };

  const openUpgradeModal = () => setIsUpgradeModalOpen(true);
  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  return (
    <UpgradeActionContext.Provider
      value={{
        isUpgradeModalOpen,
        openUpgradeModal,
        closeUpgradeModal,
        selectedUpgradeBonALICE: upgradeModalSelectedBonALICE,
        isSelectedUpgradeBonALICE,
        handleUpgradeModalItemClicked,
        upgradeAmount,
        upgradeBoostAmount,
        handleUpgradeAmountChange,
        handleUpgradeBoostAmountChange,
        handleUpgradeBonALICEClicked,
      }}
    >
      {children}
    </UpgradeActionContext.Provider>
  );
};

export { UpgradeActionProvider, UpgradeActionContext };
