import { XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
export default function Modal(props) {
  let [isCloseModal, closeModal] = useState(false);

  if (isCloseModal) {
    return <></>;
  }

  return (
    <div className="flex absolute w-full h-full top-0 left-0 justify-center items-center z-10 bg-white/50">
      <div
        className="bg-white w-11/12 max-w-2xl relative max-h-[90%] border border-solid border-gray-100 overflow-y-scroll rounded-lg p-4 flex flex-col items-center"
        style={{ boxShadow: '0 4px 23px 0 rgb(0 0 0 / 20%)' }}
      >
        <div className="w-full border-b border-solid border-gray-300 text-3xl text-center pb-3 flex flex-row justify-between items-center">
          <div></div>
          <div>{props.title}</div>
          <div>
            <XIcon
              className="h-5 w-5 text-gray-600 cursor-pointer"
              onClick={() => {
                closeModal(true);
              }}
            ></XIcon>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}
