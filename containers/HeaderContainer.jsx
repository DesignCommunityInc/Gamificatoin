import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from "../components/Header";
import { toggleSettingsScreen } from '../actions/Settings';
import { logout } from '../utils/API';

const headerContainer = props => <Header {...props} />;

const mapStateToProps = ({ session }) => ({
    data: session.data,
    isLoading: session.isLoading,
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSettingsScreen,
    logout,
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(headerContainer);