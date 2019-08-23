import React from 'react';
import PropTypes from 'prop-types';
import AnswerButton from '../AnswerButton';
import * as types from '../../../../../constants/QuestionTypes';

const propTypes = {
  type: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  hideQuestion: PropTypes.func.isRequired,
};

class TextAnswer extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.invalidate = this.invalidate.bind(this);
  }

  componentDidMount() {
  }

  handleInput() {
    this.alert = 0;
  }

  invalidate() {
    if (this.textarea) this.textarea.value = '';
  }

  render() {
    const { handleAnswer, hideQuestion, type } = this.props;
    return (
      <div className="Question__answer-text__container">
        {type === types.DWORD ? (
          <textarea
            placeholder="Напишите ответ сюда"
            className="Question__answer-text Question__answer-text--sizable"
            onInput={this.handleInput}
            ref={(ref) => {
              this.textarea = ref;
            }}
          />
        ) : (
          <input
            placeholder="Напишите ответ сюда"
            className="Question__answer-text"
            onInput={this.handleInput}
            ref={(ref) => {
              this.textarea = ref;
            }}
          />
        )}
        <AnswerButton
          onClick={() => {
            handleAnswer(this.textarea.value, this.invalidate);
            hideQuestion();
          }}
        />
      </div>
    );
  }
}

TextAnswer.propTypes = propTypes;

export default TextAnswer;
