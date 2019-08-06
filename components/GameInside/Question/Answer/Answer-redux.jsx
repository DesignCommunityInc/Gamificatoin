import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeAnswers, setAnswerPossibility } from './Answer-actions';
import Answer from './Answer-container';

const answerContainer = props => <Answer {...props} />;

const mapStateToProps = ({ answers }) => ({
  passedAnswers: answers.passedAnswers,
  isAnyOptionFocused: answers.isOptionFocused,
  isItPossibleToAnswer: answers.isItPossibleToAnswer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeAnswers,
  setAnswerPossibility,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(answerContainer);
