import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from './Settings-container';
import toggleSettingsScreen from '../../actions/Settings';
import {
  toggleLockSettings,
  toggleHelpersSettings,
  getUserSettigs,
  setUserNickName,
} from './Settings-actions';

const settingsContainer = props => <Settings {...props} />;

const mapStateToProps = ({ session, settings }) => ({
  visible: settings.visible,
  isProfileLocked: settings.isLocked,
  isHelpersEnabled: settings.isHelpersEnabled,
  userData: session.data,
  nickname: settings.nickName,
  counter: settings.nickNameLength,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSettingsScreen,
  toggleLockSettings,
  toggleHelpersSettings,
  setUserNickName,
  getUserSettigs,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(settingsContainer);
