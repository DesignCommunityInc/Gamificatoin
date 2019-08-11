import React from 'react';
import PropTypes from 'prop-types';
import Info from './Info';

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  info: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const Stat = ({ title, value, info }) => (
  <div className="stat">
    <span className="stat__title">
      <p>{title}</p>
      <p className="stat__title__counter">{value}</p>
    </span>
    <div className="stat__bar__wrapper">
      {/* лучше вынести в компонент и там считать логику */}
      {info.map(inf => (
        <div
          style={{ width: `${inf.value / value * 100}%` }}
          className="stat__bar"
        >
          <p>{inf.value}</p>
        </div>
      ))}
    </div>
    <div className="stat__info__wrapper">
      {info.map(inf => (
        <Info
          name={inf.name}
        />
      ))}
    </div>
  </div>
);

Stat.propTypes = propTypes;

export default Stat;
