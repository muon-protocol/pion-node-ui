import * as React from 'react';
import { FC } from 'react';

const Modal: FC<{
  title: string;
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  closeModalHandler: () => void;
}> = ({ title, children, isOpen, closeModalHandler, className }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-[10] left-0 top-0 w-full h-full overflow-hidden backdrop-blur-sm flex items-center justify-center bg-modal-backdrop ${className}`}
          onClick={(_e) => closeModalHandler()}
          data-testid="modal-wrapper"
        >
          <div
            className={`modal-content max-w-[400px] w-[90%] px-8 pt-5 pb-8 relative overflow-hidden -z-10 bg-card-bg-70-purple rounded-3xl`}
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-content"
          >
            <div className="modal-header flex justify-between items-center mb-6">
              <p className="text-white font-medium text-sm"> {title} </p>

              <img
                className="cursor-pointer"
                onClick={closeModalHandler}
                src="/assets/images/modal/exit.svg"
                alt={'X'}
              />
            </div>
            <div className="z-10 bg-gray20 max-h-[70vh] styled-scroll">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;