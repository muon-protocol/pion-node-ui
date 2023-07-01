import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';

import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal';
import AddressInput from '../../components/Common/AddressInput.tsx';
import { FadeIn } from '../../animations';
import BonALICECard from '../../components/Common/BonALICECard.tsx';
import { useMemo } from 'react';
import useTransferAction from '../../contexts/TransferAction/useTransferAction.ts';
import { RenderCreateBody } from './CreateAction.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { RenderUpgradeBody } from './UpgradeAction.tsx';
import RenderMergeBody from './MergeAction.tsx';
import RenderSplitBody from './SplitAction.tsx';

const ActionsContent = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-content w-full md:bg-white md:px-11 py-10 rounded-2xl flex flex-col">
      {selectedAction === ActionType.CREATE ? (
        <RenderCreateBody />
      ) : selectedAction === ActionType.UPGRADE ? (
        <RenderUpgradeBody />
      ) : selectedAction === ActionType.MERGE ? (
        <RenderMergeBody />
      ) : selectedAction === ActionType.SPLIT ? (
        <RenderSplitBody />
      ) : selectedAction === ActionType.TRANSFER ? (
        <RenderTransferBody />
      ) : (
        <></>
      )}
    </div>
  );
};

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
                  subValue1={50}
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
          disabled={isTransferBonALICEButtonDisabled}
          className="btn !w-full"
        >
          Transfer
        </button>
      </FadeIn>
    </>
  );
};
export default ActionsContent;
