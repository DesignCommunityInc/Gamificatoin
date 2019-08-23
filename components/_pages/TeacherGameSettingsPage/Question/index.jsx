import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor() {
    super();
    this.renderAnswer = this.renderAnswer.bind(this);
    this.viewQuestionText = this.viewQuestionText.bind(this);
  }

  viewQuestionText(id) {
    this.props.onClick(this.props.idx);
  }

  renderAnswer(answerA){
    if( typeof (answerA) == "Array" ){
      answerA.map((answerV) => (
        this.renderAnswer(answerV)
      ))
    }
    return (
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
    )
  }

  render() {

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
          <div onClick={this.viewQuestionText} className="question__view__button">
            <span className="question__view__button__dot"></span>
            <span className="question__view__button__dot"></span>
            <span className="question__view__button__dot"></span>
          </div>
        </div>
        <div className="question__bigView">
          <div className="question__bigView__title">
            <p>{`Вопрос №${id}`}</p>
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
              {/* {answer && answer.map((answerA, idx) => (
                this.renderAnswer(answerA)
              ))}   */}
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