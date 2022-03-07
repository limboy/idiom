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
import './utils/fingerprint';
import Modal from './components/Modal';

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
  let statistics = JSON.parse(localStorage.getItem('pyccy-statistics'));
  if (statistics) {
    let simplifiedStatistics = Array(config().maxAttempts + 1).fill(0);
    statistics.forEach((item) => {
      let guessCount = item[1];
      // failed
      if (guessCount === -1) {
        simplifiedStatistics[0] += 1;
      } else {
        simplifiedStatistics[guessCount] += 1;
      }
    });
    statistics = simplifiedStatistics;
  } else {
    statistics = Array(config().maxAttempts + 1).fill(0);
  }

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
          <Modal
            isOpen={isShowStatistics}
            onClose={() => setShowStatistics(false)}
            title="数据统计"
          >
            <Statistics statistics={statistics} />
          </Modal>
        </div>
      </Inner>
      <Toaster />
    </AppProvider>
  );
}

export default App;
