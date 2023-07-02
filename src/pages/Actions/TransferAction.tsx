import useTransferAction from '../../contexts/TransferAction/useTransferAction.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useMemo } from 'react';
import { FadeIn } from '../../animations';
import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import AddressInput from '../../components/Common/AddressInput.tsx';

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
    transfer,
  } = useTransferAction();
  const { bonALICEs } = useBonALICE();

  const isTransferBonALICEButtonDisabled = useMemo(() => {
    return !selectedTransferBonALICE || !transferAddress;
  }, [transferAddress, selectedTransferBonALICE]);

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
          <div className="flex flex-col gap-3">
            {bonALICEs.map((item) => {
              return (
                <BonALICECard
                  className="cursor-pointer"
                  title={'BonALICE #' + item.tokenId}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={'ALICE Starter (Tier 1)'}
                  onClick={() => handleTransferModalItemClicked(item)}
                  compact
                  selected={isSelectedTransferBonALICE(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AddressInput
          value={transferAddress}
          onValueChanged={handleTransferAddressChange}
        />
      </FadeIn>

      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          onClick={() => {
            !isTransferBonALICEButtonDisabled && transfer();
          }}
          disabled={isTransferBonALICEButtonDisabled}
          className="btn !w-full"
        >
          Transfer
        </button>
      </FadeIn>
    </>
  );
};

export default RenderTransferBody;
