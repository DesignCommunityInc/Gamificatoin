import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '../../../Button';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentItem: PropTypes.number,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
const defaultProps = {
  currentItem: null,
};

const Type = ({
  list,
  currentItem,
  onClick,
  title,
}) => (
  <div className="Options__inside__wrapper">
    <div className="Options__inside__wrapper__title">{title}</div>
    {list.map((item, idx) => (
      <Button
        key={uid()}
        onClick={() => onClick(idx)}
        className={`Options__type ${currentItem === idx ? 'Options__type--active' : ''}`}
        title={item}
      />
    ))}
  </div>
);


Type.propTypes = propTypes;
Type.defaultProps = defaultProps;

export default Type;
