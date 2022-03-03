import { XIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
export default function Modal(props) {
  let containerRef = useRef();
  let isOpen = props.isOpen;
  useEffect(() => {
    if (isOpen) {
      containerRef.current.style.visibility = 'visible';
    }
    let transitionEnd = () => {
      containerRef.current.style.visibility = isOpen ? 'visibile' : 'hidden';
    };

    let container = containerRef.current;
    container.addEventListener('transitionend', transitionEnd);
    return () => {
      container.removeEventListener('transitionend', transitionEnd);
    };
  }, [isOpen]);
  return (
    <div
      className="flex absolute w-full h-full top-0 left-0 justify-center items-center z-10 bg-white/50 invisible"
      ref={containerRef}
      style={{
        transitionDuration: '0.3s',
        transitionProperty: 'opacity',
        opacity: isOpen ? 1 : 0,
      }}
      onClick={() => {
        props.onClose(true);
      }}
    >
      <div
        className="bg-white w-11/12 max-w-2xl relative max-h-[90%] border border-solid border-gray-100 overflow-y-scroll rounded-lg p-4 flex flex-col items-center"
        style={{
          boxShadow: '0 4px 23px 0 rgb(0 0 0 / 20%)',
          transitionProperty: 'margin-bottom',
          transitionDuration: '0.3s',
          marginBottom: isOpen ? '0px' : '-50px',
        }}
      >
        <div className="w-full border-b border-solid border-gray-300 text-2xl text-center pb-3 flex flex-row justify-between items-center">
          <div></div>
          <div>{props.title}</div>
          <div>
            <XIcon
              className="h-5 w-5 text-gray-600 cursor-pointer"
              onClick={() => {
                props.onClose(true);
              }}
            ></XIcon>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}
