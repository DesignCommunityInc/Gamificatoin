import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const defaultTypes = {
};

class Stat extends React.Component {
  render() {
    const { title, value } = this.props;
    return (
      <div className="stat">
        <div className="stat_info">
          <p>{value}</p>
        </div>
        <p className="stat__title">{title}</p>
      </div>
    )
  }
}

Stat.defaultTypes = defaultTypes;

export default Stat;
