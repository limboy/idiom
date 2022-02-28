import { useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

function Button(props) {
  const { pressLetter } = useAppContext();
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
    pressLetter(letter);
  }

  let textColor = props.checkResult ? 'text-gray-100' : 'text-gray-800';
  let bgColor = props.checkResult
    ? props.checkResult === '2'
      ? 'bg-green-600'
      : 'bg-yellow-600'
    : 'bg-gray-200';

  return (
    <button
      className={`w-full h-full ${bgColor} ${textColor}  text-base font-bold py-2 md:py-4 active:bg-gray-700 active:text-gray-100`}
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
  history.forEach((attemp) => {
    attemp.guess.forEach((letters, i) => {
      for (let j = 0; j < letters.length; j++) {
        let letter = letters.charAt(j).toUpperCase();
        let letterCheckResult = attemp.checkResult[i].charAt(j);
        if (letterCheckResult !== '0') {
          if (result[letter] !== '2' || !result[letter]) {
            result[letter] = letterCheckResult;
          }
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
  let { attempts, pressLetter } = useAppContext();

  let parseResult = parseHistory(attempts.history);

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (event) => {
        const keyName = event.key.toUpperCase();
        if ([row1Keys, row2Keys, row3Keys].flat().indexOf(keyName) !== -1) {
          pressLetter(keyName);
        } else if (keyName === 'BACKSPACE') {
          pressLetter('Backspace');
        } else if (keyName === 'ENTER') {
          pressLetter('Enter');
        }
      },
      false
    );
  }, [pressLetter]);

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
