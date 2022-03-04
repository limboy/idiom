import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import update from 'immutability-helper';
import combinations from '../data/combinations.json';
import { currentHourTs, nextHourTs } from '../utils/date';

export const AppContext = React.createContext();

let storeService;

function initState(config) {
  let state = JSON.parse(storeService.getItem('pyccy-state'));
  let currentHour = currentHourTs();

  if (state && currentHour > state.startTs) {
    storeService.removeItem('pyccy-state');
    state = null;
  }

  let placeholder = config.answer.en.map((letter) =>
    Array(letter.length)
      .fill(null)
      .map((_) => '_')
      .join('')
  );
  let attempts = {
    history: state ? state.attempts.history : [],
    current: state
      ? state.attempts.current
      : { guess: placeholder, checkResult: [] },
  };
  return {
    attempts,
    status: state ? state.status : '',
    config,
    startTs: currentHour,
    resetTs: nextHourTs(),
  };
}

function checkAttempt(attempt, answer) {
  attempt = attempt.map((letters) => letters.toLowerCase());
  // 0: not in
  // 1: in
  // 2: in and right position
  let checkResult = answer.map((letters) => Array(letters.length).fill('0'));
  // used to check if `in` letters have been all occupied. if yes they should be 0
  let occupiedLetters = {};
  // used to compare with occupiedLetters
  let answerLetters = {};
  answer.forEach((letters) => {
    letters.split('').forEach((letter) => {
      answerLetters[letter] = answerLetters[letter] || 0;
      answerLetters[letter] += 1;
      occupiedLetters[letter] = 0;
    });
  });

  // check right position first
  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < answer[i].length; j++) {
      let answerLetter = answer[i].charAt(j);
      if (answerLetter === attempt[i].charAt(j)) {
        checkResult[i][j] = '2';
        occupiedLetters[answerLetter] += 1;
      }
    }
  }

  // check remain letters
  for (let i = 0; i < attempt.length; i++) {
    for (let j = 0; j < attempt[i].length; j++) {
      if (checkResult[i][j] !== '2') {
        let currentLetter = attempt[i].charAt(j);
        if (Object.keys(answerLetters).indexOf(currentLetter) !== -1) {
          if (occupiedLetters[currentLetter] < answerLetters[currentLetter]) {
            occupiedLetters[currentLetter] += 1;
            checkResult[i][j] = '1';
          }
        }
      }
    }
  }

  return checkResult.map((letters) => letters.join(''));
}

function handleDeleteLetter(state) {
  let current = state.attempts.current.guess;

  // nothing to delete
  if (current.every((letters) => letters.indexOf('_') === 0)) {
    return state;
  }

  let newState = Object.assign({}, state);

  if (state.attempts.current.checkResult.length > 0) {
    newState = update(newState, {
      attempts: { current: { checkResult: { $set: [] } } },
    });
  }

  let currentCopy = current.slice().map((letters) => letters.split(''));
  let hasReplaced = false;
  for (let i = currentCopy.length - 1; i >= 0; i--) {
    for (let j = currentCopy[i].length - 1; j >= 0; j--) {
      if (currentCopy[i][j] !== '_') {
        currentCopy[i][j] = '_';
        hasReplaced = true;
        break;
      }
    }
    if (hasReplaced) {
      break;
    }
  }
  currentCopy = currentCopy.map((letters) => letters.join(''));

  return update(newState, {
    attempts: { current: { guess: { $set: currentCopy } } },
  });
}

function checkCombinations(guess) {
  let invalidIndexes = [];
  guess.forEach((letters, i) => {
    if (combinations.indexOf(letters.toLowerCase()) === -1) {
      invalidIndexes.push(i);
    }
  });
  return invalidIndexes;
}

function handleEnter(state) {
  let current = state.attempts.current.guess;
  let newState = Object.assign({}, state);

  // not full
  if (current.some((letters) => letters.indexOf('_') >= 0)) {
    return state;
  }

  let combinationCheckResult = checkCombinations(current);
  if (combinationCheckResult.length > 0) {
    newState = update(state, {
      attempts: { current: { checkResult: { $set: combinationCheckResult } } },
    });
    return newState;
  }

  let checkResult = checkAttempt(current, state.config.answer.en);
  newState = update(newState, {
    attempts: {
      history: { $push: [{ guess: current, checkResult }] },
    },
  });

  newState = update(newState, {
    attempts: {
      current: {
        $set: {
          guess: current.map((letters) =>
            Array(letters.length).fill('_').join('')
          ),
          checkResult: [],
        },
      },
    },
  });

  let hasFiguredOut = checkResult.every((letters) =>
    letters.split('').every((letter) => letter === '2')
  );

  if (hasFiguredOut) {
    newState = update(newState, { status: { $set: 'WIN' } });
  } else if (newState.attempts.history.length >= state.config.maxAttempts) {
    newState = update(newState, { status: { $set: 'FAIL' } });
  }

  return newState;
}

function handleLetter(state, letter) {
  let currentCopy = [...state.attempts.current.guess];

  // all filled
  if (
    currentCopy
      .join('')
      .split('')
      .every((letter) => letter !== '_')
  ) {
    return state;
  }

  for (let i = 0; i < currentCopy.length; i++) {
    if (currentCopy[i].indexOf('_') !== -1) {
      let letters = currentCopy[i].split('');
      let underscoreIndex = letters.indexOf('_');
      letters[underscoreIndex] = letter;
      currentCopy[i] = letters.join('');
      break;
    }
  }

  return update(state, {
    attempts: { current: { guess: { $set: currentCopy } } },
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'pressLetter':
      let letter = action.payload.letter;
      let newState;
      if (letter === 'Backspace') {
        newState = handleDeleteLetter(state);
      } else if (letter === 'Enter') {
        newState = handleEnter(state);
      } else {
        newState = handleLetter(state, letter);
      }
      return newState;
    default:
    // TODO
  }
}

export function AppProvider(props) {
  storeService = props.storeService;
  let [state, dispatch] = useReducer(reducer, initState(props.config));
  let statusRef = useRef(state.status);

  let pressLetter = useCallback(
    (letter) => {
      dispatch({ type: 'pressLetter', payload: { letter } });
    },
    [dispatch]
  );

  const value = {
    ...state,
    pressLetter,
    storeService,
  };

  useEffect(() => {
    storeService.setItem('pyccy-state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    // TODO add load from storeService to distingush
    if (state.status && statusRef.current !== state.status) {
      let statistics =
        JSON.parse(storeService.getItem('pyccy-statistics')) || [];
      statistics.push([
        state.startTs,
        state.status === 'FAIL' ? -1 : state.attempts.history.length,
      ]);
      storeService.setItem('pyccy-statistics', JSON.stringify(statistics));
    }
  }, [state]);

  return <AppContext.Provider value={value} {...props} />;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}
