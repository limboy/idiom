import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const AppContext = React.createContext();

export function AppProvider(props) {
  let config = props.config;
  let [status, setStatus] = useState('');
  let [attempts, setAttempts] = useState({
    history: [],
    current: [],
    waiting: [],
  });
  let pressLetter = useCallback(() => {
    // TODO
  }, []);

  const value = {
    status,
    attempts,
    config,
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
