import './App.css';
import { AppProvider } from './hooks/useAppContext';
import { currentHourTs, nextHourTs } from './utils/date';
import idiom from './utils/idiom';
import Nav from './components/Nav';

const config = () => {
  let localState = JSON.parse(localStorage.getItem('state'));
  return {
    startTs: localState ? localState.startTs : null,
    resetTs: nextHourTs(),
    answer: idiom.idiomBySeed(currentHourTs()),
    maxAttempts: 6,
  };
};

function App() {
  return (
    <AppProvider config={config()} storeService={localStorage}>
      <Nav />
    </AppProvider>
  );
}

export default App;
