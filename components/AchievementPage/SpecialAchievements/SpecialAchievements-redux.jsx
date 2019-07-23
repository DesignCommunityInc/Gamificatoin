import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchSpecialAchievements } from '../../../actions/Achievements';
import { connect } from 'react-redux';
import SpecialAchievementsContainer from "./SpecialAchievements-container";

const specialAchievementsContainer = props => <SpecialAchievementsContainer {...props} />;

const mapStateToProps = ({ specialAchievements }) => ({
    data: specialAchievements.data,
    isLoading: specialAchievements.isLoading,
    error: specialAchievements.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSpecialAchievements,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(specialAchievementsContainer);