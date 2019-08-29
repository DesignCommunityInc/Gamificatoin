import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};
const defaultProps = {
  onKeyDown: () => {},
  tabIndex: 0,
  title: '',
  icon: null,
};

const Button = ({
  className,
  onClick,
  onKeyDown,
  tabIndex,
  title,
  icon,
}) => (
  <span
    className={className}
    onClick={onClick}
    onKeyDown={onKeyDown}
    tabIndex={tabIndex}
    role="button"
  >
    {icon && <span style={{ backgroundImage: `url('${icon}')` }} /> }
    {title}
  </span>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
