import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../../hooks/useAppContext';

const Letter = (props) => {
  let bgColors = ['bg-gray-500', 'bg-yellow-600', 'bg-green-600'];
  let bgColor = Number.isInteger(props.checkResult)
    ? bgColors[props.checkResult]
    : 'bg-gray-200';
  let textColor = Number.isInteger(props.checkResult)
    ? 'text-gray-100'
    : 'text-gray-500';
  let visibility = props.letter === '_' ? 'invisible' : 'visible';
  return (
    <div
      className={`transition-all ${bgColor} ${
        props.isValid ? textColor : 'text-red-600'
      } w-full h-full text-center align-middle text-2xl md:text-4xl md:py-2 select-none`}
    >
      <span className={`${visibility} `}>{props.letter.toUpperCase()}</span>
    </div>
  );
};

Letter.propTypes = {
  letter: PropTypes.string,
  checkResult: PropTypes.number,
};

export default function Idiom(props) {
  let { attempts } = useAppContext();
  let guessValidCheckResult = attempts.current.checkResult;
  let lettersLengthes = props.letters.map((item) => item.length);
  let lettersLength = lettersLengthes.reduce((p, c) => p + c, 0);
  const column1Width = lettersLengthes[0] / lettersLength;
  const column2Width = lettersLengthes[1] / lettersLength;
  const column3Width = lettersLengthes[2] / lettersLength;
  const column4Width = lettersLengthes[3] / lettersLength;

  useEffect(() => {
    if (attempts.current.checkResult.length > 0) {
      // prevent duplicate toast
      toast.error('这不是正确的拼音组合哦', {
        id: attempts.current.checkResult.join(','),
      });
    }
  }, [attempts]);

  return (
    <div
      className={`w-full max-w-2xl grid  gap-2 md:gap-4`}
      style={{
        gridTemplateColumns: `${column1Width}fr ${column2Width}fr ${column3Width}fr ${column4Width}fr`,
      }}
    >
      {props.letters.map((letters, i) => {
        let isValid = true;
        if (props.nthAttempt === attempts.history.length + 1) {
          isValid = guessValidCheckResult.indexOf(i) === -1;
        }
        return (
          <div
            key={i}
            className={`grid`}
            style={{
              gap: '2px',
              gridTemplateColumns: `repeat(${letters.length}, 1fr)`,
            }}
          >
            {letters.split('').map((letter, j) => {
              let checkResult = null;
              if (props.checkResult) {
                checkResult = parseInt(props.checkResult[i].charAt(j));
              }
              return (
                <Letter
                  isValid={isValid}
                  key={`${i}-${j}`}
                  checkResult={checkResult}
                  letter={letter}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

Idiom.propTypes = {
  letters: PropTypes.array,
  checkResult: PropTypes.array,
};
