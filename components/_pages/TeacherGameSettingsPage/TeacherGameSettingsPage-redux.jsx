import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTeacherGamePreview } from '../../../actions/Games';
import TeacherGameSettingsPage from './TeacherGameSettingsPage-container';
import { toggleQuestionListVisibility } from './QuestionsEditor/QuestionEditor-actions';
import { toggleQuestionCreatorVisibility } from './QuestionsCreator/QuestionsCreator-actions';
import getInvites from './TeacherGameSettingsPage-actions';

const gameView = props => <TeacherGameSettingsPage {...props} />;

const mapStateToProps = ({ gamepreview, gameEditor }) => ({
  data: gamepreview.teacherData,
  users: gameEditor.users,
  questionListVisibility: gameEditor.questionListVisibility,
  questionCreatorVisibility: gameEditor.questionCreatorVisibility,
  isLoading: gamepreview.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTeacherGamePreview,
  toggleQuestionListVisibility,
  toggleQuestionCreatorVisibility,
  getInvites,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(gameView);
