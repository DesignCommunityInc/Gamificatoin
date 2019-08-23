import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import createGame, { generateGame } from './CreatingPage-action';
import CreatingPage from './CreatingPage-container';

const creatingPage = props => <CreatingPage {...props} />;

const mapStateToProps = ({ gamelist, session }) => ({
  data: gamelist.data,
  userData: session.data,
  isLoading: gamelist.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createGame,
  generateGame,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(creatingPage);
