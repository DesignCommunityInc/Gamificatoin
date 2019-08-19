import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Class extends React.Component {
  constructor() {
    super();
    this.setActive = this.setActive.bind(this);
  }

  setActive() {
    this.props.onClick(this.props.id);
  }
  render() {

    const { name, isLoading, id, active } = this.props;
    if(isLoading) return (
      <div>Loading...</div>
    );
    // console.log(this.props);
    return(
      <div onClick={this.setActive} tile_id={id} className={`Options__class ${active}`}>
        <p>{name}</p>
      </div>
    )
  }
}

// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Class;