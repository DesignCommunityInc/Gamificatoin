import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import restore from '../../actions/global';
import Root from './Root-container';

const rootContainer = props => <Root {...props} />;

const mapDispatchToProps = dispatch => bindActionCreators({
  restore,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(rootContainer);
