import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import uid from 'uid';
import { Link } from 'react-router-dom';
import Achievements from './ReceivedAchievements';
import * as routes from '../../../../constants/Routes';

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
          questions_results: questions,
        } = {},
      } = {},
      isLoading,
    } = this.props;
    return (
      <>
        <div className="Game Game-fullscreen EndGame">
          <div className="EndGame__questions">
            {questions && questions.map(({ question, score, score_desc }) => (
              <div className="EndGame__questions__item" key={uid()}>
                {question && <div className="EndGame__questions__item--question" dangerouslySetInnerHTML={{ __html: question }} />}
                {score_desc && <div className="EndGame__questions__item--score-desc">{score_desc}</div>}
                {score && <div className="EndGame__questions__item--score">{`очки: ${score}`}</div>}
              </div>
            ))}
          </div>
          <div className="EndGame__view">
            <span className="EndGame__icon" />
            <h1>Поздравляем!</h1>
            <h3>Вы закончили игру!</h3>
            <p>Результаты всей игры будут доступны после проверки учителем</p>
            <div className={`EndGame__reward ${isLoading ? 'EndGame__reward--loading' : ''}`}>
              {experience ? <span>{`${experience} xp`}</span> : <span>xp</span>}
              {points && <span>{`${points} pt`}</span>}
            </div>
            <Link to={routes.ROOT} className="button button-main button">Перейти на главный экран</Link>
          </div>
        </div>
        {achievements && (
          <Achievements
            achievementList={achievements}
          />
        )}
      </>
    );
  }
}

EndGame.propTypes = propTypes;

export default EndGame;
