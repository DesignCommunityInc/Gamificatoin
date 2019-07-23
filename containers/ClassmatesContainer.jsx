import React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Classmates from "../components/Classmates";
// import { fetchUserProfile } from '../actions/userProfile';

const gamesContainer = props => <Classmates {...props} />;

const mapStateToProps = state => ({
    request: state.userClass.request,
    isLoading: state.userClass.isLoading,
    error: state.userClass.error,
  })
  
  // const mapDispatchToProps = dispatch => bindActionCreators({
  // }, dispatch)
  
export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(gamesContainer);