import React from 'react';
// import { bindActionCreators } from 'redux';
// import { fetchAchievements } from '../../../actions/Achievements';
import { connect } from 'react-redux';
import Players from "./Players-container";

const playersContainer = props => <Players {...props} />;

// const mapStateToProps = ({ achievements }) => ({
//     achievements: achievements.data,
//     isLoading: achievements.isLoading,
//     error: achievements.error,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchAchievements,
// }, dispatch);

export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(playersContainer);