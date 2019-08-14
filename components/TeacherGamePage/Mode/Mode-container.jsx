import React from 'react'
import { Link } from 'react-router-dom';
// import { PropTypes } from "prop-types";

class Mode extends React.Component {
  render() {
    const { title, link } = this.props;
    return (   
      <Link to={`games/create/${link}`} className="Games__mode">
        {/* <div> */}
          <p>{title}</p>
        {/* </div> */}
      </Link>
    )
  }
}


// StartButton.propTypes = propTypes;
// StartButton.defaultTypes = defaultTypes;

export default Mode;
