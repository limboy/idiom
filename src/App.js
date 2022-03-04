import './App.css';
import { AppProvider } from './hooks/useAppContext';
import { currentHourTs } from './utils/date';
import idiom from './utils/idiom';
import Nav from './components/Nav';
import Inner from './components/Inner';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Result from './components/Result';
import { Toaster } from 'react-hot-toast';
import Help from './components/Help';
import { useState } from 'react';
import Statistics from './components/Statistics';

const config = () => {
  return {
    answer: idiom.idiomBySeed(currentHourTs()),
    maxAttempts: 6,
  };
};

function App() {
  let [isShowHelp, setShowHelp] = useState(
    !localStorage.getItem('pyccy-state')
  );
  let [isShowStatistics, setShowStatistics] = useState(false);
  return (
    <AppProvider config={config()} storeService={localStorage}>
      <Inner>
        <div className="flex flex-col justify-between h-full pb-3">
          <Nav
            onHelpClick={() => setShowHelp(true)}
            onStatisticsClick={() => setShowStatistics(true)}
          />
          <Board />
          <Keyboard />
          <Result />
          <Help isOpen={isShowHelp} onClose={() => setShowHelp(false)} />
          <Statistics
            isOpen={isShowStatistics}
            onClose={() => setShowStatistics(false)}
          />
        </div>
      </Inner>
      <Toaster />
    </AppProvider>
  );
}

export default App;
