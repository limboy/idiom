import { FiHelpCircle } from 'react-icons/fi';
import { BsBarChartLine } from 'react-icons/bs';
import PropTypes from 'prop-types';
import useSWR from 'swr';

export default function Nav(props) {
  const onlineVisitorFetcher = (...args) =>
    fetch(...args).then((res) => res.json());
  const { data: visitorCount } = useSWR(
    'https://plausible.io/api/stats/pinyincaichengyu.com/current-visitors',
    onlineVisitorFetcher
  );
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
        {visitorCount ? (
          <p className="text-gray-400 text-xs">{visitorCount} playing</p>
        ) : (
          ''
        )}
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
