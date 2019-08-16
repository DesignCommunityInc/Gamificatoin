import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const CheckBox = ({
  id,
  type,
  onClick,
  defaultChecked,
}) => {
  const name = type === 'checkbox' ? 'checkbox' : 'radiobutton';
  return (
    <div className="check">
      <input type={type} id={id} onChange={onClick} name={name} defaultChecked={defaultChecked} />
      <svg width="15px" height="15px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </div>
  );
};

CheckBox.propTypes = propTypes;

export default CheckBox;
