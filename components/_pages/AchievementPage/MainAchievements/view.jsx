import React from 'react';
import PropTypes from 'prop-types';
// import Achievement from './Achievement';

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  exp_add: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  progress: PropTypes.number,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  progress: 0,
  name: '',
  description: '',
  exp_add: '',
  isLoading: false,
};

const Achievement = ({
  name,
  description,
  exp_add: reward,
  progress,
  isLoading,
}) => (isLoading ? (
  <div className="achievement-big">
    <div className="achievement-big__container--loading">
      <div className="achievement-big__icon__container">
        <span className="achievement-big__icon achievement-big__icon--loading" />
      </div>
      <div className="achievement-big__info--loading">
        <h2> </h2>
        <h3> </h3>
        <span className="achievement-big__reward--loading" />
      </div>
    </div>
    <div className="achievement-big__progress" />
  </div>
) : (
  <div className="achievement-big">
    <div className="achievement-big__container">
      <div className="achievement-big__icon__container">
        <span className="achievement-big__icon" />
      </div>
      <div className="achievement-big__info">
        <h2>{name}</h2>
        <h3>{description}</h3>
        <span className="achievement-big__reward">{`+${reward} xp`}</span>
      </div>
    </div>
    <div className="achievement-big__progress">
      <span className="achievement-big__progress-done" style={{ width: `${progress}%` }} />
    </div>
  </div>
));


Achievement.propTypes = propTypes;
Achievement.defaultProps = defaultProps;

export default Achievement;
