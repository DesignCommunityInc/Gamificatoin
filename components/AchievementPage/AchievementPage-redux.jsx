import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMainAchievements } from '../../actions/Achievements';
import { fetchUserProfile } from '../../actions/Session';
import AchievementPage from './AchievementPage-container';

const achievementPage = props => <AchievementPage {...props} />;

const mapStateToProps = ({ achievements }) => ({
  mainAchievements: achievements.mainAchievements,
  isMainAchievementsLoading: achievements.isMainAchievementsLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserProfile,
  fetchMainAchievements,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(achievementPage);
