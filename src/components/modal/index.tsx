import React from 'react';
import ReactDOM from 'react-dom';
import { RxCross2 } from 'react-icons/rx';

interface Props {
  children: React.ReactNode;
  modalClose: () => void;
  bgNormal?: boolean;
  height?: string;
  width?: string;
}

const Modal: React.FC<Props> = ({
  children,
  modalClose,
  height,
  width,
  bgNormal,
}) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        className={`${
          !bgNormal ? 'backdrop-blur-sm' : 'backdrop-blur-[1px]'
        } fixed bottom-0 left-0 right-0 top-0 bg-[#00000031]`}
        onClick={modalClose}
      />
      <div
        className={`${width ? width : 'w-[40%]'} ${
          height && height
        } center z-50 h-full overflow-y-auto rounded-md bg-white shadow md:h-auto`}
      >
        <div className="flex items-center justify-between md:hidden">
          <div className=""></div>
          <button className="mx-2 mt-1 flex justify-end" onClick={modalClose}>
            <RxCross2 size={25} />
          </button>
        </div>
        {children}
      </div>
    </React.Fragment>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
