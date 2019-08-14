import React from 'react'
// import { PropTypes } from "prop-types";
import { ROOT } from '../../../constants/Routes'

class Question extends React.Component {
  constructor() {
    super();
    // this.imageMoving = this.imageMoving.bind(this);
    this.viewQuestionText = this.viewQuestionText.bind(this);
    this.state = {
        active: false,
    };
  }

  viewQuestionText(id) {
    // const currentState = this.state.active;
    console.log(this);
    this.props.onClick(this.props.id);
    // this.setState({ active: !currentState });
  }


  render() {
    const { text, counter, title, specUUD, specType, image, isLoading, id , active, subject, answers=[]} = this.props;
    console.log(this.props);
    if(isLoading) return (
      <div>Loading...</div>
    );

    return(
      <div className={`question ${active}`}>
        <div className="question__left_side">
          <div className="question__counter">
            <p>{counter}</p>
          </div>
          <div onClick={this.viewQuestionText} className="question__view__button--mobile"> </div>
        </div>
        <div className="question__information">
          <div className="question__information__title">{title}</div>
          <div className="question__information__specs">
            <p className="spec__type">{specType}</p>
            <p className="spec__uud">{specUUD}</p>
          </div>
        </div>
        <div className="question__view__button__wrapper">
          <div onClick={this.viewQuestionText} className="question__view__button"></div>
        </div>
        <div className="question__bigView">
          <div className="question__bigView__title">
            <p>{title}</p>
          </div>
          <div className="question__bigView__tags">
            <p type="subject">{subject}</p>
          </div>
          <div className="question__bigView__text">
            <p className="question__bigView__text__title">Текст вопроса</p>
            <p className="question__bigView__text__content">{text}</p>
          </div>
          <div className="question__bigView__text">
            <p className="question__bigView__text__title">Ответы</p>
            <div className="question__bigView__text__wrapper"> 
              {answers.map((answer, idx) => {
                if(answer['n']){
                  return(<p type="wrong">{answer['n']}</p>)
                }else if(answer['y']){
                  return(<p type="correct">{answer['y']}</p>)
                }else{
                  return(<p>{answer}</p>)
                }
              })}  
            </div>
          </div>
        </div>
      </div>
    )
  }
}


// Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Question;