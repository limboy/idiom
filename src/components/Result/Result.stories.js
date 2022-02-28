import { AppProvider } from '../../hooks/useAppContext';
import {
  appProviderConfig,
  storeServiceWithFinishWinStatus,
  storeServiceWithFinishFailStatus,
} from '../../data/test';
import Result from '.';

export default {
  title: 'Result',
  component: Result,
};

const Template = ({ storeService, ...args }) => {
  return (
    <AppProvider config={appProviderConfig} storeService={storeService}>
      <Result {...args} />
    </AppProvider>
  );
};

export const Win = Template.bind({});
Win.args = {
  storeService: storeServiceWithFinishWinStatus(),
};

export const Fail = Template.bind({});
Fail.args = {
  storeService: storeServiceWithFinishFailStatus(),
};
