import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTeacherGames } from '../../../actions/Games';
import TeacherGamePage from './TeacherGamePage-container';

const gameView = props => <TeacherGamePage {...props} />;

const mapStateToProps = ({ gamelist }) => ({
  data: gamelist.data,
  isLoading: gamelist.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTeacherGames,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(gameView);
