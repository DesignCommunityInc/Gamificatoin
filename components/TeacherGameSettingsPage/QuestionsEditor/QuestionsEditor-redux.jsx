import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuestionEditor from './QuestionsEditor-container';
import {
  fetchQuestionList,
  fetchFilterList,
  addQuestionToList,
  removeQuestionFromList,
  filterAction,
  saveQuestions,
  toggleQuestionListVisibility,
} from './QuestionEditor-actions';

const questionEditorContainer = props => <QuestionEditor {...props} />;

const mapStateToProps = ({ gameEditor }) => ({
  data: gameEditor.questionList,
  isLoading: gameEditor.isQuestionListLoading,
  selectedQuestions: gameEditor.selectedQuestions,
  currentPage: gameEditor.currentPage,
  filterList: gameEditor.filterList,
  filter: gameEditor.filter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchQuestionList,
  fetchFilterList,
  addQuestionToList,
  removeQuestionFromList,
  filterAction,
  saveQuestions,
  toggleQuestionListVisibility,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(questionEditorContainer);
