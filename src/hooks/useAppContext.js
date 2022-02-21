import React, { useCallback, useReducer } from 'react';

export const AppContext = React.createContext();

function initState(storeService, config) {
  let state = JSON.parse(storeService.getItem('state'));
  if (!state) {
    let attempts = {
      history: state.history || [],
      current:
        state.current ||
        config.answer.en.map((letter) => Array(letter.length).fill('_')),
    };
    state = {
      attempts,
      status: '',
      config,
    };
  }
  return state;
}

function reducer() {}

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
