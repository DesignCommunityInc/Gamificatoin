import React from 'react'
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
  // request: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};
const defaultTypes = {
    request: {},
    isLoading: false,
    error: null,
};

class Classmates extends React.Component {
  componentDidMount() {
    // fetch mates here
  }
  render() {
    return (
      <section className="Classmates">
        <Link to="/my/classmates" className="Container__title Container__title-forward">Мой класс</Link>
        <div className="Classmates__container">
          <div className="tag-list">
            <span className="tag-list__item">4Б</span>
          </div>
          <div className="Classmates__toggle">
            <span></span>
          </div>
          <div className="mates">
            <span className="mates__image" />
            <span className="mates__image" />
            <span className="mates__image" />
            <span className="mates__count">+ 25 человек</span>
          </div>
        </div>
      </section>
    )
  }
}


Classmates.propTypes = propTypes;
Classmates.defaultTypes = defaultTypes;

export default Classmates;