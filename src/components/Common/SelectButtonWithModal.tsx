import Modal from './Modal.tsx';
import { ReactNode } from 'react';
import { BonALICE } from '../../types';

const SelectButtonWithModal = ({
  title = '',
  multiple,
  children,
  isModalOpen,
  closeModalHandler,
  modalTitle,
  onClick,
  selectedItems,
  removeItem,
}: {
  title?: string;
  multiple?: boolean;
  children: ReactNode;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  modalTitle: string;
  onClick: () => void;
  selectedItems: BonALICE[];
  removeItem: (item: BonALICE) => void;
}) => {
  return (
    <div className="select-button-with-modal mb-2 w-full">
      <div className="flex flex-col w-full gap-2" onClick={onClick}>
        {title && (
          <div className="text-gray text-sm max-md:text-sm max-md:font-semibold">
            {title}
          </div>
        )}
        <div className="select-button-with-modal__button flex items-center justify-between bg-catskill-white rounded-xl pl-3 md:pl-5 pr-4 h-12 md:h-14 cursor-pointer">
          <span className="flex gap-1.5 md:gap-2.5 items-center">
            <img
              className="w-5 h-5 md:w-[26px] md:h-[26px]"
              src="/assets/images/alice-icon-colored.svg"
              alt=""
            />
            {multiple ? (
              <>
                {selectedItems.length > 0 ? (
                  selectedItems.map((selectedItem) => (
                    <span className="rounded-lg bg-algo px-2 md:px-3 py-2 flex gap-2 md:gap-3 items-center justify-between">
                      <p className="text-xs md:text-sm">
                        {'BonPION #' + selectedItem.tokenId}
                      </p>
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(selectedItem);
                        }}
                        className="w-2 h-2 md:w-[14px] md:h-[14px]"
                        src="/assets/images/actions/x.svg"
                        alt=""
                      />
                    </span>
                  ))
                ) : (
                  <p className="text-gray font-medium max-md:text-sm">Select</p>
                )}
              </>
            ) : (
              <>
                {selectedItems.length > 0 ? (
                  <p className="font-medium max-md:text-sm">
                    {'BonPION #' + selectedItems[0].tokenId}
                  </p>
                ) : (
                  <p className="text-gray font-medium max-md:text-sm">Select</p>
                )}
              </>
            )}
          </span>
          <img
            className="w-3 h-3 md:w-[14px] md:h-[14px]"
            src="/assets/images/select-button/down-arrow.svg"
            alt=""
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
