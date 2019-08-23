import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endTheGame } from '../_pages/GameInside/GameInside-actions';
import setTimer from './Timer-actions';
import Timer from './Timer-container';

const timerContainer = props => <Timer {...props} />;

const mapStateToProps = ({ timer, gameInside }) => ({
  timer: timer.timer,
  game: gameInside.data,
  endGame: gameInside.endGame,
  currentQuestion: gameInside.currentQuestion,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setTimer,
  endTheGame,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(timerContainer);
