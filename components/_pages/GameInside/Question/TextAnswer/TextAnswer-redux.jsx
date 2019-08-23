import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextAnswer from './TextAnswer-container';

const textContainer = props => <TextAnswer {...props} />;

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(textContainer);
