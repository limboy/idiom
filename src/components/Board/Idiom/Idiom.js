import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import './Idiom.css';
import { useAppContext } from '../../../hooks/useAppContext';

const Letter = (props) => {
  function _bgColor() {
    let bgColors = ['bg-gray-500', 'bg-yellow-600', 'bg-green-600'];
    return Number.isInteger(props.checkResult)
      ? bgColors[props.checkResult]
      : 'bg-gray-200';
  }

  function _textColor() {
    return Number.isInteger(props.checkResult)
      ? 'text-gray-100'
      : 'text-gray-600';
  }

  let ref = useRef();
  let bgColor = props.justGuessed ? 'bg-gray-200' : _bgColor();
  let textColor = props.justGuessed ? 'text-gray-600' : _textColor();
  let visibility = props.letter === '_' ? 'invisible' : 'visible';
  let animationClass = 'idle';
  let wrapperAnimationClass = 'idle';
  if (props.justAdd) {
    animationClass = 'pop';
  }
  if (props.justGuessed) {
    setTimeout(() => {
      ref.current.dataset.animation = 'flip-in';
    }, props.animationDelay);
    setTimeout(() => {
      ref.current.dataset.animation = 'flip-out';
      ref.current.classList.remove('text-gray-100');
      ref.current.classList.remove('bg-gray-200');
      ref.current.classList.add(_bgColor());
      ref.current.classList.add(_textColor());
    }, props.animationDelay + 300);
  }

  return (
    <div
      ref={ref}
      data-animation={wrapperAnimationClass}
      className={`tile transition-all ${bgColor} ${
        props.isValid ? textColor : 'text-red-600'
      } w-full h-full text-center align-middle text-2xl md:text-4xl md:py-2 select-none transition-all`}
    >
      <span
        data-animation={animationClass}
        className={`${visibility} inline-block`}
      >
        {props.letter.toUpperCase()}
      </span>
    </div>
  );
};

Letter.propTypes = {
  letter: PropTypes.string,
  checkResult: PropTypes.number,
};

export default function Idiom(props) {
  let { attempts } = useAppContext();
  let lettersRef = useRef(props.letters);
  let guessValidCheckResult = attempts.current.checkResult;
  let lettersLengthes = props.letters.map((item) => item.length);
  let lettersLength = lettersLengthes.reduce((p, c) => p + c, 0);
  let allRight = props.checkResult
    ? props.checkResult
        .join('')
        .split('')
        .every((num) => parseInt(num) === 2)
    : false;
  const column1Width = lettersLengthes[0] / lettersLength;
  const column2Width = lettersLengthes[1] / lettersLength;
  const column3Width = lettersLengthes[2] / lettersLength;
  const column4Width = lettersLengthes[3] / lettersLength;

  useEffect(() => {
    lettersRef.current = props.letters;
  }, [props.letters]);

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
              nthLetter++;
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
                  justAdd={letter !== '_' && lettersRef.current[i][j] === '_'}
                  animationDelay={0}
                  justGuessed={props.justGuessed}
                  win={allRight}
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
