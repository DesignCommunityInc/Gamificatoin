import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchAchievements, {
  sortChooser,
  filterToggler,
  clearAchievements,
  toggleSortDirection,
} from './Achievements-actions';
import AchievementsContainer from './Achievements-container';

const achievementsContainer = props => <AchievementsContainer {...props} />;

const mapStateToProps = ({ achievements }) => ({
  achievements: achievements.achievements,
  isLoading: achievements.isLoading,
  filter: achievements.filter,
  sort: achievements.sort,
  page: achievements.page,
  desc: achievements.desc,
  error: achievements.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAchievements,
  sortChooser,
  filterToggler,
  clearAchievements,
  toggleSortDirection,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(achievementsContainer);
