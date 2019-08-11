import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LastGame from './LastGame-container';
import fetchLastGame from './LastGame-actions';

const lastGameContainer = props => <LastGame {...props} />;

const mapStateToProps = ({ lastGame }) => ({
  data: lastGame.data,
  isLoading: lastGame.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchLastGame,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lastGameContainer);
