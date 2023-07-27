import { sidebarItems } from '../../data/constants.ts';
import { useNavigate } from 'react-router-dom';
import useActions from '../../contexts/Actions/useActions.ts';

const InsufficientNFTAmoutModalBody = () => {
  const navigate = useNavigate();
  const { setSelectedAction } = useActions();

  return (
    <div className="px-3 flex flex-col justify-center items-center">
      <img
        className="w-[100px] h-auto mb-8 mt-4"
        src="/assets/images/modal/successfully-claimed-icon.svg"
        alt=""
      />
      <p className="text-center mb-8">
        You've successfully claimed your bonPION #12! Unfortunately your current
        node power is insufficient to run a node. Please consider upgrading your
        bonPION to enable node setup.
      </p>
      <button
        onClick={() => {
          setSelectedAction(sidebarItems[1].link);
          navigate('/create');
        }}
        className="btn btn--primary mx-auto"
      >
        Upgrade Your BonALICE
      </button>
    </div>
  );
};

export default InsufficientNFTAmoutModalBody;
