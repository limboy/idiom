import PropTypes from 'prop-types';
import Idiom from './Idiom';
export default function Board(props) {
  let attempts = [];
  for (let i = 0; i < props.maxAttempts; i++) {
    if (i < props.history.length) {
      let attempt = props.history[i];
      attempts.push({
        letters: attempt.guess,
        checkResult: attempt.checkResult,
      });
    } else if (i === props.history.length) {
      attempts.push({ letters: props.current });
    } else {
      attempts.push({
        letters: props.current.map((letters) =>
          Array(letters.length).fill('_').join('')
        ),
      });
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2 md:gap-4">
      {attempts.map((attempt, i) => {
        return (
          <Idiom
            key={i}
            letters={attempt.letters}
            checkResult={attempt.checkResult}
          />
        );
      })}
    </div>
  );
}

Board.propTypes = {
  maxAttempts: PropTypes.number,
  history: PropTypes.array,
  current: PropTypes.array,
};
