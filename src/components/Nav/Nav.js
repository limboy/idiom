import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default function Nav(props) {
  return (
    <div className="flex flex-row justify-between h-10 border-b border-gray-300 items-center py-6">
      <div>
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </div>

      <div>
        <h1 className="text-xl">{props.title ? props.title : '拼音猜成语'}</h1>
      </div>

      <div>
        <InformationCircleIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

Nav.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
};
