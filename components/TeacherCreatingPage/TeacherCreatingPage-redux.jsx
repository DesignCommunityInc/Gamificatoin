import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TeacherCreatingPage from "./TeacherCreatingPage-container";

const gameView = props => <TeacherCreatingPage {...props} />;

const mapStateToProps = ({ gamelist }) => ({
  data: gamelist.data,
  isLoading: gamelist.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // fetchTeacherGames,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(gameView);