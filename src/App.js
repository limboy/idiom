import './App.css';
import { AppProvider } from './hooks/useAppContext';
import { currentHourTs, nextHourTs } from './utils/date';
import idiom from './utils/idiom';
import Nav from './components/Nav';

const config = () => {
  let localState = JSON.parse(localStorage.getItem('state'));
  return {
    startTs: localState.startTs,
    resetTs: nextHourTs(),
    answer: idiom.idiomBySeed(currentHourTs()),
  };
};

function App() {
  return (
    <AppProvider config={config()}>
      <Nav />
    </AppProvider>
  );
}

export default App;
