import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserViewPage from './UserViewPage-container';

const userViewPageContainer = props => <UserViewPage {...props} />;

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(userViewPageContainer);
