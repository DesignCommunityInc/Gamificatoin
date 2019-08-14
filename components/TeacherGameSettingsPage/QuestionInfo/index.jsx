import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Info extends React.Component {
  constructor() {
    super();
    // this.imageMoving = this.imageMoving.bind(this);
    this.viewQuestionText = this.viewQuestionText.bind(this);
    this.state = {
        active: false
    };
  }

  viewQuestionText() {
    const currentState = this.state.active;
    console.log(this.state);
    this.setState({ active: !currentState });
  }
 
  render() {
    const { text, counter, title, specUUD, specType, image, isLoading } = this.props;
    
    if(isLoading) return (
      <div>Loading...</div>
    );
    return(
      <div className="Question__info">
        <div className="Question__info__title">
          <p>Вопрос №211</p>
        </div>
      </div>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Info;