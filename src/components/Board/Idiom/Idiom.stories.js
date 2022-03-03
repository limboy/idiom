import Idiom from '.';
import {
  appProviderConfig,
  storeServiceWithSomeHistory,
} from '../../../data/test';
import { AppProvider } from '../../../hooks/useAppContext';

export default {
  title: 'Idiom',
  component: Idiom,
};

const Template = ({ ...args }) => {
  return (
    <AppProvider
      config={appProviderConfig}
      storeService={storeServiceWithSomeHistory()}
    >
      <Idiom {...args} />
    </AppProvider>
  );
};

export const Current = Template.bind({});
Current.argTypes = {
  checkResult: { control: { disable: true } },
};
Current.args = {
  letters: ['yi', 'xin', 'er', 'yong'],
};

export const History = Template.bind({});
History.args = {
  letters: ['yi', 'xin', 'er', 'yong'],
  checkResult: ['21', '001', '22', '0120'],
};
