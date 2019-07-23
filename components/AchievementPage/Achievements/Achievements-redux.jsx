import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchAchievements } from '../../../actions/Achievements';
import { connect } from 'react-redux';
import AchievementsContainer from "./Achievements-container";

const achievementsContainer = props => <AchievementsContainer {...props} />;

const mapStateToProps = ({ achievements }) => ({
    achievements: achievements.data,
    isLoading: achievements.isLoading,
    error: achievements.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAchievements,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(achievementsContainer);