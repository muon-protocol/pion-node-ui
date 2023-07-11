import * as React from 'react';
import { FC } from 'react';
import { Scale } from '../../animations';
import { AnimatePresence } from 'framer-motion';

const Modal: FC<{
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isOpen: boolean;
  children: React.ReactNode;
  closeModalHandler: () => void;
}> = ({ title, children, size, isOpen, closeModalHandler, className }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            className={`fixed z-[100] left-0 top-0 w-full h-full backdrop-blur-sm flex items-center justify-center bg-modal-backdrop ${className}`}
            onClick={(_e) => closeModalHandler()}
            data-testid="modal-wrapper"
          >
            <Scale
              className={`modal-content ${
                size === 'lg' ? 'max-w-[466px]' : 'max-w-[400px]'
              } w-[90%] px-8 pt-5 pb-8 relative -z-10 ${
                size === 'sm' ? 'bg-modal-small' : 'bg-white'
              } rounded-3xl`}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                data-testid="modal-content"
              >
                <div className="modal-header flex justify-between items-center mb-6">
                  <p className="font-medium text-sm"> {title} </p>

                  <img
                    className="cursor-pointer"
                    onClick={closeModalHandler}
                    src={
                      size === 'sm'
                        ? '/assets/images/modal/exit-dark-icon.svg'
                        : '/assets/images/modal/exit-dark-icon.svg'
                    }
                    width="18px"
                    height="18px"
                    alt={'X'}
                  />
                </div>
                <div className="styled-scroll overflow-y-auto z-10 bg-gray20 max-h-[70vh]">
                  {children}
                </div>
              </div>
            </Scale>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
