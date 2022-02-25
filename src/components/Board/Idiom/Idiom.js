import PropTypes from 'prop-types';
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
      <div className="bg-gray-200">A</div>
      <div className="bg-gray-200">B</div>
      <div className="bg-gray-200">C</div>
      <div className="bg-gray-200">D</div>
    </div>
  );
}

Idiom.propTypes = {
  letters: PropTypes.array,
  checkResult: PropTypes.array,
};
