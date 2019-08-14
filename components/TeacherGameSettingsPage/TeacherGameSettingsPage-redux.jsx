import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchTeacherGamePreview } from '../../actions/Games';
import { connect } from 'react-redux';
import TeacherGameSettingsPage from "./TeacherGameSettingsPage-container";

const gameView = props => <TeacherGameSettingsPage {...props} />;

const mapStateToProps = ({ gamepreview }) => ({
  data: gamepreview.data,
  isLoading: gamepreview.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTeacherGamePreview,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(gameView);