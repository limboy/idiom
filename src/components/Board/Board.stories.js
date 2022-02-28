import Board from '.';
import { AppProvider } from '../../hooks/useAppContext';
import {
  appProviderConfig,
  storeServiceWithNoHistory,
  storeServiceWithSomeHistory,
} from '../../data/test';

export default {
  title: 'Board',
  component: Board,
};

const Template = ({ storeService, ...args }) => {
  return (
    <AppProvider config={appProviderConfig} storeService={storeService}>
      <Board {...args} />
    </AppProvider>
  );
};

export const NoHistory = Template.bind({});

NoHistory.args = {
  storeService: storeServiceWithNoHistory(),
};

export const SomeHistory = Template.bind({});
SomeHistory.args = {
  storeService: storeServiceWithSomeHistory(),
};
