import React from 'react'
import { Link } from 'react-router-dom';
// import { PropTypes } from "prop-types";

const StartButton = ({ title, link }) => {
  return (
    <Link to={link} className="button button-action">{title}</Link>
  )
}


// StartButton.propTypes = propTypes;
// StartButton.defaultTypes = defaultTypes;

export default StartButton;
