import * as React from 'react';
import { FC } from 'react';

const Modal: FC<{
  title?: string;
  titleLeft?: string;
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  closeModalHandler: () => void;
}> = ({ title, titleLeft, children, isOpen, closeModalHandler, className }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-100 left-0 top-0 w-full h-full overflow-hidden backdrop-blur-sm flex items-center justify-center bg-modal-backdrop ${className}`}
          onClick={(_e) => closeModalHandler()}
          data-testid="modal-wrapper"
        >
          <div
            className={`modal-content max-w-[420px] w-[90%] px-8 py-5 relative overflow-hidden -z-10 bg-gray20 rounded-2xl border-2 border-gray40`}
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-content"
          >
            {titleLeft && (
              <p className="text-xl text-left text-white"> {titleLeft} </p>
            )}
            {title && (
              <p className="modal-title font-bold text-sm text-center mx-auto text-white">
                {title}
              </p>
            )}
            <span
              onClick={closeModalHandler}
              className="close absolute right-4 top-4 cursor-pointer"
              data-testid="close-modal"
            >
              <img src="/assets/images/modal/exit.svg" alt={'X'} />
            </span>
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
