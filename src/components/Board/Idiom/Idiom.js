import PropTypes from 'prop-types';

const Letter = (props) => {
  let bgColors = ['bg-gray-500', 'bg-yellow-600', 'bg-green-600'];
  let bgColor =
    props.checkResult !== null ? bgColors[props.checkResult] : 'bg-gray-200';
  let textColor =
    props.checkResult !== null ? 'text-gray-100' : 'text-gray-500';
  let visibility = props.letter === '_' ? 'invisible' : 'visible';
  return (
    <div
      className={`${bgColor} ${textColor} w-full h-full text-center align-middle text-2xl md:text-4xl md:py-2`}
    >
      <span className={`${visibility}`}>{props.letter.toUpperCase()}</span>
    </div>
  );
};

Letter.propTypes = {
  letter: PropTypes.string,
  checkResult: PropTypes.number,
};

export default function Idiom(props) {
  let lettersLengthes = props.letters.map((item) => item.length);
  let lettersLength = lettersLengthes.reduce((p, c) => p + c, 0);
  const column1Width = lettersLengthes[0] / lettersLength;
  const column2Width = lettersLengthes[1] / lettersLength;
  const column3Width = lettersLengthes[2] / lettersLength;
  const column4Width = lettersLengthes[3] / lettersLength;
  return (
    <div
      className={`w-full max-w-2xl grid  gap-2 md:gap-4`}
      style={{
        gridTemplateColumns: `${column1Width}fr ${column2Width}fr ${column3Width}fr ${column4Width}fr`,
      }}
    >
      {props.letters.map((letters, i) => {
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
