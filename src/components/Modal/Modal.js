import { XIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
export default function Modal(props) {
  let containerRef = useRef();
  let isOpen = props.isOpen;
  useEffect(() => {
    if (isOpen) {
      containerRef.current.style.display = 'flex';
    }
    let animationEnd = () => {
      containerRef.current.style.display = isOpen ? 'flex' : 'none';
    };

    let container = containerRef.current;
    container.addEventListener('animationend', animationEnd);
    return () => {
      container.removeEventListener('animationend', animationEnd);
    };
  }, [isOpen]);
  return (
    <div
      className="absolute w-full h-full top-0 left-0 justify-center items-center z-10 bg-white/50 hidden"
      ref={containerRef}
      style={{
        animation: isOpen ? 'fadeIn 150ms linear' : 'fadeOut 150ms linear',
      }}
      onClick={() => {
        props.onClose(true);
      }}
    >
      <div
        className="bg-white w-11/12 max-w-2xl relative max-h-[90%] border border-solid border-gray-100 overflow-y-scroll rounded-lg p-4 flex flex-col items-center"
        style={{
          boxShadow: '0 4px 23px 0 rgb(0 0 0 / 20%)',
          animation: isOpen ? 'slideIn 150ms linear' : 'slideOut 150ms linear',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full border-b border-solid border-gray-300 text-2xl text-center pb-3 relative">
          <div className="absolute right-1 top-1">
            <XIcon
              className="h-5 w-5 text-gray-600 cursor-pointer"
              onClick={() => {
                props.onClose(true);
              }}
            ></XIcon>
          </div>
          <div>{props.title}</div>
        </div>
        {props.children}
      </div>
    </div>
  );
}
