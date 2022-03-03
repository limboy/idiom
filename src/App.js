import './App.css';
import { AppProvider } from './hooks/useAppContext';
import { currentHourTs, nextHourTs } from './utils/date';
import idiom from './utils/idiom';
import Nav from './components/Nav';
import Inner from './components/Inner';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Result from './components/Result';
import { Toaster } from 'react-hot-toast';
import Help from './components/Help';
import { useState } from 'react';

const config = () => {
  return {
    answer: idiom.idiomBySeed(currentHourTs()),
    maxAttempts: 6,
  };
};

function App() {
  let [isShowHelp, setShowHelp] = useState(false);
  function onHelpClick() {
    setShowHelp(true);
  }
  return (
    <AppProvider config={config()} storeService={localStorage}>
      <Inner>
        <div className="flex flex-col justify-between h-full pb-3">
          <Nav onHelpClick={onHelpClick} />
          <Board />
          <Keyboard />
          <Result />
          <Help isOpen={isShowHelp} onClose={() => setShowHelp(false)} />
        </div>
      </Inner>
      <Toaster />
    </AppProvider>
  );
}

export default App;
