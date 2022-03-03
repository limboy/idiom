import { useAppContext } from '../../hooks/useAppContext';
import { HiOutlineLightBulb } from 'react-icons/hi';
import Idiom from './Idiom';
import { useState } from 'react';
import Modal from '../Modal';

function generateTipContent(attempts, config) {
  let result = [];
  let tone = config.answer.tone;
  const toneMap = {
    1: 'ˉ',
    2: 'ˊ',
    3: 'ˇ',
    4: 'ˋ',
  };

  if (attempts.history.length === 0) {
    result.push('每完成一次猜测，会有一个声调提示哦');
  } else {
    for (let i = 0; i < Math.min(attempts.history.length, 4); i++) {
      result.push(`第 ${i + 1} 个字是第 ${tone[i]} 声：${toneMap[tone[i]]}`);
    }
  }
  return result;
}

export default function Board(props) {
  let { attempts, config } = useAppContext();
  let [modalIsOpen, setModalIsOpen] = useState(false);
  let idioms = [];
  for (let i = 0; i < config.maxAttempts; i++) {
    if (i < attempts.history.length) {
      let attempt = attempts.history[i];
      idioms.push({
        letters: attempt.guess,
        checkResult: attempt.checkResult,
      });
    } else if (i === attempts.history.length) {
      idioms.push({ letters: attempts.current.guess });
    } else {
      idioms.push({
        letters: attempts.current.guess.map((letters) =>
          Array(letters.length).fill('_').join('')
        ),
      });
    }
  }

  let tipContent = generateTipContent(attempts, config);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-between flex-1">
      <div className="w-full h-full min-h-[48px] flex items-center justify-center ">
        <HiOutlineLightBulb
          className="w-8 h-8 text-gray-400 hover:text-gray-800 cursor-pointer"
          onClick={() => {
            setModalIsOpen(true);
          }}
        ></HiOutlineLightBulb>
        <Modal
          isOpen={modalIsOpen}
          title="小提示"
          onClose={() => {
            setModalIsOpen(false);
          }}
        >
          <div className="flex flex-col pt-6 pb-3 gap-1">
            {tipContent.map((item, i) => {
              return <p key={i}>{item}</p>;
            })}
          </div>
        </Modal>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        {idioms.map((idiom, i) => {
          return (
            <Idiom
              key={i}
              nthAttempt={i + 1}
              letters={idiom.letters}
              checkResult={idiom.checkResult}
            />
          );
        })}
      </div>
      <div className="w-full h-full min-h-[48px]"></div>
    </div>
  );
}
