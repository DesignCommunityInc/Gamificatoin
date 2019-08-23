import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTeacherGamePreview } from '../../../actions/Games';
import TeacherGameSettingsPage from './TeacherGameSettingsPage-container';
import { toggleQuestionListVisibility } from './QuestionsEditor/QuestionEditor-actions';

const gameView = props => <TeacherGameSettingsPage {...props} />;

const mapStateToProps = ({ gamepreview, gameEditor }) => ({
  data: gamepreview.teacherData,
  questionListVisibility: gameEditor.questionListVisibility,
  isLoading: gamepreview.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTeacherGamePreview,
  toggleQuestionListVisibility,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(gameView);
