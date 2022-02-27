import Keyboard from '.';
import { AppProvider } from '../../hooks/useAppContext';

const appProviderConfig = {
  maxAttempts: 5,
  startTs: null,
  resetTs: null,
  answer: {
    en: ['bu', 'li', 'bu', 'qi'],
    cn: ['不', '离', '不', '弃'],
  },
};

const storeService = () => {
  let _store = {};
  return {
    getItem: (key) => _store[key] || null,
    setItem: (key, value) => (_store[key] = JSON.stringify(value)),
  };
};

export default {
  title: 'Keyboard',
  component: Keyboard,
};

const Template = ({ ...args }) => {
  return (
    <AppProvider config={appProviderConfig} storeService={args.storeService()}>
      <Keyboard onKeyPress={(letter) => console.log(letter)} />
    </AppProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  storeService: storeService,
};

const highlightStoreService = () => {
  let _store = {
    state: {
      history: [
        {
          guess: ['bu', 'ji', 'bu', 'zu'],
          checkResult: ['22', '10', '00', '10'],
        },
      ],
      current: ['bu', 'yi', 'er', 'z_'],
    },
  };
  return {
    getItem: (key) => JSON.stringify(_store[key]) || null,
    setItem: (key, value) => (_store[key] = JSON.stringify(value)),
  };
};

export const Highlight = Template.bind({});
Highlight.args = {
  storeService: highlightStoreService,
};
