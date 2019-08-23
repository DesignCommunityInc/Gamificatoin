import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserViewPage from './UserViewPage-container';
import { fetchUserView, fetchUserAchievements } from './UserViewPage-actions';

const userViewPageContainer = props => <UserViewPage {...props} />;

const mapStateToProps = ({ userView }) => ({
  data: userView.data,
  isLoading: userView.isLoading,
  achievements: userView.achievements,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserView,
  fetchUserAchievements,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userViewPageContainer);
