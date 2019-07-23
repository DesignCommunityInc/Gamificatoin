import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchGameList } from '../../actions/Games';
import { connect } from 'react-redux';
import CreatingPage from "./CreatingPage-container";

const gamesContainer = props => <CreatingPage {...props} />;

// const mapStateToProps = ({ gamelist }) => ({
//   isLoading: gamelist.isDataLoading,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchGameList,
// }, dispatch);

export default connect (
  // mapStateToProps,
  // mapDispatchToProps,
)(gamesContainer);