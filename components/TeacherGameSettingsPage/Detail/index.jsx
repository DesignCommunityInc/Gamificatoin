import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Detail extends React.Component {



  render() {
    const { isLoading, title, value} = this.props;
    // console.log(this.props);

    if(isLoading) return (
      <div>Loading...</div>
    );

    return(
        <div className="Game__information__detail">
            <div className="Game__information__detail__title">
                <span className="Game__information__detail__title__image"></span>
                <span className="Game__information__detail__title__text">{title}</span>
            </div>
            <p className="Game__information__detail__value">{value}</p>
        </div>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Detail;