import { nextHourTs } from '../utils/date';

export const appProviderConfig = {
  maxAttempts: 5,
  startTs: null,
  resetTs: nextHourTs(),
  answer: {
    en: ['bu', 'li', 'bu', 'qi'],
    cn: ['不', '离', '不', '弃'],
  },
};

export const storeServiceWithNoHistory = () => {
  let _store = {};
  return {
    getItem: (key) => _store[key] || null,
    setItem: (key, value) => (_store[key] = JSON.stringify(value)),
  };
};

export const storeServiceWithSomeHistory = () => {
  let state = {
    attempts: {
      history: [
        {
          guess: ['BU', 'QU', 'BU', 'LA'],
          checkResult: ['22', '10', '22', '10'],
        },
      ],
      current: ['ZI', 'L_', '__', '__'],
    },
    status: '',
  };

  let store = storeServiceWithNoHistory();
  store.setItem('pyccy-state', state);
  return store;
};
