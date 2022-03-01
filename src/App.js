import './App.css';
import { AppProvider } from './hooks/useAppContext';
import { currentHourTs, nextHourTs } from './utils/date';
import idiom from './utils/idiom';
import Nav from './components/Nav';
import Inner from './components/Inner';
import Board from './components/Board';
import Keyboard from './components/Keyboard';

const config = () => {
  let localState = JSON.parse(localStorage.getItem('pyccy-state'));
  let currentHour = currentHourTs();

  if (localState && currentHour > localState.startTs) {
    localState.removeItem('pyccy-state');
  }

  return {
    startTs: currentHour,
    resetTs: nextHourTs(),
    answer: idiom.idiomBySeed(currentHour),
    maxAttempts: 6,
  };
};

function App() {
  return (
    <AppProvider config={config()} storeService={localStorage}>
      <Inner>
        <div className="flex flex-col justify-between h-full pb-3">
          <Nav />
          <Board />
          <Keyboard />
        </div>
      </Inner>
    </AppProvider>
  );
}

export default App;
