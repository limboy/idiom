import PropTypes from 'prop-types';

const Letter = (props) => {
  let bgColors = ['rgb(75 85 99)', 'rgb(202 138 4)', 'rgb(22 163 74)'];
  let bgColor = props.checkResult
    ? bgColors[props.checkResult]
    : 'rgb(243 244 246)';
  let textColor = props.checkResult ? 'rgb(243 244 246)' : 'rgb(75 85 99)';
  return (
    <div
      className={`w-full h-full text-center align-middle text-2xl md:text-3xl`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {props.letter.toUpperCase()}
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
      className={`w-full max-w-2xl grid  gap-4`}
      style={{
        gridTemplateColumns: `${column1Width}fr ${column2Width}fr ${column3Width}fr ${column4Width}fr`,
      }}
    >
      {props.letters.map((letters, i) => {
        return (
          <div
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
              return <Letter checkResult={checkResult} letter={letter} />;
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
