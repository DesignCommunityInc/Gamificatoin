import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Achievements from './ReceivedAchievements';
import * as routes from '../../../constants/Routes';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  answerList: PropTypes.arrayOf(PropTypes.any).isRequired,
  sendGameResults: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
};

class EndGame extends React.Component {
  componentDidMount() {
    const {
      sendGameResults,
      id,
      answerList,
      setTimer,
    } = this.props;
    sendGameResults(id, answerList);
    setTimer(null);
  }

  render() {
    const {
      data: {
        received_achievement: achievements,
        result: {
          experience_added: experience,
          points_added: points,
        } = {},
      } = {},
      isLoading,
    } = this.props;
    return (
      <>
        <div className="Game Game-fullscreen EndGame">
          <div className="EndGame__view">
            <span className="EndGame__icon" />
            <h1>Поздравляем!</h1>
            <h3>Вы закончили игру!</h3>
            <p>Результаты этой игры будут доступны позднее</p>
            <div className={`EndGame__reward ${isLoading ? 'EndGame__reward--loading' : ''}`}>
              {experience ? <span>{`${experience} xp`}</span> : <span>xp</span>}
              {points && <span>{`${points} pt`}</span>}
            </div>
            <Link to={routes.ROOT} className="button button-main button-iconless">Перейти на главный экран</Link>
          </div>
        </div>
        {/* {achievements && (
          <Achievements
            achievementList={achievements}
          />
        )} */}
      </>
    );
  }
}

EndGame.propTypes = propTypes;

export default EndGame;
