import React from 'react';
import PropTypes from 'prop-types';
// import Achievement from './Achievement';

const propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  exp_add: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  progress: PropTypes.number,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  name: '',
  image: '',
  description: '',
  exp_add: '',
  progress: 0,
  isLoading: false,
};

const Achievement = ({
  name,
  description,
  exp_add: reward,
  progress,
  isLoading,
  image,
}) => {
  if (isLoading) {
    return (
      <div className="achievement">
        <div className="achievement__icon__container">
          <span className="achievement__icon" />
          <div className="achievement__progress" />
        </div>
        <div className="achievement__info achievement__info-loading">
          <h4> </h4>
          <h5> </h5>
        </div>
      </div>
    );
  }
  const style = { width: `${progress}%` };
  return (
    <div className="achievement">
      <div className="achievement__icon__container">
        <span className="achievement__icon" style={{ backgroundImage: `url('${image}')` }} />
        <div className="achievement__progress">
          <span
            className="achievement__progress-done"
            style={style}
          />
        </div>
      </div>
      <div className="achievement__info">
        <h4>{name}</h4>
        <span className="achievement__reward">{`${reward} xp`}</span>
        <h5>{description}</h5>
      </div>
    </div>
  );
};

Achievement.propTypes = propTypes;
Achievement.defaultProps = defaultProps;

export default Achievement;
