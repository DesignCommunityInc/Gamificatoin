import React from 'react'
// import { PropTypes } from "prop-types";
// import { ROOT } from '../../../constants/Routes'

class ExtraContent extends React.Component {
  constructor() {
    super();
    this.state = {
        active: false,
    };
  }
  

  render() {

    const { isLoading, title, value } = this.props;
    if(isLoading) return (
      <div>Loading...</div>
    );

    return(
      <div className="ViewPage__main__extra__content__line">
        <p className="ViewPage__main__extra__content__line__title">{title}</p>
        <p className="ViewPage__main__extra__content__line__value">{value}</p>
      </div>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default ExtraContent;