import React from 'react'
import { PropTypes } from "prop-types";
// import Achievement from './Achievement';

const propTypes = {
    icon: PropTypes.string.isRequired,
    info: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    reward: PropTypes.number.isRequired,   
};

const defaultTypes = {
    icon: null,
    info: {
        name: '',
        description: '',
    },
    reward: 300,
};

const Achievement = ({ 
  title,
  description, 
  reward, 
  progress = 0,
  isLoading,
}) => {
  if(isLoading) {
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
    )
  }
  const style = { width: `${progress}%` };
  return (
    <div className="achievement">
      <div className="achievement__icon__container">
        <span className="achievement__icon" />
        <div className="achievement__progress">
          <span 
            className="achievement__progress-done" 
            style={style}
          />
        </div>
      </div>
      <div className="achievement__info">
          <h4>{title}</h4>
          <span className="achievement__reward">{reward} xp</span>
          <h5>{description}</h5>
      </div>
    </div>
  )
}
// Achievement.propTypes = propTypes;
// Achievement.defaultTypes = defaultTypes;

export default Achievement;
