import React from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import Question from './Question/Question-container';
import EndGame from './EndGame';
import Timer from '../Timer';
import ParticleSpawner from '../../utils/Particles';

const propTypes = {
  game: PropTypes.shape({}).isRequired,
  animatedSubjects: PropTypes.number.isRequired,
  passList: PropTypes.arrayOf(PropTypes.string).isRequired,
  globalAnswerList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentQuestion: PropTypes.shape({
    id: PropTypes.string,
  }),
  currentCategory: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  subjectsIsAnimated: PropTypes.bool.isRequired,
  endGame: PropTypes.bool.isRequired,
  fetchGamePlay: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  totalQuestions: PropTypes.number,
};

const defaultProps = {
  currentQuestion: null,
  currentCategory: null,
  totalQuestions: 0,
};

class GameInside extends React.Component {
  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    const {
      fetchGamePlay,
      match: {
        params: { id },
      },
    } = this.props;
    // window.addEventListener('beforeunload', this.beforeUnload);
    fetchGamePlay(id);
    ParticleSpawner(this.spawner, 15, 2, 10);
  }

  componentDidUpdate() {
    localStorage.setItem('game', JSON.stringify(this.props));
  }

  // eslint-disable-next-line class-methods-use-this
  // beforeUnload(e) {
  //   e.preventDefault();
  //   // e.returnValue = '';
  // }

  handleAnswer(currentAnswer, callback = () => {}) {
    const {
      sendAnswer,
      game: {
        questions,
        subjects,
      } = {},
      currentQuestion,
      currentCategory,
      passList,
    } = this.props;
    setTimeout(() => {
      sendAnswer({
        answer: {
          id: currentQuestion.id,
          answer: currentAnswer,
        },
        questions,
        subjects,
        currentQuestion,
        currentCategory,
        passList,
      });
      callback();
    }, 1000);
  }

  render() {
    const {
      game: {
        questions,
        subjects,
      } = {},
      animatedSubjects,
      subjectsIsAnimated,
      isLoading,
      endGame,
      currentCategory,
      currentQuestion,
      globalAnswerList,
      match: { params: { id } },
    } = this.props;
    console.log(this.props);
    return (
      <main className="page">
        <div
          className="particle-spawner particle-spawner--from-page-start"
          ref={(ref) => {
            this.spawner = ref;
          }}
        />
        <div className="background" />
        {(!isLoading && !endGame) && (
          <>
            <Timer />
            {!currentCategory && (
              <Categories
                subjects={subjects}
                isAnimated={subjectsIsAnimated}
                animatedSubjectsCount={animatedSubjects}
                questions={questions}
              />
            )}
            {currentQuestion && (
              <Question
                ref={(ref) => {
                  this.question = ref;
                }}
                {...currentQuestion}
                endGame={endGame}
                handleAnswer={this.handleAnswer}
                startTimer={this.startTimer}
              />
            )}
          </>
        )}
        {endGame && (
          <EndGame
            id={id}
            answerList={globalAnswerList}
            beforeUnload={this.beforeUnload}
          />
        )}
      </main>
    );
  }
}

GameInside.propTypes = propTypes;
GameInside.defaultProps = defaultProps;

export default GameInside;
