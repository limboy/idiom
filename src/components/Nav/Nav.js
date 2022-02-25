import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/outline';

export default function Nav(props) {
  return (
    <div className="flex flex-row justify-between h-10 border-b border-gray-300 items-center">
      <div>
        <QuestionMarkCircleIcon className="h-5 w-5" />
      </div>

      <div>
        <h1>拼音猜成语</h1>
      </div>

      <div>
        <InformationCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
