import { AppProvider, useAppContext } from './useAppContext';
import { currentHourTs, nextHourTs } from '../utils/date';
import { render, screen, within } from '@testing-library/react';
import { useEffect, useRef } from 'react';

const storeService = () => {
  let _store = {};
  return {
    getItem: (key) => _store[key] || null,
    setItem: (key, value) => (_store[key] = JSON.stringify(value)),
  };
};

const appProviderConfig = {
  maxAttempts: 6,
  startTs: null,
  resetTs: nextHourTs(),
  answer: {
    en: ['bu', 'li', 'bu', 'qi'],
    cn: ['不', '离', '不', '弃'],
  },
};

test('config should match', () => {
  let Component = (props) => {
    let { config } = useAppContext();
    props.callback(config);
    return <div></div>;
  };

  render(
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <Component callback={callback} />
    </AppProvider>
  );

  function callback(config) {
    expect(config.maxAttempts).toBe(appProviderConfig.maxAttempts);
  }
});

test('add letter', (done) => {
  let lettersToBePress = 'ABCDEFGH';
  let TriggerComponent = (props) => {
    let lettersRef = useRef(lettersToBePress);
    let counterRef = useRef(0);
    let { pressLetter, attempts } = useAppContext();
    useEffect(() => {
      if (counterRef.current < lettersRef.current.length) {
        pressLetter(lettersRef.current.charAt(counterRef.current++));
      }
    }, [pressLetter, attempts]);
    return <div></div>;
  };

  let ReceiveComponent = (props) => {
    let { attempts } = useAppContext();
    let counterRef = useRef(0);
    if (counterRef.current === 0) {
    } else {
      if (counterRef.current === 1) {
        props.callback1(attempts);
      } else if (counterRef.current === 2) {
        props.callback2(attempts);
      } else if (counterRef.current === 3) {
        props.callback3(attempts);
      } else if (counterRef.current === lettersToBePress.length) {
        props.callback4(attempts);
        done();
      }
    }
    counterRef.current++;
    return <div></div>;
  };

  render(
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <TriggerComponent />
      <ReceiveComponent
        callback1={callback1}
        callback2={callback2}
        callback3={callback3}
        callback4={callback4}
      />
    </AppProvider>
  );

  function callback1(attempts) {
    expect(attempts.current[0].charAt(0)).toBe('A');
  }

  function callback2(attempts) {
    expect(attempts.current[0]).toBe('AB');
  }

  function callback3(attempts) {
    expect(attempts.current[0]).toBe('AB');
    expect(attempts.current[1].charAt(0)).toBe('C');
  }

  function callback4(attempts) {
    expect(attempts.current[0]).toBe('AB');
    expect(attempts.current[1]).toBe('CD');
    expect(attempts.current[2]).toBe('EF');
    expect(attempts.current[3]).toBe('GH');
  }
});

test('delete letter', (done) => {
  let lettersToBePress = 'ABCDEFGH';
  let isDeleting = false;
  let TriggerComponent = (props) => {
    let { pressLetter, attempts } = useAppContext();
    let counterRef = useRef(0);
    useEffect(() => {
      if (counterRef.current < lettersToBePress.length && !isDeleting) {
        pressLetter(lettersToBePress.charAt(counterRef.current++));
      } else {
        if (counterRef.current-- >= 0) {
          isDeleting = true;
          pressLetter('Backspace');
          if (counterRef.current < 0) {
            done();
          }
        }
      }
    }, [pressLetter, attempts]);

    return <div></div>;
  };

  let ReceiveComponent = (props) => {
    let { attempts } = useAppContext();
    let counterRef = useRef(0);
    if (isDeleting) {
      if (counterRef.current === 0) {
        props.callback1(attempts);
      } else if (counterRef.current === 1) {
        props.callback2(attempts);
      } else if (counterRef.current === 2) {
        props.callback3(attempts);
      } else if (counterRef.current === lettersToBePress.length) {
        props.callback4(attempts);
      }
      counterRef.current++;
    }
    return <div></div>;
  };

  function callback1(attempts) {
    expect(attempts.current[3].charAt(1)).toBe('_');
  }

  function callback2(attempts) {
    expect(attempts.current[3]).toBe('__');
  }

  function callback3(attempts) {
    expect(attempts.current[3]).toBe('__');
    expect(attempts.current[2].charAt(1)).toBe('_');
  }

  function callback4(attempts) {
    expect(attempts.current[0]).toBe('__');
    expect(attempts.current[1]).toBe('__');
    expect(attempts.current[2]).toBe('__');
    expect(attempts.current[3]).toBe('__');
  }

  render(
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <TriggerComponent />
      <ReceiveComponent
        callback1={callback1}
        callback2={callback2}
        callback3={callback3}
        callback4={callback4}
      />
    </AppProvider>
  );
});

