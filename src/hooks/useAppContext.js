import React, { useCallback, useReducer } from 'react';
import update from 'immutability-helper';

export const AppContext = React.createContext();

function initState(storeService, config) {
  let state = JSON.parse(storeService.getItem('state'));
  if (!state) {
    let attempts = {
      history: state ? state.history : [],
      current: state
        ? state.current
        : config.answer.en.map((letter) =>
            Array(letter.length)
              .fill(null)
              .map((_) => '_')
              .join('')
          ),
    };
    state = {
      attempts,
      status: '',
      config,
    };
  }
  return state;
}

function checkAttempt(attempt, answer) {
  // 0: not in
  // 1: in
  // 2: in and right position
  let checkResult = answer.map((letters) => Array(letters.length).fill('0'));
  // used to check if `in` letters have been all occupied. if yes they should be 0
  let occupiedLetters = {};
  // used to compare with occupiedLetters
  let answerLetters = {};
  answer.forEach((letters) =>
    letters.spilt('').forEach((letter) => {
      answerLetters[letter] = answerLetters[letter] || 0;
      answerLetters[letter] += 1;
      occupiedLetters[letter] = 0;
    })
  );

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
        if (answerLetters.flat().indexOf(attempt[i].charAt(j)) !== -1) {
          if (occupiedLetters[i][j] < answerLetters[i][j]) {
            occupiedLetters[i][j] += 1;
            checkResult[i][j] = '1';
          }
        }
      }
    }
  }

  return checkResult.map((letters) => letters.join(''));
}

function handleDeleteLetter(state) {
  let current = state.attempts.current;

  // nothing to delete
  if (current.every((letters) => letters.indexOf('_') === 0)) {
    return state;
  }

  let currentCopy = current.slice();
  for (let i = currentCopy.length - 1; i >= 0; i--) {
    if (currentCopy[i].indexOf('_') !== 0) {
      for (let j = 0; j < currentCopy[i].length; j++) {
        if (currentCopy[i][j] === '_') {
          currentCopy[i][j - 1] = '_';
        }
      }
    }
  }

  return update(state, { attempts: { current: { $set: currentCopy } } });
}

function handleEnter(state) {
  let current = state.attempts.current;
  let newState = Object.assign({}, state);

  // not full
  if (current.some((letters) => letters.indexOf('_') >= 0)) {
    return state;
  }

  let checkResult = checkAttempt(current, state.config.answer.en);
  newState = update(newState, {
    history: { $push: [{ guess: current, checkResult }] },
  });

  newState = update(newState, { current: { $set: [] } });

  let hasFiguredOut = checkResult.every((letters) =>
    letters.split('').every((letter) => letter === '2')
  );

  if (hasFiguredOut) {
    newState = update(newState, { status: { $set: 'WIN' } });
  } else if (newState.history.length >= state.maxAttempts) {
    newState = update(newState, { status: { $set: 'FAIL' } });
  }

  return newState;
}

function handleLetter(state, letter) {
  let currentCopy = [...state.attempts.current];

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

  return update(state, { attempts: { current: { $set: currentCopy } } });
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
  let [state, dispatch] = useReducer(
    reducer,
    initState(props.storeService, props.config)
  );

  let pressLetter = useCallback(
    (letter) => {
      dispatch({ type: 'pressLetter', payload: { letter } });
    },
    [dispatch]
  );

  const value = {
    ...state,
    pressLetter,
  };

  return <AppContext.Provider value={value} {...props} />;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}
