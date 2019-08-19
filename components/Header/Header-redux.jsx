import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toggleSettingsScreen from '../../actions/Settings';
import { fetchUserProfile } from '../../actions/Session';
import { logout } from '../../utils/API';
import Header from './Header-container';

const headerContainer = props => <Header {...props} />;

const mapStateToProps = ({ session }) => ({
  data: session.data,
  isLoading: session.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSettingsScreen,
  fetchUserProfile,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(headerContainer);