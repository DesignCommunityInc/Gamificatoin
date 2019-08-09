import React from 'react';
import PropTypes from 'prop-types';
import * as types from '../../../../constants/QuestionTypes';

const propTypes = {
  handleAnswer: PropTypes.func.isRequired,
};

class TextAnswer extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
  }

  handleInput() {
    this.alert = 0;
  }

  render() {
    const { handleAnswer } = this.props;
    return (
      <div className="Question__answer-text__container">
        <textarea
          className="Question__answer-text"
          onInput={this.handleInput}
          ref={(ref) => {
            this.textarea = ref;
          }}
          name=""
          id=""
          placeholder="Напишите ответ сюда"
        />
        <span
          onClick={() => handleAnswer(this.textarea.value)}
          role="button"
          onKeyDown={() => {}}
          tabIndex="0"
          className="button button-action"
        >
          Ответить
        </span>
      </div>
    );
  }
}

TextAnswer.propTypes = propTypes;

export default TextAnswer;
