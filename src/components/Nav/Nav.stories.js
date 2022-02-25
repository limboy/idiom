import Nav from '.';
import Inner from '../Inner';

const Component = (props) => {
  return (
    <Inner>
      <Nav />
    </Inner>
  );
};

export default {
  title: 'Nav',
  Component,
};

export const Wide = () => <Component />;
export const Small = () => <Component />;
