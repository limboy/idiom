import { useCallback, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

function Button(props) {
  let flexBasis = '100%';
  let letterValue = props.letter;
  if (props.letter === 'Enter' || props.letter === '⌫') {
    flexBasis = '150%';
    if (props.letter === '⌫') {
      letterValue = 'Backspace';
    }
  }

  function onSelectLetter(event) {
    let letter = event.target.dataset.value;
    props.pressLetter(letter);
  }

  let bgColors = ['bg-gray-500', 'bg-yellow-600', 'bg-green-600'];
  let bgColor = Number.isInteger(props.checkResult)
    ? bgColors[props.checkResult]
    : 'bg-gray-200';
  let textColor = Number.isInteger(props.checkResult)
    ? 'text-gray-100'
    : 'text-gray-600';

  return (
    <button
      className={`w-full h-full ${bgColor} ${textColor}  text-base font-bold py-2 md:py-4 active:bg-gray-700 active:text-gray-100 rounded`}
      style={{ flexBasis }}
      data-value={letterValue}
      onClick={onSelectLetter}
    >
      {props.letter}
    </button>
  );
}

function parseHistory(history) {
  let result = {};
  history.forEach((attempt) => {
    attempt.guess.forEach((letters, i) => {
      for (let j = 0; j < letters.length; j++) {
        let letter = letters.charAt(j).toUpperCase();
        let letterCheckResult = parseInt(attempt.checkResult[i].charAt(j));
        if (!result[letter] || letterCheckResult > result[letter]) {
          result[letter] = letterCheckResult;
        }
      }
    });
  });
  return result;
}

let row1Keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
let row2Keys = ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''];
let row3Keys = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];

export default function Keyboard(props) {
  let { attempts, pressLetter, status } = useAppContext();
  let checkAndPressLetter = useCallback(
    (letter) => {
      if (!status) {
        pressLetter(letter);
      }
    },
    [pressLetter, status]
  );

  let parseResult = parseHistory(attempts.history);

  useEffect(() => {
    let listener = (event) => {
      const keyName = event.key.toUpperCase();
      if ([row1Keys, row2Keys, row3Keys].flat().indexOf(keyName) !== -1) {
        checkAndPressLetter(keyName);
      } else if (keyName === 'BACKSPACE') {
        checkAndPressLetter('Backspace');
      } else if (keyName === 'ENTER') {
        checkAndPressLetter('Enter');
      }
    };
    document.addEventListener('keydown', listener, false);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [checkAndPressLetter]);

  return (
    <div className="flex flex-col gap-2 items-center">
      {[row1Keys, row2Keys, row3Keys].map((keys, i) => {
        return (
          <div
            key={i}
            className="w-full max-w-2xl flex flex-row gap-1 md:gap-2 justify-center"
          >
            {keys.map((letter, j) => {
              return letter ? (
                <Button
                  {...props}
                  key={`${i}-${j}`}
                  letter={letter}
                  checkResult={parseResult[letter]}
                  pressLetter={checkAndPressLetter}
                />
              ) : (
                <div key={`${i}-${j}`} style={{ flexBasis: '50%' }}></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
