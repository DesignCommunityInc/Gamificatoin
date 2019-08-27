import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  isLoading: false,
  title: '',
  value: '',
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
Detail.defaultProps = defaultProps;

export default Detail;
