import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

function Answer(props) {
  let { config } = useAppContext();
  return (
    <div className="flex flex-row justify-center gap-4 py-6">
      {config.answer.cn.map((character, i) => {
        return (
          <div
            key={i}
            className="flex flex-col border border-solid border-gray-800"
          >
            <div className="p-2 text-3xl border-b border-solid border-gray-800 text-center">
              {character}
            </div>
            <div className="px-2 py-1 text-base text-center">
              {config.answer.en[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Attempts(props) {
  let { attempts } = useAppContext();
  return (
    <div className="flex flex-col items-center gap-2">
      {attempts.history.map((attempt, i) => {
        let gridFrs = attempt.guess
          .map((letters) => `${letters.length / attempt.guess.flat().length}fr`)
          .join(' ');
        return (
          <div
            key={i}
            className="grid gap-2"
            style={{ gridTemplateColumns: gridFrs }}
          >
            {attempt.guess.map((letters, j) => {
              return (
                <div key={`${i}-${j}`} className="flex flex-row gap-[1px]">
                  {letters.split('').map((letter, k) => {
                    let bgColors = [
                      'bg-gray-500',
                      'bg-yellow-500',
                      'bg-green-500',
                    ];
                    let checkResult = parseInt(
                      attempt.checkResult[j].charAt(k)
                    );
                    return (
                      <div
                        key={`${i}-${j}-${k}`}
                        className={`basis-full h-6 w-4 ${bgColors[checkResult]}`}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Share(props) {
  let [hasCopied, setHasCopied] = useState(false);
  let { attempts } = useAppContext();
  let shareResult = useCallback(() => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let currentDay = ('0' + currentDate.getDate()).slice(-2);
    let currentHour = ('0' + currentDate.getHours()).slice(-2);
    let text = [
      `pinyincaichengyu.com ${currentMonth}/${currentDay}/${currentYear} ${currentHour}`,
      '',
    ];
    attempts.history.forEach((attempt, index) => {
      let currentAttempt = [];
      attempt.guess.forEach((letters, index) => {
        letters.split('').forEach((letter, letterIndex) => {
          let checkResult = attempt.checkResult[index].charAt(letterIndex);
          let square = '⬜️';
          if (checkResult === '2') {
            square = '🟩';
          } else if (checkResult === '1') {
            square = '🟨';
          }
          currentAttempt.push(square);
        });
      });
      text.push(currentAttempt.join(''));
    });

    let textStr = text.join('\n');
    navigator.clipboard.writeText(textStr);
    setHasCopied(true);
  }, [attempts]);

  if (!hasCopied) {
    return (
      <button
        className="px-6 py-2 rounded bg-gray-200 font-medium my-4 active:bg-gray-700 active:text-gray-100"
        onClick={shareResult}
      >
        分享成绩
      </button>
    );
  } else {
    return (
      <button disabled className="px-6 py-2 font-medium my-4 text-blue-600">
        成绩已复制到剪贴板了
      </button>
    );
  }
}

function NextRound(props) {
  let { config } = useAppContext();
  let [nextRoundText, setNextRoundText] = useState('__:__');
  useEffect(() => {
    let interval = setInterval(() => {
      let currentDate = new Date();
      currentDate.setMilliseconds(0);
      if (currentDate > config.resetTs) {
        setNextRoundText('Ready');
        clearInterval(interval);
      } else {
        let minutes = Math.floor((config.resetTs - currentDate) / 60000);
        let seconds = (config.resetTs - currentDate) / 1000 - minutes * 60;
        setNextRoundText(
          `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
        );
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [config]);

  return (
    <div className="py-6 flex flex-col items-center justify-center">
      <div className="pb-2">下一个成语</div>
      <div
        className="text-4xl"
        style={{
          fontFamily: '"Clear Sans", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        {nextRoundText}
      </div>
    </div>
  );
}

export default function Result(props) {
  let { status } = useAppContext();
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
        <Answer />
        <Attempts />
        <Share />
        <NextRound />
      </div>
    </div>
  );
}
