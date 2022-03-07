import { useAppContext } from '../../hooks/useAppContext';

function parseStatistics(statistics, maxAttempts) {
  let playedCount = statistics.reduce((p, c) => p + c, 0);
  let winCount = statistics.slice(1).reduce((p, c) => p + c, 0) || 0;
  let winRate = playedCount ? ((winCount / playedCount) * 100).toFixed(2) : 0;
  let totalGuessCount = 0;
  statistics.slice(1).forEach((item, i) => {
    totalGuessCount += item * (i + 1);
  });

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
  let statistics = props.statistics.slice(1);
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
  let { config } = useAppContext();
  let statistics = props.statistics;

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
    <>
      <Summary
        playedCount={playedCount}
        winRate={winRate}
        avgGuessCount={avgGuessCount}
      />
      <Distribution maxAttempts={config.maxAttempts} statistics={statistics} />
    </>
  );
}
