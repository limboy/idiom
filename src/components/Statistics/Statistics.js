import { useAppContext } from '../../hooks/useAppContext';
import Modal from '../Modal';

function parseStatistics(statistics, maxAttempts) {
  let playedCount = statistics.length;
  let winCount = statistics.reduce((p, c) => p + (c[1] === -1 ? 0 : 1), 0);
  let loseCount = statistics.reduce((p, c) => p + (c[1] === -1 ? 1 : 0), 0);
  let winRate = ((winCount / (winCount + loseCount)) * 100).toFixed(2);
  let totalGuessCount = statistics
    .filter((item) => item[1] !== -1)
    .reduce((p, c) => p + c[1], 0);

  let avgGuessCount =
    winCount > 0 ? (totalGuessCount / winCount).toFixed(2) : 0;
  return {
    playedCount,
    winRate,
    avgGuessCount,
  };
}

function Summary(props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col items-center">
          <div className="text-3xl">{props.playedCount}</div>
          <div className="text-xs">Played</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl">{props.winRate}</div>
          <div className="text-xs">Win %</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl">{props.avgGuessCount}</div>
          <div className="text-xs">Avg Guess</div>
        </div>
      </div>
    </div>
  );
}

function Distribution(props) {
  let statistics = Array(props.maxAttempts).fill(0);
  if (props.statistics) {
    props.statistics
      .filter((item) => item[1] !== -1)
      .forEach((item) => {
        let guessCount = item[1];
        statistics[guessCount - 1] += 1;
      });
  }
  let maxCount = Math.max(1, Math.max(...statistics));
  return (
    <div
      className="flex flex-col gap-2 w-11/12 max-w-[300px] pb-3"
      style={{
        fontFamily: '"Clear Sans", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {statistics.map((_, i) => {
        return (
          <div key={i} className="flex flex-row text-sm">
            <div className="grow-[1] pr-2 text-right">{i + 1} 次猜中</div>
            <div
              className="grow-[8]"
              style={{
                background: `linear-gradient(to right, #16a34a ${
                  (statistics[i] / maxCount) * 100
                }%, #e5e7eb ${(statistics[i] / maxCount) * 100}%)`,
              }}
            ></div>
            <div className="grow-[1] pl-2">{statistics[i]}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Statistics(props) {
  let { storeService, config } = useAppContext();
  let statistics = JSON.parse(storeService.getItem('pyccy-statistics'));
  let playedCount = 0;
  let winRate = 0;
  let avgGuessCount = 0;
  if (statistics) {
    ({ playedCount, winRate, avgGuessCount } = parseStatistics(
      statistics,
      config.maxAttempts
    ));
  }
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="数据统计">
      <Summary
        playedCount={playedCount}
        winRate={winRate}
        avgGuessCount={avgGuessCount}
      />
      <Distribution maxAttempts={config.maxAttempts} statistics={statistics} />
    </Modal>
  );
}
