import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTeacherGamesShort } from '../../actions/Games';
import { fetchUserProfile } from '../../actions/Session';
import TeacherPage from './TeacherPage-container';

const teacherPageContainer = props => <TeacherPage {...props} />;

const mapStateToProps = ({ gamelist, session }) => ({
  games: gamelist.shortData,
  IsGamesLoading: gamelist.isShortDataLoading,
  userData: session.data,
  isUserLoading: session.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTeacherGamesShort,
  fetchUserProfile,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(teacherPageContainer);
