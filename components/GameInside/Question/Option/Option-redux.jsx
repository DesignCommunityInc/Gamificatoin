import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  throwAnswer,
  setOptionfocused,
  setReplacePossibility,
  replaceOption,
} from './Option-actions';
import { removeAnswers } from '../Answer/Answer-actions';
import Option from './Option-container';

const optionContainer = props => <Option {...props} />;

const mapStateToProps = ({ answers, gameInside }) => ({
  passedAnswers: answers.passedAnswers,
  isItPossibleToAnswer: answers.isItPossibleToAnswer,
  isItPossibleToReplace: answers.isItPossibleToReplace,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  throwAnswer,
  setOptionfocused,
  removeAnswers,
  setReplacePossibility,
  replaceOption,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(optionContainer);
