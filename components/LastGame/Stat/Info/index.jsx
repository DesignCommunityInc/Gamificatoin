import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const defaultTypes = {
};

class Info extends React.Component {
  render() {
    const { name, color } = this.props;
    return (
    <div className="stat__info">
      <div style={{background: color}} className="colored__circle"></div>
      <p className="stat__info__name">{name}</p>
    </div>
    )
  }
}

Info.defaultTypes = defaultTypes;

export default Info;