test('enter key pressed without enough letters', (done) => {
  let lettersToBePress = 'ABCDEFG';
  let enterPressed = false;
  let TriggerComponent = (props) => {
    let counterRef = useRef(0);
    let { pressLetter, attempts } = useAppContext();
    useEffect(() => {
      if (counterRef.current < lettersToBePress.length) {
        pressLetter(lettersToBePress.charAt(counterRef.current++));
      } else {
        enterPressed = true;
        pressLetter('Enter');
        done();
      }
    }, [pressLetter, attempts]);
    return <div></div>;
  };

  let ReceiveComponent = (props) => {
    let { attempts } = useAppContext();
    props.callback(attempts);
    return <div></div>;
  };

  function callback(attempts) {
    expect(attempts.history.length).toBe(0);
    expect(enterPressed).toBe(false);
  }

  render(
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <TriggerComponent />
      <ReceiveComponent callback={callback} />
    </AppProvider>
  );
});

test('enter key pressed with check result', (done) => {
  let lettersToBePress = 'BUQUBULA';
  let enterPressed = false;
  let TriggerComponent = (props) => {
    let counterRef = useRef(0);
    let { pressLetter, attempts } = useAppContext();
    useEffect(() => {
      if (counterRef.current < lettersToBePress.length) {
        pressLetter(lettersToBePress.charAt(counterRef.current++));
      } else if (!enterPressed) {
        enterPressed = true;
        pressLetter('Enter');
      } else {
        done();
      }
    }, [pressLetter, attempts]);
    return <div></div>;
  };

  let ReceiveComponent = (props) => {
    let { attempts } = useAppContext();
    if (enterPressed) {
      props.callback(attempts);
    }
    return <div></div>;
  };

  function callback(attempts) {
    let attempt = attempts.history[0];
    expect(attempts.history.length).toBe(1);
    expect(attempt.guess).not.toBeFalsy();
    expect(attempt.checkResult).not.toBeFalsy();
    expect(attempt.checkResult).toEqual(['22', '10', '22', '10']);
  }

  render(
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <TriggerComponent />
      <ReceiveComponent callback={callback} />
    </AppProvider>
  );
});

test('check win', (done) => {
  let lettersToBePress = [
    ['BI', 'LU', 'BU', 'LU'],
    ['BU', 'LI', 'BU', 'QI'],
  ];
  let lettersCheckResult = [
    ['21', '21', '22', '00'],
    ['22', '22', '22', '22'],
  ];
  let finalEnterPressed = false;
  let hasFinished = false;
  let currentRound = 0;
  let TriggerComponent = (props) => {
    let counterRef = useRef(0);
    let { pressLetter, attempts, status } = useAppContext();
    useEffect(() => {
      if (hasFinished) {
        return;
      }

      if (currentRound < lettersToBePress.length) {
        let currentLetters = lettersToBePress[currentRound].join('').split('');
        let currentLetter = currentLetters[counterRef.current];

        if (counterRef.current < currentLetters.length) {
          pressLetter(currentLetter);
          counterRef.current++;
        } else {
          pressLetter('Enter');
          counterRef.current = 0;
          currentRound++;
        }
      }
      if (status === 'WIN') {
        hasFinished = true;
        finalEnterPressed = true;
        done();
      }
    }, [pressLetter, attempts, status]);
    return <div></div>;
  };

  let ReceiveComponent = (props) => {
    let { attempts } = useAppContext();
    if (finalEnterPressed) {
      props.callback(attempts);
    }
    return <div></div>;
  };

  function callback(attempts) {
    let history = attempts.history;
    expect(history.length).toBe(2);
    expect(history[0].guess).toEqual(lettersToBePress[0]);
    expect(history[0].checkResult).toEqual(lettersCheckResult[0]);
    expect(history[1].guess).toEqual(lettersToBePress[1]);
    expect(history[1].checkResult).toEqual(lettersCheckResult[1]);
  }

  render(
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <TriggerComponent />
      <ReceiveComponent callback={callback} />
    </AppProvider>
  );
});
