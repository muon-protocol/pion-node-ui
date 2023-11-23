import { useNavigate } from 'react-router-dom';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';
import strings from '../../constants/strings.ts';
import routes from '../../routes';

const ClaimedRewardModal = ({ operation }: { operation: string }) => {
  const navigate = useNavigate();
  const { setIsSufficientModalOpen: createModal } = useCreateAction();
  const { setIsSufficientModalOpen: claimModal } = useClaimPrize();

  return (
    <div className="px-3 flex flex-col justify-center items-center">
      <img
        className="w-[100px] h-auto mb-8 mt-4"
        src="/assets/images/modal/successfully-claimed-icon.svg"
        alt=""
      />
      <p className="text-center text-black">
        Your {strings.nft} has been {operation} successfully.
        <button
          onClick={() => {
            createModal(false);
            claimModal(false);
            navigate(routes.setupNode.path);
          }}
          className="btn btn--primary mt-5 mx-auto"
        >
          Setup Your Node
        </button>
        <br />
        <span
          onClick={() => {
            createModal(false);
            claimModal(false);
            window.open(
              'https://docs.muon.net/muon-network/muon-nodes/pion/upgrading-bonpion-nfts',
              '_blank',
            );
          }}
          className="text-primary hover:underline cursor-pointer"
        >
          Boost
        </span>{' '}
        your power to boost your rewards.
      </p>
    </div>
  );
};

export default ClaimedRewardModal;
