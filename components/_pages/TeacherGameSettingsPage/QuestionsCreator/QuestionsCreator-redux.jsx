import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuestionsCreator from './QuestionsCreator-container';
import { saveQuestion, toggleQuestionCreatorVisibility } from './QuestionsCreator-actions';

const questionCreatorContainer = props => <QuestionsCreator {...props} />;

const mapStateToProps = ({ gameEditor }) => ({
  filterList: gameEditor.filterList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  saveQuestion,
  toggleQuestionCreatorVisibility,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(questionCreatorContainer);
