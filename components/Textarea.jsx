import React from 'react';
import { PropTypes } from 'prop-types';

const propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.string,
};
const defaultProps = {
    id: 0,
    title: '',
    value: ''
};

const Textarea = ({
  id,
  title,
  value,
}) => {
  return (
    <div className="text__area">
        <textarea name="" id={id} cols="30" rows="10" defaultValue={value}></textarea>
        <p className="text__area__title">{title}</p>
    </div> 
  );
};


Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
