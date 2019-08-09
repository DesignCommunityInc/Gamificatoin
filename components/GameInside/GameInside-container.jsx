import React from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import Question from './Question';
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
  sendGameAnswers: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const defaultProps = {
  currentQuestion: null,
  currentCategory: null,
};

class GameInside extends React.Component {
  constructor() {
    super();
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    const { fetchGamePlay } = this.props;
    fetchGamePlay(1);
    ParticleSpawner(this.spawner, 15, 2, 10);
  }

  handleAnswer(currentAnswer) {
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
      sendGameAnswers,
      match: { params: { id } },
    } = this.props;
    return !endGame ? (
      <main className="page">
        <div
          className="particle-spawner particle-spawner--from-page-start"
          ref={(ref) => {
            this.spawner = ref;
          }}
        />
        <div className="background" />
        {!isLoading && (
          <div>
            {!currentCategory && (
              <Categories
                subjects={subjects}
                isAnimated={subjectsIsAnimated}
                animatedSubjectsCount={animatedSubjects}
                questions={questions}
              />
            )}
            {currentCategory && (
              <Question
                ref={(ref) => {
                  this.question = ref;
                }}
                {...currentQuestion}
                endGame={endGame}
                handleAnswer={this.handleAnswer}
              />
            )}
          </div>
        )}
      </main>
    ) : (
      <div>
        {console.log(globalAnswerList)}
        {sendGameAnswers(id, globalAnswerList)}
      </div>
    );
  }
}


GameInside.propTypes = propTypes;
GameInside.defaultProps = defaultProps;

export default GameInside;
