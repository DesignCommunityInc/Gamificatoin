import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import restore from '../../actions/global';
import { fetchUserProfile, fetchClassmates } from '../../actions/Session';
import Root from './Root-container';

const rootContainer = props => <Root {...props} />;

const mapDispatchToProps = dispatch => bindActionCreators({
  restore,
  fetchUserProfile,
  fetchClassmates,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(rootContainer);
