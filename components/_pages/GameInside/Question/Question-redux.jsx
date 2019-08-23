import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Question from './Question-container';

const questionContainer = props => <Question {...props} />;

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(questionContainer);
