import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Mode = ({
  title,
  link,
}) => (
  <Link to={`games/create/${link}`} className="Games__mode Games__mode--teacher">
    <p>{title}</p>
  </Link>
);


Mode.propTypes = propTypes;

export default Mode;
