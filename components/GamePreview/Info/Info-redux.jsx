import React from 'react';
// import { bindActionCreators } from 'redux';
// import { fetchAchievements } from '../../../actions/Achievements';
import { connect } from 'react-redux';
import Info from "./Info-container";

const infoContainer = props => <Info {...props} />;

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
)(infoContainer);