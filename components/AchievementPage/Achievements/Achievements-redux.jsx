import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchAchievements, { sortChooser, filterToggler } from './Achievements-actions';
import AchievementsContainer from './Achievements-container';

const achievementsContainer = props => <AchievementsContainer {...props} />;

const mapStateToProps = ({ achievements }) => ({
  achievements: achievements.achievements,
  isLoading: achievements.isLoading,
  filter: achievements.filter,
  sort: achievements.sort,
  page: achievements.page,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAchievements,
  sortChooser,
  filterToggler,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(achievementsContainer);
