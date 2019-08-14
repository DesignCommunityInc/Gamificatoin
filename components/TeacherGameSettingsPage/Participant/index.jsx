import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Participant extends React.Component {



  render() {
    const { isLoading, name, middlename, secondname} = this.props;
    console.log(this.props);

    if(isLoading) return (
      <div>Loading...</div>
    );

    return(
      <div className="participant">
        <div className="participant__info">
          <p className="participant__info__middlename">{secondname}</p>
          <p className="participant__info__name__secondname">{name} {middlename}</p>
        </div>
        <div type="completed" className="participant__status">
          прошел
        </div>
      </div>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Participant;