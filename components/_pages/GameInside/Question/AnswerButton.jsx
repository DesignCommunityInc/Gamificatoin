import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // answer: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

const AnswerButton = ({ onClick }) => (
  <span
    onClick={() => onClick()}
    role="button"
    onKeyDown={() => {}}
    tabIndex="0"
    className="button button-main button button-main-light button-main-light-colorful"
    style={{ textAlign: 'center' }}
  >
    Ответить
  </span>
);

AnswerButton.propTypes = propTypes;

export default AnswerButton;
