import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Type extends React.Component {
  constructor() {
    super();
    this.setActive = this.setActive.bind(this);
    this.state = {
        active: false,
    };
  }

  setActive() {
    this.props.onClick(this.props.id);
  }


  render() {

    const { isLoading, name, id, active } = this.props;
    if(isLoading) return (
      <div>Loading...</div>
    );
    return(
        <div onClick={this.setActive} tile_id={id} className={`Options__type ${active}`}>
            <p>{name}</p>
        </div>
    )
  }
}

// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Type;