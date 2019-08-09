import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Info from './Info';

const defaultTypes = {
};

class Stat extends React.Component {
  render() {
    const { title, value, info } = this.props;
    return (
      <div className="stat">
        <span className="stat__title">
          <p>{title}</p>
          <p className="stat__title__counter">{value}</p>
        </span>
        <div className="stat__bar__wrapper">
        {info.map((inf, i) => {                    
           let percent = inf.value / value * 100; 
           return (<>
            <div style={{width: percent + '%'}} className="stat__bar">
              <p>{inf.value}</p>
            </div>
           </>) 
        })}

        </div>
        <div className="stat__info__wrapper">
        {info.map((inf, i) => {                    
           return (<>
              <Info
                name = {inf.name}
              />
           </>) 
        })}
        </div>
      </div>
    )
  }
}

Stat.defaultTypes = defaultTypes;

export default Stat;
