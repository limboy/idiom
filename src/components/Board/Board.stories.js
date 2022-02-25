import Board from '.';

export default {
  title: 'Board',
  component: Board,
};

const Template = ({ ...args }) => {
  return <Board {...args} />;
};

export const NoHistory = Template.bind({});
NoHistory.args = {
  history: [],
  current: ['__', '___', '__', '____'],
  maxAttempts: 6,
};

export const SomeHistory = Template.bind({});
SomeHistory.args = {
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
  maxAttempts: 6,
};
