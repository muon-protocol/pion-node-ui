import useActions from '../../contexts/Actions/useActions.ts';
import { ActionType } from '../../types';

import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal';
import AddressInput from '../../components/Common/AddressInput.tsx';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Seekbar from '../../components/Common/Seekbar.tsx';
import { FadeIn } from '../../animations';
import useUpgradeAction from '../../contexts/UpgradeAction/useUpgradeAction.ts';
import BonPIONCard from '../../components/Common/BonPIONCard.tsx';
import { mergeModalItems, upgradeModalItems } from '../../data';
import useMergeAction from '../../contexts/MergeAction/useMergeAction.ts';
import useSplitAction from '../../contexts/SplitAction/useSplitAction.ts';
import usePION from '../../contexts/PION/usePION.ts';
import { weiToEther } from '../../utils/web3.ts';
import { useMemo } from 'react';
import useTransferAction from '../../contexts/TransferAction/useTransferAction.ts';
import { RenderCreateBody } from './CreateAction.tsx';

const ActionsContent = () => {
  const { selectedAction } = useActions();

  return (
    <div className="actions-content w-full md:bg-card-bg-70-purple md:px-11 py-10 rounded-2xl flex flex-col">
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

const RenderUpgradeBody = () => {
  const {
    isUpgradeModalOpen,
    openUpgradeModal,
    closeUpgradeModal,
    handleUpgradeModalItemClicked,
    isSelectedUpgradeBonPION,
    selectedUpgradeBonPION,
    upgradeAmount,
    handleUpgradeAmountChange,
  } = useUpgradeAction();

  const { balance } = usePION();

  const isUpgradeBonPIONButtonDisabled = useMemo(() => {
    return (
      !selectedUpgradeBonPION ||
      !upgradeAmount ||
      !balance ||
      Number(upgradeAmount) > Number(weiToEther(balance.toString()))
    );
  }, [selectedUpgradeBonPION, upgradeAmount, balance]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonPion"
          onClick={() => openUpgradeModal()}
          isModalOpen={isUpgradeModalOpen}
          closeModalHandler={() => closeUpgradeModal()}
          modalTitle="Select BonPION"
          selectedItems={selectedUpgradeBonPION ? [selectedUpgradeBonPION] : []}
          removeItem={(item) => handleUpgradeModalItemClicked(item)}
        >
          <div className="flex flex-col gap-3">
            {upgradeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleUpgradeModalItemClicked(item)}
                  compact
                  selected={isSelectedUpgradeBonPION(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          balance={
            typeof balance === 'bigint' ? weiToEther(balance.toString()) : '...'
          }
          value={upgradeAmount}
          onValueChanged={handleUpgradeAmountChange}
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <p className="max-md:text-sm font-light text-gray10 underline mb-8 md:mb-10 cursor-pointer">
          I Want to Boost Bonded PION Power with LP Tokens
        </p>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your current bonPION power</p>
          <p className="font-medium">2000</p>
        </span>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your bonPION power will be</p>
          <p className="font-medium">5030 bonPION</p>
        </span>
        <span className="flex justify-between text-gray10 max-md:text-sm">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">Pion Supreme (Tier 3)</p>
        </span>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          disabled={isUpgradeBonPIONButtonDisabled}
          className="btn btn--secondary !w-full"
        >
          Upgrade
        </button>
      </FadeIn>
    </>
  );
};

const RenderMergeBody = () => {
  const {
    isMergeModalOpen,
    openMergeModal,
    closeMergeModal,
    handleMergeModalItemClicked,
    selectedMergeBonPIONs,
    isInSelectedMergeBonPIONs,
  } = useMergeAction();

  const isMergeBonPIONsButtonDisabled = useMemo(() => {
    return selectedMergeBonPIONs.length < 2;
  }, [selectedMergeBonPIONs]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonPIONs"
          onClick={() => openMergeModal()}
          isModalOpen={isMergeModalOpen}
          closeModalHandler={() => closeMergeModal()}
          modalTitle="Select BonPIONs to Merge"
          multiple
          selectedItems={selectedMergeBonPIONs}
          removeItem={(item) => handleMergeModalItemClicked(item)}
        >
          <div className="flex flex-col gap-3">
            {mergeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleMergeModalItemClicked(item)}
                  compact
                  selected={isInSelectedMergeBonPIONs(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <img
          src="/assets/images/actions/merge-content-icon.svg"
          alt=""
          className="mx-auto mb-6 max-md:w-10"
        />
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <BonPIONCard
          title="New Bonded PION"
          subTitle1="Node Power"
          subValue1="530"
          subTitle2="Tier"
          subValue2="Pion Supreme (Tier 3)"
          selected
        />
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          disabled={isMergeBonPIONsButtonDisabled}
          className="btn btn--secondary !w-full"
        >
          Merge
        </button>
      </FadeIn>
    </>
  );
};

const RenderSplitBody = () => {
  const {
    splitValue,
    setSplitValue,
    isSplitModalOpen,
    openSplitModal,
    closeSplitModal,
    handleSplitModalItemClicked,
    selectedSplitBonPION,
    isSelectedSplitBonPION,
  } = useSplitAction();

  const isSplitBonPIONsButtonDisabled = useMemo(() => {
    return !selectedSplitBonPION;
  }, [selectedSplitBonPION]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonPion"
          onClick={() => openSplitModal()}
          isModalOpen={isSplitModalOpen}
          closeModalHandler={() => closeSplitModal()}
          modalTitle="Select BonPION"
          selectedItems={selectedSplitBonPION ? [selectedSplitBonPION] : []}
          removeItem={() => {}}
        >
          <div className="flex flex-col gap-3">
            {upgradeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleSplitModalItemClicked(item)}
                  compact
                  selected={isSelectedSplitBonPION(item)}
                />
              );
            })}
          </div>
        </SelectButtonWithModal>
      </FadeIn>
      {selectedSplitBonPION && (
        <FadeIn duration={0.1} delay={0.1}>
          <img
            src="/assets/images/actions/split-content-icon.svg"
            alt=""
            className="mx-auto mb-2 max-md:w-10"
          />
          <Seekbar
            min={0}
            max={100}
            value={splitValue}
            onValueChange={setSplitValue}
          />
          <div className="new-bounded-pions flex flex-col md:flex-row gap-3 w-full select-none">
            <BonPIONCard
              title="New Bonded PION"
              subTitle1="Node Power"
              subValue1="530"
              subTitle2="Tier"
              subValue2="Pion Supreme (Tier 3)"
              selected
            />
            <BonPIONCard
              title="New Bonded PION"
              subTitle1="Node Power"
              subValue1="530"
              subTitle2="Tier"
              subValue2="Pion Supreme (Tier 3)"
              selected
            />
          </div>
        </FadeIn>
      )}
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        <button
          disabled={isSplitBonPIONsButtonDisabled}
          className="btn btn--secondary !w-full"
        >
          Split
        </button>
      </FadeIn>
    </>
  );
};

const RenderTransferBody = () => {
  const {
    isTransferModalOpen,
    openTransferModal,
    closeTransferModal,
    handleTransferModalItemClicked,
    selectedTransferBonPION,
    handleTransferAddressChange,
    transferAddress,
    isSelectedTransferBonPION,
  } = useTransferAction();

  const isTransferBonPIONButtonDisabled = useMemo(() => {
    return !selectedTransferBonPION || !transferAddress;
  }, [transferAddress, selectedTransferBonPION]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1} className="mb-4">
        <SelectButtonWithModal
          title="Select BonPion"
          onClick={() => openTransferModal()}
          isModalOpen={isTransferModalOpen}
          closeModalHandler={() => closeTransferModal()}
          modalTitle="Select BonPION"
          removeItem={() => {}}
          selectedItems={
            selectedTransferBonPION ? [selectedTransferBonPION] : []
          }
        >
          <div className="flex flex-col gap-3">
            {upgradeModalItems.map((item) => {
              return (
                <BonPIONCard
                  className="cursor-pointer"
                  title={item.title}
                  subTitle1="Node Power"
                  subValue1={item.nodePower}
                  subTitle2="Tier"
                  subValue2={item.tier}
                  onClick={() => handleTransferModalItemClicked(item)}
                  compact
                  selected={isSelectedTransferBonPION(item)}
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
          disabled={isTransferBonPIONButtonDisabled}
          className="btn btn--secondary !w-full"
        >
          Transfer
        </button>
      </FadeIn>
    </>
  );
};
export default ActionsContent;
