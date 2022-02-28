import { useAppContext } from '../../hooks/useAppContext';
import Idiom from './Idiom';

export default function Board(props) {
  let { attempts, config } = useAppContext();
  let idioms = [];
  for (let i = 0; i < config.maxAttempts; i++) {
    if (i < attempts.history.length) {
      let attempt = attempts.history[i];
      idioms.push({
        letters: attempt.guess,
        checkResult: attempt.checkResult,
      });
    } else if (i === attempts.history.length) {
      idioms.push({ letters: attempts.current });
    } else {
      idioms.push({
        letters: attempts.current.map((letters) =>
          Array(letters.length).fill('_').join('')
        ),
      });
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2 md:gap-4 py-12">
      {idioms.map((idiom, i) => {
        return (
          <Idiom
            key={i}
            letters={idiom.letters}
            checkResult={idiom.checkResult}
          />
        );
      })}
    </div>
  );
}
