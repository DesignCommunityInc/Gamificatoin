import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from '../../../constants/Routes';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  // isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  answerList: PropTypes.arrayOf(PropTypes.any).isRequired,
  sendGameResults: PropTypes.func.isRequired,
  beforeUnload: PropTypes.func.isRequired,
  // clearGameSession: PropTypes.func.isRequired,
};

class EndGame extends React.Component {
  componentDidMount() {
    const {
      sendGameResults,
      id,
      answerList,
      beforeUnload,
    } = this.props;
    window.removeEventListener('beforeunload', beforeUnload);
    // console.log(id, answerList);
    sendGameResults(id, answerList);
  }

  render() {
    const {
      data: {
        received_achievements: achievements,
        result: {
          experience_added: experience,
          points_added: points,
        } = {},
      } = {},
      // isLoading,
    } = this.props;
    // console.log(this.props);
    return (
      <div className="Game Game-fullscreen EndGame">
        <div className="EndGame__view">
          <span className="EndGame__icon" />
          <h1>Поздравляем!</h1>
          <h3>Вы закончили игру!</h3>
          <p>Результаты этой игры будут доступны позднее</p>
          <div className="EndGame__reward">
            <span>{`${experience} xp`}</span>
            {points && <span>{`${points} pt`}</span>}
          </div>
          <Link to={routes.ROOT} className="button button-main button-iconless">Перейти на главный экран</Link>
        </div>
      </div>
    );
  }
}

EndGame.propTypes = propTypes;

export default EndGame;
