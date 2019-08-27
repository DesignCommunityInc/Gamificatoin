import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserGamesShort } from '../../../actions/Games';
import { fetchUserProfile, fetchAchievementsShort } from '../../../actions/Session';
import Userpage from './Userpage-container';

const userPageContainer = props => <Userpage {...props} />;

const mapStateToProps = ({ gamelist, session }) => ({
  userData: session.data,
  isUserLoading: session.isLoading,
  classmates: session.classmatesShort,
  isClassmatesLoading: session.isClassmatesShortLoading,
  games: gamelist.shortData,
  IsGamesLoading: gamelist.isShortDataLoading,
  gamesError: gamelist.error,
  achievements: session.shortAchievements,
  isAchievementsLoading: session.isShortAchievementsLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserGamesShort,
  fetchUserProfile,
  fetchAchievementsShort,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userPageContainer);
