import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Detail = ({
  isLoading,
  title,
  value,
}) => (isLoading ? (
  <div />
) : (
  <div className="Game__information__detail">
    <div className="Game__information__detail__title">
      <span className="Game__information__detail__title__image" />
      <span className="Game__information__detail__title__text">{title}</span>
    </div>
    <p className="Game__information__detail__value">{value}</p>
  </div>
));


Detail.propTypes = propTypes;

export default Detail;
