import { sidebarItems } from '../../data/constants.ts';
import { useNavigate } from 'react-router-dom';
import useActions from '../../contexts/Actions/useActions.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import useClaimPrize from '../../contexts/ClaimPrize/useActions.ts';

const InsufficientNFTAmoutModalBody = ({
  operation,
}: {
  operation: string;
}) => {
  const navigate = useNavigate();
  const { setSelectedAction } = useActions();
  const { setIsInsufficientModalOpen: createModal } = useCreateAction();
  const { setIsInsufficientModalOpen: claimModal } = useClaimPrize();

  return (
    <div className="px-3 flex flex-col justify-center items-center">
      <img
        className="w-[100px] h-auto mb-8 mt-4"
        src="/assets/images/modal/successfully-claimed-icon.svg"
        alt=""
      />
      <p className="text-center mb-8">
        You've successfully {operation} your BonALICE! Unfortunately your
        current node power is insufficient to run a node. Please consider
        boosting your bonALICE to enable node setup.
      </p>
      <button
        onClick={() => {
          setSelectedAction(sidebarItems[1].link);
          createModal(false);
          claimModal(false);
          navigate('/bonALICE/create');
        }}
        className="btn btn--primary mx-auto !w-full !px-8"
      >
        Boost Your BonALICE
      </button>
    </div>
  );
};

export default InsufficientNFTAmoutModalBody;
