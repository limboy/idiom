import Idiom from '.';

export default {
  title: 'Idiom',
  component: Idiom,
};

const Template = ({ ...args }) => {
  return <Idiom {...args} />;
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
  letters: ['yi', 'xin', 'er', 'yon_'],
  checkResult: ['21', '001', '22', '0120'],
};
