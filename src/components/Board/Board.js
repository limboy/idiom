import { useAppContext } from '../../hooks/useAppContext';
import { HiOutlineLightBulb } from 'react-icons/hi';
import Idiom from './Idiom';
import { useState } from 'react';
import Modal from '../Modal';

export default function Board(props) {
  let { attempts, config } = useAppContext();
  let [modalIsOpen, setModalIsOpen] = useState(false);
  let idioms = [];
  const toneMap = {
    1: 'ˉ',
    2: 'ˊ',
    3: 'ˇ',
    4: 'ˋ',
  };

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
          <div className="flex flex-col pt-6 pb-3 gap-1 items-center">
            <p>以下是该成语的声调</p>
            <p>每完成一次猜测，会多一个声调提示哦</p>
            <div className="flex flex-row gap-4 pt-4">
              {Array(4)
                .fill(null)
                .map((_, i) => {
                  let visibility =
                    attempts.history.length > i ? 'visible' : 'hidden';
                  return (
                    <div
                      key={i}
                      className="relative border border-solid border-gray-700 w-[64px] h-[64px]"
                      style={{
                        fontFamily:
                          '"Clear Sans", "Helvetica Neue", Arial, sans-serif"',
                      }}
                    >
                      <div
                        className=""
                        style={{
                          visibility,
                          fontSize: '32px',
                          position: 'absolute',
                          left: '27px',
                          top: '-2px',
                        }}
                      >
                        {visibility === 'visible'
                          ? toneMap[config.answer.tone[i]]
                          : '_'}
                      </div>
                      <div
                        className="text-4xl"
                        style={{
                          visibility,
                          position: 'absolute',
                          top: '18px',
                          left: '22px',
                        }}
                      >
                        {visibility === 'visible' ? config.answer.tone[i] : '_'}
                      </div>
                    </div>
                  );
                })}
            </div>
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
