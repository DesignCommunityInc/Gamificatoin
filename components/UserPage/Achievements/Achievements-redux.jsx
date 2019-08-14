import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAchievementsShort } from '../../../actions/Achievements';
import AchievementContainer from './Achievement-container';

const achievementsContainer = props => <AchievementContainer {...props} />;

const mapStateToProps = ({ achievements }) => ({
  achievements: achievements.shortAchievements,
  isLoading: achievements.isShortAchievementsLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAchievementsShort,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(achievementsContainer);
