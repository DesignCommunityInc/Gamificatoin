import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGameList } from '../../actions/Games';
import GamePage from './GamePage-container';

const gamesContainer = props => <GamePage {...props} />;

const mapStateToProps = ({ gamelist }) => ({
  data: gamelist.data,
  isLoading: gamelist.isDataLoading,
  error: gamelist.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGameList,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(gamesContainer);
