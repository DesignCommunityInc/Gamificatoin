import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from './Settings-container';
import toggleSettingsScreen from '../../actions/Settings';
import {
  toggleLockSettings,
  toggleHelpersSettings,
  saveUserSettigs,
  getUserSettigs,
} from './Settings-actions';

const settingsContainer = props => <Settings {...props} />;

const mapStateToProps = ({ session, settings }) => ({
  visible: settings.visible,
  isProfileLocked: settings.isLocked,
  isHelpersEnabled: settings.isHelpersEnabled,
  counter: settings.counter,
  userData: session.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSettingsScreen,
  toggleLockSettings,
  toggleHelpersSettings,
  saveUserSettigs,
  getUserSettigs,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(settingsContainer);
