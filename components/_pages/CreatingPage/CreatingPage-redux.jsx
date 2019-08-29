import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreatingPage from './CreatingPage-container';
import { fetchOnlineUsers } from './CreatingPage-action';

const creatingPage = props => <CreatingPage {...props} />;

const mapStateToProps = ({ session, gameEditor }) => ({
  userData: session.data,
  filterList: gameEditor.filterList,
  onlineUsers: session.onlineUsers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOnlineUsers,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(creatingPage);
