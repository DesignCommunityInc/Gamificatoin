import React from 'react'
// import { PropTypes } from "prop-types";
import Classmates from '../../Classmates';


class Players extends React.Component {
  render() {
    const { isLoading } = this.props;
    
    if(isLoading) return (
      <div>Loading...</div>
    );
    return(
      <section className="Container">
        <Classmates />
      </section>
    )
  }
}


// Players.propTypes = propTypes;
// Players.defaultTypes = defaultTypes;

export default Players;