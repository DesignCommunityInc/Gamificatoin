import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchGameList } from '../../actions/Games';
import { connect } from 'react-redux';
import GamePage from "./GamePage-container";

const gamesContainer = props => <GamePage {...props} />;

const mapStateToProps = ({ gamelist }) => ({
  data: gamelist.data,
  isLoading: gamelist.isDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGameList,
}, dispatch);

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(gamesContainer);