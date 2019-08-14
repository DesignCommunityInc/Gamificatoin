import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserGamesShort, fetchTeacherGamesShort } from '../../actions/Games';
import { fetchUserProfile } from '../../actions/Session';
import Userpage from './Userpage-container';

const userPageContainer = props => <Userpage {...props} />;

const mapStateToProps = ({ gamelist, session }) => ({
  games: gamelist.shortData,
  IsGamesLoading: gamelist.isShortDataLoading,
  gamesError: gamelist.error,
  userData: session.data,
  isUserLoading: session.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserGamesShort,
  fetchTeacherGamesShort,
  fetchUserProfile,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userPageContainer);
