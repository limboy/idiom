import Keyboard from '.';
import { AppProvider } from '../../hooks/useAppContext';
import {
  appProviderConfig,
  storeServiceWithNoHistory,
  storeServiceWithSomeHistory,
} from '../../data/test';

export default {
  title: 'Keyboard',
  component: Keyboard,
};

const Template = ({ ...args }) => {
  return (
    <AppProvider config={appProviderConfig} storeService={args.storeService}>
      <Keyboard onKeyPress={(letter) => console.log(letter)} />
    </AppProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  storeService: storeServiceWithNoHistory(),
};

export const Highlight = Template.bind({});
Highlight.args = {
  storeService: storeServiceWithSomeHistory(),
};
