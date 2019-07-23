import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchAchievementsShort } from '../../../actions/Achievements';
import { connect } from 'react-redux';
import AchievementContainer from "./Achievement-container";

const achievementsContainer = props => <AchievementContainer {...props} />;

const mapStateToProps = ({ achievements }) => ({
    achievements: achievements.shortData.data,
    count: achievements.shortData.count,
    isLoading: achievements.isLoading,
    error: achievements.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAchievementsShort,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(achievementsContainer);