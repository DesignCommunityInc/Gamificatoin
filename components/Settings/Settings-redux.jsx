import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from "./Settings-container";
import { 
  toggleSettingsScreen, 
  toggleLockSettings, 
  toggleHelpersSettings,
 } from "../../actions/Settings";

const settingsContainer = props => <Settings {...props} />;

const mapStateToProps = ({ session, settings }) => ({
    visible: settings.visible,
    isLocked: settings.isLocked,
    isHelpersEnabled: settings.isHelpersEnabled,
    counter: settings.counter,
    userData: session.data,
})
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSettingsScreen,
    toggleLockSettings,
    toggleHelpersSettings,
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(settingsContainer);