import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  passedAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  isAnyOptionFocused: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  hideQuestion: PropTypes.func.isRequired,
  removeAnswers: PropTypes.func.isRequired,
  setAnswerPossibility: PropTypes.func.isRequired,
  isItPossibleToAnswer: PropTypes.bool.isRequired,
};

class Answer extends React.Component {
  constructor() {
    super();
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.initialTitle = 'Положите ответ сюда';
  }

  handleAnswerClick(e) {
    const { handleAnswer, hideQuestion, passedAnswers } = this.props;
    if (passedAnswers.length === 0) return;
    e.preventDefault();
    hideQuestion();
    setTimeout(() => {
      handleAnswer();
      this.handleCancel(e);
    }, 1000);
  }

  handleCancel(e) {
    e.preventDefault();
    const { passedAnswers, removeAnswers } = this.props;
    for (let i = passedAnswers.length - 1; i >= 0; i -= 1) {
      removeAnswers();
    }
  }

  handleMouseEnter() {
    const { setAnswerPossibility } = this.props;
    setAnswerPossibility(true);
  }

  handleMouseLeave() {
    const { setAnswerPossibility } = this.props;
    setAnswerPossibility(false);
  }

  handleRenderAnswer() {
    const { passedAnswers } = this.props;
    let answer = passedAnswers.length === 0 ? this.initialTitle : passedAnswers[0].title;
    for (let i = 1, len = passedAnswers.length; i < len; i += 1) {
      answer = `${answer}, ${passedAnswers[i].title}`;
    }
    return answer;
  }

  render() {
    const {
      isItPossibleToAnswer,
      isAnyOptionFocused,
      passedAnswers: {
        length: passedLength,
      } = {},
    } = this.props;
    return (
      <div
        className={`Question__drag ${isItPossibleToAnswer && isAnyOptionFocused ? 'Question__drag--passing-answer' : ''} ${passedLength > 0 ? 'Question__drag--answered' : ''}`}
        role="button"
        tabIndex="0"
        data-attr={this.handleRenderAnswer()}
        onClick={this.handleAnswerClick}
        onKeyDown={() => {}}
        onContextMenu={this.handleCancel}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={(ref) => {
          this.answerContainer = ref;
        }}
      />
    );
  }
}

Answer.propTypes = propTypes;

export default Answer;
