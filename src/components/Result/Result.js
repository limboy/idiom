import { useAppContext } from '../../hooks/useAppContext';

export default function Result(props) {
  let { attempts, status, config } = useAppContext();
  if (!status) {
    return <div></div>;
  }

  let title = status === 'WIN' ? '🥳' : '😭';

  return (
    <div className="flex absolute w-full h-full top-0 left-0 justify-center items-center z-10 bg-white/50">
      <div
        className="w-11/12 max-w-2xl relative max-h-[90%] border border-solid border-gray-100 overflow-y-scroll rounded-lg p-4 flex flex-col items-center"
        style={{ boxShadow: '0 4px 23px 0 rgb(0 0 0 / 20%)' }}
      >
        <div className="w-full border-b border-solid border-gray-300 text-3xl text-center pb-3">
          {title}
        </div>
      </div>
    </div>
  );
}
