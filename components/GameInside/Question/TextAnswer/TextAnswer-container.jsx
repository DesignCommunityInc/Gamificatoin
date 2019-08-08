import React from 'react';
import PropTypes from 'prop-types';
import GME from '../../../../utils/GamingMouseEvents';
import * as types from '../../../../constants/QuestionTypes';

const propTypes = {
};

class TextAnswer extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
  }

  handleInput() {

  }

  render() {
    return (
      <div className="Question__answer-text__container">
        <textarea
          className="Question__answer-text"
          onInput={this.handleInput}
          name=""
          id=""
          cols="30"
          rows="10"
        />
      </div>
    );
  }
}

TextAnswer.propTypes = propTypes;

export default TextAnswer;
