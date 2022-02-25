import Idiom from '.';

export default {
  title: 'Idiom',
  component: Idiom,
};

const Template = ({ ...args }) => {
  return <Idiom {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  letters: ['yi', 'xin', 'er', 'yong'],
};
