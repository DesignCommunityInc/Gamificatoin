import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendGameResults } from '../GameInside-actions';
import EndGame from './EndGame-container';

const endGameContainer = props => <EndGame {...props} />;

const mapStateToProps = ({ gameInside }) => ({
  data: gameInside.endGameData,
  isLoading: gameInside.isEndGameDataLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendGameResults,
  // clearGameSession,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(endGameContainer);
