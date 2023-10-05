import { useNavigate } from 'react-router-dom';
import useActions from '../../contexts/Actions/useActions.ts';
import { sidebarItems } from '../../data/constants.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';

const ClaimedRewardModal = ({ operation }: { operation: string }) => {
  const navigate = useNavigate();
  const { setSelectedAction } = useActions();
  const { setIsSufficientModalOpen: createModal } = useCreateAction();
  const { setIsSufficientModalOpen: claimModal } = useClaimPrize();

  return (
    <div className="px-3 flex flex-col justify-center items-center">
      <img
        className="w-[100px] h-auto mb-8 mt-4"
        src="/assets/images/modal/successfully-claimed-icon.svg"
        alt=""
      />
      <p className="text-center">
        Your BonALICE has been {operation} successfully. now you can
        <br />
        <button
          onClick={() => {
            createModal(false);
            claimModal(false);
            navigate('/review');
          }}
          className="btn btn--primary mb-2 mt-5 mx-auto"
        >
          Setup Your Node
        </button>
        or
        <br />
        <span
          onClick={() => {
            setSelectedAction(sidebarItems[1].link);
            createModal(false);
            claimModal(false);
            navigate('/bonALICE/boost');
          }}
          className="text-primary hover:underline cursor-pointer"
        >
          Upgrade
        </span>{' '}
        your power to increase earnings from node operation.
      </p>
    </div>
  );
};

export default ClaimedRewardModal;
