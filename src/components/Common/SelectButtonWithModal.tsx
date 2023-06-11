import Modal from './Modal.tsx';
import { ReactNode } from 'react';

const SelectButtonWithModal = ({
  title,
  multiple,
  children,
  isModalOpen,
  closeModalHandler,
  modalTitle,
  onClick,
}: {
  title: string;
  multiple?: boolean;
  children: ReactNode;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  modalTitle: string;
  onClick: () => void;
}) => {
  return (
    <div className="select-button-with-modal mb-6">
      <div className="flex flex-col w-full gap-2" onClick={onClick}>
        <div className="text-xyz-75 text-sm">{title}</div>
        <div className="select-button-with-modal__button flex items-center justify-between bg-catskill-white rounded-xl pl-5 pr-4 h-14 cursor-pointer">
          <span className="flex gap-2.5 items-center">
            <img
              src="/assets/images/select-button/bon-icon.svg"
              alt=""
              width="26px"
              height="26px"
            />
            {multiple ? (
              <>
                <span className="rounded-lg bg-algo px-3 py-2 flex gap-3 items-center justify-between">
                  <p className="text-sm">bonPION #12151</p>
                  <img
                    src="/assets/images/actions/x.svg"
                    alt=""
                    width="14px"
                    height="14px"
                  />
                </span>
                <span className="rounded-lg bg-algo px-3 py-2 flex gap-3 items-center justify-between">
                  <p className="text-sm">bonPION #12151</p>
                  <img
                    src="/assets/images/actions/x.svg"
                    alt=""
                    width="14px"
                    height="14px"
                  />
                </span>
              </>
            ) : (
              <p className="text-white font-medium">bonPION #12151</p>
            )}
          </span>
          <img
            src="/assets/images/select-button/down-arrow.svg"
            alt=""
            width="14px"
            height="14px"
          />
        </div>
      </div>

      <Modal
        title={modalTitle}
        isOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
        className="select-button-with-modal__modal"
      >
        {children}
      </Modal>
    </div>
  );
};

export default SelectButtonWithModal;
