import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserContainer from './UserContainer-container';

const userContainer = props => <UserContainer {...props} />;

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userContainer);
