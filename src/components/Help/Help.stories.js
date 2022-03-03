import Help from '.';

export default {
  title: 'Help',
  component: Help,
};

const Template = ({ ...args }) => {
  return <Help {...args} />;
};

export const Default = Template.bind({});
Default.args = { isOpen: true };
