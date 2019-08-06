import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LastGame from './LastGame-container';
import toggleSettingsScreen from '../../actions/LastGame';
import { toggleLockSettings, toggleHelpersSettings } from './LastGame-actions';

const settingsContainer = props => <LastGame {...props} />;

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
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(settingsContainer);
