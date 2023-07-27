import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { Link, useNavigate } from 'react-router-dom';
import { FadeIn } from '../../animations';
import AddressInput from '../../components/Common/AddressInput.tsx';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { formatWalletAddress } from '../../utils/web3.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import isZero from '../../utils/isZero.ts';
import { MUON_NODE_STAKING_ADDRESS } from '../../constants/addresses.ts';
import Alert from '../../components/Common/Alert.tsx';
import BonALICEModalBody from '../../components/Common/BonALICEModalBody.tsx';
import { getTier } from '../../utils';
import { sidebarItems } from '../../data/constants.ts';
import useActions from '../../contexts/Actions/useActions.ts';

const ReviewDetail = () => {
  const { bonALICEs } = useBonALICE();
  const {
    setNodeIP,
    isSelectNodeBonALICEModalOpen,
    nodeBonALICE,
    setIsSelectNodeBonALICEModalOpen,
    setNodeBonALICE,
    handleAddNodeClicked,
    nodeIP,
    isMetamaskLoading,
    isTransactionLoading,
    isGettingNodeStatusLoading,
    approvedBonALICEAddress,
    handleApproveClicked,
    isApproving,
    nodeBonALICEAddress,
    stakerAddressInfo,
  } = useNodeBonALICE();

  const { chainId, handleSwitchNetwork } = useUserProfile();

  const navigate = useNavigate();
  const { setSelectedAction } = useActions();

  const reviewDetailCard = () => {
    return (
      <div className="relative bg-white p-4 md:px-10 md:py-9 rounded-2xl w-full overflow-hidden">
        <div className="flex w-full gap-3 mb-7">
          <SelectButtonWithModal
            onClick={() => setIsSelectNodeBonALICEModalOpen(true)}
            isModalOpen={isSelectNodeBonALICEModalOpen}
            closeModalHandler={() => setIsSelectNodeBonALICEModalOpen(false)}
            modalTitle="Select BonALICE"
            removeItem={() => setNodeBonALICE(null)}
            selectedItems={nodeBonALICE ? [nodeBonALICE] : []}
          >
            <BonALICEModalBody
              bonALICEs={bonALICEs}
              handleUpgradeModalItemClicked={(item) => {
                setNodeBonALICE(item);
                setIsSelectNodeBonALICEModalOpen(false);
              }}
              isSelectedUpgradeBonALICE={(item) =>
                item.tokenId === nodeBonALICE?.tokenId
              }
            />
          </SelectButtonWithModal>
          <Link to="/create">
            <button className="btn btn--secondary btn--icon-btn relative !h-12 !w-12 md:!w-14 md:!h-14 !bg-primary-13-solid">
              {nodeBonALICE && nodeBonALICE.ALICELockAmount.dsp < 1000 && (
                <>
                  <span className="animate-ping absolute inline-flex top-0 right-0 w-3 h-3 rounded-lg bg-primary"></span>
                  <span className="absolute inline-flex rounded-full top-0 right-0 h-3 w-3 bg-primary"></span>
                </>
              )}
              <img src="/assets/images/actions/upgrade-icon.svg" alt="" />
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-3 max-md:text-sm">
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Staking Address:</span>
            <span className="font-semibold ">
              {nodeBonALICE ? (
                formatWalletAddress(nodeBonALICE?.account)
              ) : (
                <span className="font-semibold">Select BonALICE</span>
              )}
            </span>
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="flex gap-1 min-w-[170px]">Node Power: </span>
            {nodeBonALICE ? (
              <span>
                <span className="mr-1 font-semibold">
                  {nodeBonALICE.nodePower}
                </span>
                (
                <span className="font-medium">
                  {nodeBonALICE.ALICELockAmount.dsp}
                </span>{' '}
                ALICE +{' '}
                <span className="font-medium">
                  {nodeBonALICE.LPTokenLockAmount.dsp}
                </span>{' '}
                LP)
              </span>
            ) : (
              <span className="font-semibold">Select BonALICE</span>
            )}
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Tier:</span>
            <span className="font-semibold ">
              {nodeBonALICE
                ? getTier(nodeBonALICE.nodePower)
                : 'Select BonALICE'}
            </span>
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Verification Required:</span>

            {nodeBonALICE ? (
              <span className="font-semibold underline  cursor-pointer">
                6 methods
              </span>
            ) : (
              <span className="font-semibold">Select BonALICE</span>
            )}
          </span>
        </div>
        {bonALICEs.length === 0 && <EmptyBonALICECard />}
      </div>
    );
  };

  const transferCard = () => {
    return (
      <div
        className={`bg-white p-4 md:px-6 md:py-9 rounded-2xl flex flex-col md:!w-[365px] md:!min-w-[365px] max-md:text-sm`}
      >
        <AddressInput
          title="Node IP"
          placeholder="Enter Node IP"
          value={nodeIP}
          onValueChanged={(value) => setNodeIP(value)}
          className="mb-9"
        />
        {nodeBonALICEAddress ===
          MUON_NODE_STAKING_ADDRESS[getCurrentChainId()] &&
        !!stakerAddressInfo ? (
          <button className="btn btn--secondary mt-auto mx-auto">
            Dashboard
          </button>
        ) : chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn btn--secondary mt-auto mx-auto"
          >
            Switch Network
          </button>
        ) : !nodeBonALICE ? (
          <button className="btn btn--secondary mt-auto mx-auto" disabled>
            Select BonALICE
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button className="btn btn--secondary mt-auto mx-auto" disabled>
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : (approvedBonALICEAddress && isZero(approvedBonALICEAddress)) ||
          approvedBonALICEAddress !==
            MUON_NODE_STAKING_ADDRESS[getCurrentChainId()] ? (
          <button
            onClick={() => handleApproveClicked()}
            className="btn btn--secondary mt-auto mx-auto"
            disabled={isApproving}
          >
            {isApproving ? 'Approving...' : 'Approve'}
          </button>
        ) : isGettingNodeStatusLoading ? (
          <button className="btn btn--secondary mt-auto mx-auto" disabled>
            Node Status...
          </button>
        ) : (
          <button
            className="btn btn--secondary mt-auto mx-auto"
            onClick={() => handleAddNodeClicked()}
            disabled={
              !nodeIP ||
              !nodeBonALICE ||
              nodeBonALICE.ALICELockAmount.dsp < 1000
            }
          >
            Add Node
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="page page--review-details">
      <Alert
        className="mb-8 w-full"
        type={'success'}
        show={
          nodeBonALICEAddress ===
            MUON_NODE_STAKING_ADDRESS[getCurrentChainId()] &&
          !!stakerAddressInfo
        }
      >
        Successfully added node. If you want to check details, please go to the
        Dashboard.
      </Alert>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="content flex flex-col gap-8 justify-center items-center h-full"
      >
        <div className="review-details--top flex flex-col md:flex-row gap-9">
          <p className="text-lg text-center md:text-left md:text-[22px] font-light w-full">
            Review your bonALICE details closely. When you're ready, enter the
            node IP to complete the setup.
          </p>
          {nodeBonALICE && nodeBonALICE.ALICELockAmount.dsp < 1000 ? (
            <Alert
              className="md:!w-[365px] md:!min-w-[365px]"
              type="error"
              show={true}
            >
              You don't have sufficient amount of ALICE on this BonALICE. Please{' '}
              <span
                className="hover:underline cursor-pointer text-primary"
                onClick={() => {
                  setSelectedAction(sidebarItems[1].link);
                  navigate('/create');
                }}
              >
                upgrade
              </span>
              ,{' '}
              <span
                className="hover:underline cursor-pointer text-primary"
                onClick={() => {
                  setSelectedAction(sidebarItems[2].link);
                  navigate('/create');
                }}
              >
                merge
              </span>
              , or select another BonALICE.
            </Alert>
          ) : (
            <Alert
              className="md:!w-[365px] md:!min-w-[365px]"
              type="info"
              show={true}
            >
              Your node will be activated once you've successfully completed the
              uniqueness verification process in your dashboard
            </Alert>
          )}

          {/*<NotificationCard  />*/}
        </div>
        <div className="review-details--bottom flex flex-col md:flex-row gap-9 w-full">
          {reviewDetailCard()}
          {transferCard()}
        </div>
      </FadeIn>
    </div>
  );
};

const EmptyBonALICECard = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 !z-100 backdrop-blur-[2px] bg-gray-75 flex flex-col justify-center items-center gap-8">
      <p className="font-semibold text-xl text-center px-20">
        You don’t have any bonALICE in your wallet, please create one first or
        use another address
      </p>
      <button
        className="btn btn--primary mx-auto"
        onClick={() => navigate('/create')}
      >
        Create BonALICE
      </button>
    </div>
  );
};

export default ReviewDetail;
