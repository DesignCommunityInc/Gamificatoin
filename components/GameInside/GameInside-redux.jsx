import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchGamePlay, chooseCategory } from '../../actions/Games';
import { connect } from 'react-redux';
import GameInside from "./GameInside-container";

const insideContainer = props => <GameInside {...props} />;

const mapStateToProps = ({ gameInside }) => ({
    data: gameInside.data,
    isLoading: gameInside.isLoading,
    choosenCategory: gameInside.choosenCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGamePlay,
  chooseCategory,
  // gameUnmount,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(insideContainer);