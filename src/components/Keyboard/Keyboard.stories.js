import Keyboard from '.';

export default {
  title: 'Keyboard',
  component: Keyboard,
};

export const Default = (
  <Keyboard onKeyPress={(letter) => console.log(letter)} />
);
