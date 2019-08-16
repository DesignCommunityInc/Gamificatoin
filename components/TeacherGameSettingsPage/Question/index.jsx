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
    this.props.onClick(this.props.idx);
    // this.setState({ active: !currentState });
  }


  render() {
    // title={`Вопрос №${question.id}`}

    // specUUD={question.direction[0]}

    const { direction, question, counter, title, specUUD, type, image, isLoading, id , active, subject, answer = [] } = this.props;
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
          <div className="question__information__title">{`Вопрос №${id}`}</div>
          <div className="question__information__specs">
            <p className="spec__type">{type}</p>
            <p className="spec__uud">{direction[0]}</p>
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
            <p className="question__bigView__text__content">{question}</p>
          </div>
          <div className="question__bigView__text">
            <p className="question__bigView__text__title">Ответы</p>
            <div className="question__bigView__text__wrapper"> 
              {answer.map((answerA, idx) => (
                // if(answerA['n']){
                //   <p type="wrong">{answerA['n']}</p>
                // }else if(answerA['y']){
                //   <p type="correct">{answerA['y']}</p>
                // }else{
                //   <p>{answerA}</p>
                // }
                <>
                  {answerA['n'] ? (
                      <p type="wrong">{answerA['n']}</p>
                    ) : answerA['y'] ? (
                      <p type="correct">{answerA['y']}</p>
                    ) : (
                      <p>{answerA}</p>
                    )
                  } 
                </>
              ))}  
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