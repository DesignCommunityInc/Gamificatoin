import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGamePlay, chooseCategory, handleAnswer } from './GameInside-actions';
import GameInside from './GameInside-container';

const insideContainer = props => <GameInside {...props} />;

const mapStateToProps = ({ gameInside }) => ({
  game: gameInside.data,
  isLoading: gameInside.isLoading,
  currentCategory: gameInside.currentCategory,
  currentQuestion: gameInside.currentQuestion,
  totalQuestions: gameInside.totalQuestions,
  passList: gameInside.passList,
  animatedSubjects: gameInside.animatedSubjects,
  subjectsIsAnimated: gameInside.subjectsIsAnimated,
  endGame: gameInside.endGame,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGamePlay,
  chooseCategory,
  handleAnswer,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(insideContainer);
