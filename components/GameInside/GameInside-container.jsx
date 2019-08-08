import React from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import Question from './Question';
import ParticleSpawner from '../../utils/Particles';
import background from '../../styles/assets/bg_video.mp4';

const propTypes = {
  game: PropTypes.shape({}).isRequired,
  animatedSubjects: PropTypes.number.isRequired,
  passList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentQuestion: PropTypes.shape({}),
  currentCategory: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  subjectsIsAnimated: PropTypes.bool.isRequired,
  endGame: PropTypes.bool.isRequired,
  fetchGamePlay: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired,
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

  handleAnswer() {
    const {
      sendAnswer,
      game: {
        questions,
        subjects,
        answer,
      } = {},
      currentQuestion,
      currentCategory,
      passList,
    } = this.props;
    sendAnswer({
      answer,
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
    } = this.props;
    return !endGame ? (
      <main className="page">
        <div
          className="particle-spawner particle-spawner--from-page-start"
          ref={(ref) => {
            this.spawner = ref;
          }}
        />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          autoPlay
          loop
          className="background"
        >
          <source src={background} type="video/mp4" />
        </video>
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
      <div />
    );
  }
}


GameInside.propTypes = propTypes;
GameInside.defaultProps = defaultProps;

export default GameInside;
