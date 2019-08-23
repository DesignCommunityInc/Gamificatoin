import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
const defaultProps = {
};

const Level = ({
  isLoading,
  data: {
    rating,
    level,
    exp_current: current,
    exp_need: need,
    exp_left: left,
  } = {},
}) => {
  const progressBarWidth = (current / need) * 100;
  if (isLoading) {
    return (
      <section className="Level">
        <div className="Level__container">
          <span className="Level__title Level__title-loading" />
          <div className="Level__rate Level__rate-loading" />
          <span className="Level__title Level__title-small Level__title-small-loading" />
          <div className="Level__progress Level__progress-loading">
            <div className="Level__progress-bar Level__progress-bar-loading" style={{width: '0'}} />
          </div>
          <span className="Level__subtitle Level__subtitle-loading" />
        </div>
      </section>
    );
  }
  return (
    <section className="Level">
      <div className="Level__container">
        <span className="Level__title">Рейтинг</span>
        <div className="Level__rate">{rating}</div>
        <span className="Level__title Level__title-small">Уровень</span>
        <div className="Level__progress" current-level={level} next-level={`${level + 1}`}>
          <div className="Level__progress-bar" style={{ width: `${progressBarWidth}%` }} />
        </div>
        <span className="Level__subtitle">
          Осталось
          <b>{` ${left}xp `}</b>
          из
          <b>{` ${need}xp`}</b>
        </span>
      </div>
    </section>
  )
}


Level.propTypes = propTypes;
Level.defaultProps = defaultProps;

export default Level;
