import Board from '.';
import { AppProvider } from '../../hooks/useAppContext';

export default {
  title: 'Board',
  component: Board,
};

const appProviderConfig = {
  maxAttempts: 5,
  startTs: null,
  resetTs: null,
  answer: {
    en: ['bu', 'li', 'bu', 'qi'],
    cn: ['不', '离', '不', '弃'],
  },
};

const Template = ({ storeService, ...args }) => {
  return (
    <AppProvider config={appProviderConfig} storeService={storeService()}>
      <Board {...args} />
    </AppProvider>
  );
};

export const NoHistory = Template.bind({});

NoHistory.args = {
  storeService: () => {
    let _store = {};
    return {
      getItem: (key) => _store[key] || null,
      setItem: (key, value) => (_store[key] = JSON.stringify(value)),
    };
  },
};

export const SomeHistory = Template.bind({});
SomeHistory.args = {
  storeService: () => {
    let _store = {
      state: {
        history: [
          {
            guess: ['bu', 'cuo', 'he', 'huan'],
            checkResult: ['01', '210', '11', '0012'],
          },
          {
            guess: ['xi', 'zhu', 'bi', 'zuan'],
            checkResult: ['00', '001', '02', '010'],
          },
        ],
        current: ['__', '___', '__', '____'],
      },
    };
    return {
      getItem: (key) => JSON.stringify(_store[key]) || null,
      setItem: (key, value) => (_store[key] = JSON.stringify(value)),
    };
  },
};
