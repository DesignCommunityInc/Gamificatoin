import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Players from './Players-container';

const playersContainer = props => <Players {...props} />;

const mapStateToProps = ({ session }) => ({
  classmates: session.classmates,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(playersContainer);
