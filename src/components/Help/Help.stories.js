import { useState } from 'react';
import Help from '.';

export default {
  title: 'Help',
  component: Help,
};

const Template = ({ ...args }) => {
  let [isOpen, setIsOpen] = useState(true);
  return <Help {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export const Default = Template.bind({});
Default.args = {};
