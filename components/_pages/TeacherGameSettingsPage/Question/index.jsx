import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '../../../Button';

const propTypes = {
  answer: PropTypes.arrayOf(PropTypes.any).isRequired,
};

class Question extends React.Component {
  constructor() {
    super();
    this.renderAnswer = this.renderAnswer.bind(this);
    this.viewQuestionText = this.viewQuestionText.bind(this);
  }

  viewQuestionText() {
    const { onClick, idx } = this.props;
    onClick(idx);
  }

  renderAnswer(answers) {
    if (Array.isArray(answers)) {
      answers.map(answer => this.renderAnswer(answer));
      return false;
    }
    const { n, y } = answers;
    if (n) {
      return <p key={uid()} type="wrong">{n}</p>;
    }
    if (y) {
      return <p key={uid()} type="correct">{y}</p>;
    }
    return <p key={uid()}>{answers}</p>;
  }

  render() {

    const {
      direction,
      question,
      counter,
      title,
      specUUD,
      type,
      image,
      isLoading,
      id,
      active,
      subject,
      answer,
    } = this.props;
    return (
      <div className={`question ${active}`}>
        <div className="question__left_side">
          <div className="question__counter">
            <p>{counter}</p>
          </div>
          <Button
            onClick={this.viewQuestionText}
            className="question__view__button--mobile"
          />
        </div>
        <div className="question__information">
          <div className="question__information__title">{`Вопрос №${id}`}</div>
          <div className="question__information__specs">
            <p className="spec__type">{type}</p>
            <p className="spec__uud">{direction[0]}</p>
          </div>
        </div>
        <div className="question__view__button__wrapper">
          <div
            onClick={this.viewQuestionText}
            className="question__view__button"
            role="button"
            tabIndex="0"
            onKeyDown={() => {}}
          >
            <span className="question__view__button__dot" />
            <span className="question__view__button__dot" />
            <span className="question__view__button__dot" />
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
              {answer && answer.map(a => this.renderAnswer(a))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Question.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Question;
