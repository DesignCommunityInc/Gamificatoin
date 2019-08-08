import React from 'react';
import uid from 'uid';
import PropTypes from 'prop-types';
import AnswerTile from './Option';
import AnswerContainer from './Answer';
import TextAnswer from './TextAnswer';
import * as types from '../../../constants/QuestionTypes';

const propTypes = {
  id: PropTypes.string,
  answer: PropTypes.arrayOf(PropTypes.any),
  question: PropTypes.string,
  type: PropTypes.string,
  // difficulty: PropTypes.string.isRequired,
  // isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line camelcase
  question_image: PropTypes.string,
  endGame: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};
const defaultProps = {
  id: '',
  type: '',
  question: '',
  // eslint-disable-next-line camelcase
  question_image: '',
  answer: [],
};

class Question extends React.Component {
  constructor() {
    super();
    this.imageMoving = this.imageMoving.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
    this.hideQuestion = this.hideQuestion.bind(this);
    this.state = {
      showQuestion: true,
    };
  }

  componentDidMount() {
    this.imageMoving();
  }

  componentDidUpdate(previousProps) {
    const { id } = this.props;
    if (previousProps.id === id) return false;
    this.showQuestion();
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.movingTimer);
  }

  imageMoving() {
    if (!this.imageContainer) return;
    let direction = true;
    let translate = 0;
    const moving = () => {
      const limit = this.imageContainer.scrollHeight - this.imageContainer.clientHeight;
      if (limit <= 30) return;
      translate += direction ? 1 : -1;
      if (translate <= 0 || translate >= limit) {
        translate = translate > limit - translate ? limit : 0;
        direction = !direction;
      }
      this.imageContainer.scrollTop = translate;
    };
    this.movingTimer = setInterval(
      moving,
      10,
    );
  }

  showQuestion() {
    this.setState({ showQuestion: true });
  }

  hideQuestion() {
    this.setState({ showQuestion: false });
  }

  switchRender() {
    const {
      type,
      answer,
      id,
      handleAnswer,
    } = this.props;
    switch (type) {
      case types.SELECT_ONE: case types.SELECT_EACH:
        return (
          <>
            <div className="Question__list">
              {answer.map((awr, idx) => (
                <AnswerTile
                  key={uid()}
                  title={awr}
                  id={`${id}-${idx}`}
                  type={type}
                />
              ))}
            </div>
            <div className="Question__drag__container">
              <AnswerContainer
                type={type}
                handleAnswer={handleAnswer}
                hideQuestion={this.hideQuestion}
              />
            </div>
          </>
        );
      case types.SEQUENCE:
        return (
          <div className="Question__list">
            {answer.map((awr, idx) => (
              <AnswerTile
                key={uid()}
                title={awr}
                id={`${id}-${idx}`}
                type={type}
                titleList={answer}
              />
            ))}
          </div>
        );
      case types.MATCH: {
        const matches = typeof (answer[0]) === 'object' ? Object.values(answer[0]) : answer[0];
        const answers = typeof (answer[1]) === 'object' ? Object.values(answer[1]) : answer[1];
        return (
          <div className="Question__list Question__list--match">
            {answers.map((_, idx) => (
              <AnswerTile
                key={uid()}
                title={answers[idx]}
                subTitle={matches[idx]}
                id={`${id}-${idx}`}
                type={type}
                titleList={answers}
                answerList={answer}
              />
            ))}
          </div>
        );
      }
      default: return <div />;
    }
  }

  render() {
    const {
      answer: answers,
      question,
      question_image: image,
      endGame,
      type,
    } = this.props;
    const { showQuestion } = this.state;
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section className={endGame || !showQuestion ? 'Question Question--fadeout' : 'Question'}>
        <div className={question.length > 100 ? 'Question__container Question__container--large' : 'Question__container'}>
          <div
            className="Question__image__container"
            ref={(container) => {
              this.imageContainer = container;
            }}
          >
            <img
              src={image}
              alt=""
              className="Question__image"
              ref={(img) => {
                this.image = img;
              }}
            />
          </div>
          <div className="Question__count">
            <b>{`Вопрос № ${count} `}</b>
            {`из ${total}`}
          </div>
          <div className="Question__progress">
            <div className="Question__progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <div
            className="Question__title"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: question }}
          />
        </div>
        {answers && this.switchRender()}
        {!answers && (
          <TextAnswer
            type={type}
          />
        )}
      </section>
    );
  }
}


Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
