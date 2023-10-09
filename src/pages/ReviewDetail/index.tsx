import SelectButtonWithModal from '../../components/Common/SelectButtonWithModal.tsx';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';
import { useNavigate } from 'react-router-dom';
import { FadeIn } from '../../animations';
// import AddressInput from '../../components/Common/AddressInput.tsx';
import useNodeBonALICE from '../../hooks/useNodeBonALICE.ts';
import { formatWalletAddress } from '../../utils/web3.ts';
import { getCurrentChainId } from '../../constants/chains.ts';
import useUserProfile from '../../contexts/UserProfile/useUserProfile.ts';
import isZero from '../../utils/isZero.ts';
import { MUON_NODE_STAKING_ADDRESS } from '../../constants/addresses.ts';
import Alert from '../../components/Common/Alert.tsx';
import BonALICEModalBody from '../../components/Common/BonALICEModalBody.tsx';
import { getTier } from '../../utils';
// import { sidebarItems } from '../../data/constants.ts';
// import useActions from '../../contexts/Actions/useActions.ts';
import { useEffect } from 'react';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { ConnectWalletModal } from '../../components/Common/ConnectWalletModal.tsx';

const ReviewDetail = () => {
  const { bonALICEs } = useBonALICE();
  const {
    isSelectNodeBonALICEModalOpen,
    nodeBonALICE,
    setIsSelectNodeBonALICEModalOpen,
    setNodeBonALICE,
    handleAddNodeClicked,
    peerID,
    setPeerID,
    nodeAddress,
    setNodeAddress,
    isMetamaskLoading,
    isTransactionLoading,
    // isGettingNodeStatusLoading,
    isAddingNodeLoading,
    approvedBonALICEAddress,
    handleApproveClicked,
    isApproving,
    nodeBonALICEAddress,
    stakerAddressInfo,
  } = useNodeBonALICE();

  const { chainId, handleSwitchNetwork } = useUserProfile();

  // const navigate = useNavigate();
  // const { setSelectedAction } = useActions();

  const reviewDetailCard = () => {
    return (
      <div className="review-detail__nft relative bg-so-dark-gray p-4 md:px-10 md:py-9 rounded-2xl w-full overflow-hidden flex flex-col">
        <ConnectWalletModal redirectRoute="/get-started" />
        <div className="address-input__top text-sm mb-2 flex justify-between">
          <div className="address-input__title text-light-text">
            Select BonPION
          </div>
        </div>
        <div className="flex w-full gap-3 mb-7">
          <SelectButtonWithModal
            onClick={() => setIsSelectNodeBonALICEModalOpen(true)}
            isModalOpen={isSelectNodeBonALICEModalOpen}
            closeModalHandler={() => setIsSelectNodeBonALICEModalOpen(false)}
            modalTitle="Select BonPION"
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
          {/*<Link to="/create">*/}
          {/*  <button className="btn btn--secondary btn--icon-btn relative !h-12 !w-12 md:!w-14 md:!h-14 !bg-primary-13-solid">*/}
          {/*    {nodeBonALICE &&*/}
          {/*      nodeBonALICE.ALICELockAmount.dsp +*/}
          {/*        nodeBonALICE.LPTokenLockAmount.dsp * 2 <*/}
          {/*        10000 && (*/}
          {/*        <>*/}
          {/*          <span className="animate-ping absolute inline-flex top-0 right-0 w-3 h-3 rounded-lg bg-primary"></span>*/}
          {/*          <span className="absolute inline-flex rounded-full top-0 right-0 h-3 w-3 bg-primary"></span>*/}
          {/*        </>*/}
          {/*      )}*/}
          {/*    <img src="/assets/images/actions/upgrade-icon.svg" alt="" />*/}
          {/*  </button>*/}
          {/*</Link>*/}
        </div>
        <div className="flex flex-col gap-3 max-md:text-sm mt-auto text-white">
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Staking Address:</span>
            <span className="font-semibold ">
              {nodeBonALICE ? (
                formatWalletAddress(nodeBonALICE?.account)
              ) : (
                <span className="font-semibold">Select bonPION</span>
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
                USDC)
              </span>
            ) : (
              <span className="font-semibold">-</span>
            )}
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Tier:</span>
            <span className="font-semibold ">
              {nodeBonALICE ? getTier(nodeBonALICE.nodePower) : '-'}
            </span>
          </span>
          <span className="flex w-full justify-between leading-5 font-light">
            <span className="min-w-[170px]">Verification Required:</span>

            {nodeBonALICE &&
            nodeBonALICE.ALICELockAmount.dsp +
              2 * nodeBonALICE.LPTokenLockAmount.dsp >=
              500 ? (
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() =>
                  window.open(
                    'https://docs.muon.net/muon-network/muon-nodes/joining-alice-testnet/uniqueness-verification/',
                    '_blank',
                  )
                }
              >
                {nodeBonALICE.ALICELockAmount.dsp +
                  2 * nodeBonALICE.LPTokenLockAmount.dsp >=
                500
                  ? 'Beginner Verification'
                  : nodeBonALICE.ALICELockAmount.dsp +
                      2 * nodeBonALICE.LPTokenLockAmount.dsp >=
                    50000
                  ? 'Aura Bronze'
                  : nodeBonALICE.ALICELockAmount.dsp +
                      2 * nodeBonALICE.LPTokenLockAmount.dsp >=
                    200000
                  ? 'Aura Silver'
                  : ''}
              </span>
            ) : (
              <span className="font-semibold">-</span>
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
        className={`review-detail__actions bg-so-dark-gray p-4 md:px-6 md:py-9 rounded-2xl flex flex-col md:!w-[365px] md:!min-w-[365px] max-md:text-sm`}
      >
        {/*<AddressInput*/}
        {/*  title="Server IP"*/}
        {/*  placeholder="Enter Server IP"*/}
        {/*  value={nodeIP}*/}
        {/*  onValueChanged={(value) => setNodeIP(value)}*/}
        {/*  className="mb-9"*/}
        {/*/>*/}
        <div className="address-input__top text-sm mb-2 flex justify-between">
          <div className="address-input__title text-light-text">
            Node Address
          </div>
        </div>
        <div className="address-input__input-wrapper mb-4 flex items-center justify-between bg-catskill-white rounded-xl pl-5 pr-4 h-14">
          <input
            className="address-input__input placeholder-gray10 text-white font-medium w-full h-full bg-transparent outline-none"
            placeholder={'Node Address'}
            type="text"
            value={nodeAddress}
            onChange={(e) => setNodeAddress(e.target.value)}
          />
        </div>
        <div className="address-input__top text-sm mb-2 flex justify-between">
          <div className="address-input__title text-light-text">Peer ID</div>
        </div>
        <div className="address-input__input-wrapper mb-9 flex items-center justify-between bg-catskill-white rounded-xl pl-5 pr-4 h-14">
          <input
            className="address-input__input placeholder-gray10 text-white font-medium w-full h-full bg-transparent outline-none"
            placeholder={'Peer ID'}
            type="text"
            value={peerID}
            onChange={(e) => setPeerID(e.target.value)}
          />
        </div>
        {nodeBonALICEAddress ===
          MUON_NODE_STAKING_ADDRESS[getCurrentChainId()] &&
        stakerAddressInfo?.active ? (
          <button className="btn btn--white mt-auto mx-auto">Dashboard</button>
        ) : chainId !== getCurrentChainId() ? (
          <button
            onClick={() => handleSwitchNetwork(getCurrentChainId())}
            className="btn btn--white mt-auto mx-auto"
          >
            Switch Network
          </button>
        ) : !nodeBonALICE ? (
          <button className="btn btn--white mt-auto mx-auto" disabled>
            Select bonPION
          </button>
        ) : isMetamaskLoading || isTransactionLoading ? (
          <button className="btn btn--white mt-auto mx-auto" disabled>
            {isMetamaskLoading
              ? 'Waiting for Metamask...'
              : 'Waiting for Tx...'}
          </button>
        ) : nodeBonALICE.ALICELockAmount.dsp +
            nodeBonALICE.LPTokenLockAmount.dsp * 2 >=
            500 &&
          ((approvedBonALICEAddress && isZero(approvedBonALICEAddress)) ||
            approvedBonALICEAddress !==
              MUON_NODE_STAKING_ADDRESS[getCurrentChainId()]) ? (
          <button
            onClick={() => handleApproveClicked()}
            className="btn btn--white mt-auto mx-auto"
            disabled={isApproving}
          >
            {isApproving ? 'Approving...' : 'Approve'}
          </button>
        ) : isAddingNodeLoading ? (
          <button className="btn btn--white mt-auto mx-auto" disabled>
            Adding Node...
          </button>
        ) : (
          <button
            className="btn btn--white mt-auto mx-auto"
            onClick={() => handleAddNodeClicked()}
            disabled={
              !nodeAddress ||
              !peerID ||
              !nodeBonALICE ||
              nodeBonALICE.ALICELockAmount.dsp +
                nodeBonALICE.LPTokenLockAmount.dsp * 2 <
                500
            }
          >
            Add Node
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (stakerAddressInfo?.active) {
      setTimeout(() => {
        window.open('/dashboard/preparing', '_self');
      }, 5000);
    }
  }, [stakerAddressInfo]);

  return (
    <div className="page__bg">
      <div className="page page--review-details">
        <Alert
          className="mb-8 w-full"
          type={'success'}
          show={!!stakerAddressInfo?.active}
        >
          Successfully added node. If you want to check details, we will
          redirect you to the dashboard in few seconds. If you don't want to
          wait, you can{' '}
          <span
            onClick={() => window.open('/dashboard', '_self')}
            className="underline cursor-pointer hover:font-medium"
          >
            click here
          </span>
          .
        </Alert>
        <FadeIn
          duration={0.1}
          delay={0.1}
          className="content flex flex-col gap-8 justify-center items-center h-full"
        >
          <div className="review-details--top flex flex-col md:flex-row gap-9">
            <p className="text-lg text-center md:text-left md:text-[20px] font-light w-full">
              Please review the bonPION details you're staking for node
              operation. When ready, fill out the requested information and
              click ‘Add node’ to complete the setup.
            </p>
            {/*{nodeBonALICE &&*/}
            {/*nodeBonALICE.ALICELockAmount.dsp +*/}
            {/*  nodeBonALICE.LPTokenLockAmount.dsp * 2 <*/}
            {/*  10000 ? (*/}
            {/*  <Alert*/}
            {/*    className="md:!w-[365px] md:!min-w-[365px]"*/}
            {/*    type="error"*/}
            {/*    show={true}*/}
            {/*  >*/}
            {/*    You don't have sufficient amount of ALICE on this BonALICE.*/}
            {/*    Please{' '}*/}
            {/*    <span*/}
            {/*      className="hover:underline cursor-pointer text-primary"*/}
            {/*      onClick={() => {*/}
            {/*        setSelectedAction(sidebarItems[1].link);*/}
            {/*        navigate('/create');*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      upgrade*/}
            {/*    </span>*/}
            {/*    ,{' '}*/}
            {/*    <span*/}
            {/*      className="hover:underline cursor-pointer text-primary"*/}
            {/*      onClick={() => {*/}
            {/*        setSelectedAction(sidebarItems[2].link);*/}
            {/*        navigate('/create');*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      merge*/}
            {/*    </span>*/}
            {/*    , or select another BonALICE.*/}
            {/*  </Alert>*/}
            {/*) : (*/}
            {/*  <Alert*/}
            {/*    className="md:!w-[365px] md:!min-w-[365px]"*/}
            {/*    type="error"*/}
            {/*    show={true}*/}
            {/*  >*/}
            {/*    Your node will be activated once you've successfully completed*/}
            {/*    the uniqueness verification process in your dashboard*/}
            {/*  </Alert>*/}
            {/*)}*/}

            <div className="bg-primary md:!w-[365px] md:!min-w-[365px] flex pt-5 pb-6 pl-9 pr-9 items-center gap-3 rounded-xl">
              <img src="/assets/images/review/guide-icon.svg" alt="" />
              <div>
                <p className="text-white text-sm">
                  Neet help setting up your node?
                </p>
                <p
                  className="text-white text-xl underline cursor-pointer"
                  onClick={() =>
                    window.open(
                      'https://docs.muon.net/muon-network/muon-nodes/joining-alice-v2',
                      '_blank',
                    )
                  }
                >
                  See Our Setup Guide
                </p>
              </div>
            </div>

            {/*<NotificationCard  />*/}
          </div>
          <div className="review-details--bottom flex flex-col md:flex-row gap-9 w-full">
            {reviewDetailCard()}
            {transferCard()}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const EmptyBonALICECard = () => {
  const navigate = useNavigate();
  const { stakerAddressInfo } = useNodeBonALICE();
  const { newNFTClaimedLoading } = useCreateAction();

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 !z-100 backdrop-blur-[2px] bg-gray-75 flex flex-col justify-center items-center gap-8">
      {newNFTClaimedLoading ? (
        <>
          <p className="font-semibold text-xl text-center px-20">
            Loading BonALICEs...
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold text-xl text-center px-20">
            {stakerAddressInfo?.active
              ? 'You have already added a node. Please go to your dashboard to check the details.'
              : 'You don’t have any bonALICE in your wallet, please create one first or use another address'}
          </p>
          <button
            className="btn btn--white mx-auto"
            onClick={() => navigate('/create')}
          >
            Create BonALICE
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewDetail;
