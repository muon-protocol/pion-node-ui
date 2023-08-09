import { useNavigate } from 'react-router-dom';
import useActions from '../../contexts/Actions/useActions.ts';
import { sidebarItems } from '../../data/constants.ts';

const ClaimedRewardModal = ({ operation }: { operation: string }) => {
  const navigate = useNavigate();
  const { setSelectedAction } = useActions();

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
          onClick={() => navigate('/review')}
          className="btn btn--primary mb-2 mt-5 mx-auto"
        >
          Setup Your Node
        </button>
        or
        <br />
        <span
          onClick={() => {
            setSelectedAction(sidebarItems[1].link);
            navigate('/create');
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
