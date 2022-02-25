import Nav from '.';
import Inner from '../Inner';
import PropTypes from 'prop-types';

const Component = (props) => {
  return (
    <Inner>
      <Nav {...props} />
    </Inner>
  );
};

Component.propTypes = {
  title: PropTypes.string,
};

export default {
  title: 'Nav',
  component: Nav,
};

export const Default = {
  args: {},
};
