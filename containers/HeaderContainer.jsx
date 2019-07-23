import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from "../components/Header";
import { fetchUserProfile } from '../actions/Session';
import { toggleSettingsScreen } from '../actions/Settings';

const headerContainer = props => <Header {...props} />;

const mapStateToProps = ({ session }) => ({
    data: session.data,
    isLoading: session.isLoading,
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSettingsScreen,
    fetchUserProfile,
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(headerContainer);