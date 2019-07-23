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
}) => {
  const style = { width: `${progress}%` };
  return (
    <div className="achievement-big">
      <div className="achievement-big__container">
        <div className="achievement-big__icon__container">
          <span className="achievement-big__icon" />
        </div>
        <div className="achievement-big__info">
          <h2>{title}</h2>
          <h3>{description}</h3>
          <span className="achievement-big__reward">+{reward} xp</span>
        </div>
      </div>
      <div className="achievement-big__progress">
        <span className="achievement-big__progress-done" style={style}/>
      </div>
    </div>
  );
}

// Achievement.propTypes = propTypes;
// Achievement.defaultTypes = defaultTypes;

export default Achievement;
