import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Participant extends React.Component {



  render() {
    const { isLoading, name, patronymic, surname, type} = this.props;
    // console.log(this.props);

    if(isLoading) return (
      <div>Loading...</div>
    );

    return(
      <div className="participant">
        <div className="participant__info">
          <p className="participant__info__middlename">{surname}</p>
          <p className="participant__info__name__secondname">{name} {patronymic}</p>
        </div>
        <div type={type} className="participant__status">
          {type === "complete" ? "прошел" : "не приступал"}
        </div>
      </div>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Participant;