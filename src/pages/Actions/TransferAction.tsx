import useTransferAction from '../../contexts/TransferAction/useTransferAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
// import { useMemo } from 'react';
import { FadeIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import AddressInput from '../../components/Common/AddressInput.tsx';
import BonALICEModalBody from '../../components/Common/BonALICEModalBody.tsx';

const RenderTransferBody = () => {
  const {
    isTransferModalOpen,
    openTransferModal,
    closeTransferModal,
    handleTransferModalItemClicked,
    selectedTransferBonALICE,
    handleTransferAddressChange,
    transferAddress,
    isSelectedTransferBonALICE,
    // transfer,
  } = useTransferAction();
  const { bonALICEs } = useBonALICE();

  // const isTransferBonALICEButtonDisabled = useMemo(() => {
  //   return !selectedTransferBonALICE || !transferAddress;
  // }, [transferAddress, selectedTransferBonALICE]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonALICE"
          onClick={() => openTransferModal()}
          isModalOpen={isTransferModalOpen}
          closeModalHandler={() => closeTransferModal()}
          modalTitle="Select BonALICE"
          removeItem={() => {}}
          selectedItems={
            selectedTransferBonALICE ? [selectedTransferBonALICE] : []
          }
        >
          <BonALICEModalBody
            bonALICEs={bonALICEs}
            handleUpgradeModalItemClicked={handleTransferModalItemClicked}
            isSelectedUpgradeBonALICE={isSelectedTransferBonALICE}
          />
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AddressInput
          title={'To Address'}
          placeholder={'Enter address'}
          value={transferAddress}
          onValueChanged={handleTransferAddressChange}
        />
      </FadeIn>

      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] md:mx-auto !w-full"
      >
        <button disabled className="btn !w-full">
          Currently Disabled
        </button>

        {/*<button*/}
        {/*  onClick={() => {*/}
        {/*    !isTransferBonALICEButtonDisabled && transfer();*/}
        {/*  }}*/}
        {/*  disabled={isTransferBonALICEButtonDisabled}*/}
        {/*  className="btn !w-full"*/}
        {/*>*/}
        {/*  Transfer*/}
        {/*</button>*/}
      </FadeIn>
    </>
  );
};

export default RenderTransferBody;
