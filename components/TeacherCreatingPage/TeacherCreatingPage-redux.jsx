import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TeacherCreatingPage from "./TeacherCreatingPage-container";
import { createGame } from './TeacherCreatingPage-action';

const gameView = props => <TeacherCreatingPage {...props} />;

const mapStateToProps = ({ gamelist }) => ({
  data: gamelist.data,
  isLoading: gamelist.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createGame,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(gameView);