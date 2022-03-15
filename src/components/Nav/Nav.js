import { FiHelpCircle } from 'react-icons/fi';
import { BsBarChartLine } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default function Nav(props) {
  return (
    <div className="flex flex-row justify-between h-10 border-b border-gray-300 items-center py-6">
      <div>
        <FiHelpCircle
          className="h-6 w-6 cursor-pointer"
          onClick={props.onHelpClick}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl">{props.title ? props.title : '拼音猜成语'}</h1>
      </div>

      <div>
        <BsBarChartLine
          onClick={props.onStatisticsClick}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  );
}

Nav.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
};
