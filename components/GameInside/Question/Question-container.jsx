import React from 'react';
import uid from 'uid';
import PropTypes from 'prop-types';
import AnswerTile from './Option';
import AnswerContainer from './Answer';
import TextAnswer from './TextAnswer';
import GME from '../../../utils/GamingMouseEvents';
import Utils from '../../../utils/Utils';
import * as types from '../../../constants/QuestionTypes';
import AnswerButton from './AnswerButton';

const propTypes = {
  id: PropTypes.string,
  answer: PropTypes.arrayOf(PropTypes.any),
  question: PropTypes.string,
  type: PropTypes.string,
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
    this.imageMouseMove = this.imageMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
    this.hideQuestion = this.hideQuestion.bind(this);
    this.state = {
      showQuestion: true,
      showImage: false,
    };
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
    const { showImage } = this.state;
    if (!this.imageContainer || !showImage) return;
    let direction = true;
    let translate = this.imageContainer.scrollTop;
    const moving = () => {
      const limit = this.imageContainer.scrollHeight - this.imageContainer.clientHeight;
      if (limit <= 50) return;
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

  imageMouseMove(e) {
    if (!this.imageContainer) return;
    const boundings = GME.getBoundingClientXY(e, this.imageContainer);
    const eps = 50;
    const scroll = Utils.mapRange(
      boundings.y,
      eps, this.imageContainer.clientHeight,
      0, this.imageContainer.scrollHeight - this.imageContainer.clientHeight + eps,
    );
    this.imageContainer.scrollTop = scroll;
  }

  handleMouseEnter() {
    clearInterval(this.movingTimer);
  }

  handleMouseLeave() {
    this.imageMoving();
  }

  showQuestion() {
    this.setState({ showQuestion: true });
  }

  hideQuestion() {
    clearInterval(this.movingTimer);
    this.setState({
      showQuestion: false,
      showImage: false,
    });
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
          <div className="Question__list  Question__list--swap">
            {answer.map((awr, idx) => (
              <AnswerTile
                key={uid()}
                title={awr}
                id={`${id}-${idx}`}
                type={type}
                titleList={answer}
                subTitle={idx + 1}
              />
            ))}
            <AnswerButton
              onClick={() => {
                handleAnswer(answer);
                this.hideQuestion();
              }}
            />
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
            <AnswerButton
              onClick={() => {
                handleAnswer(answer);
                this.hideQuestion();
              }}
            />
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
      handleAnswer,
    } = this.props;
    const { showQuestion, showImage } = this.state;
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section className={`Game-fullscreen Question ${endGame || !showQuestion ? 'Question--fadeout' : ''}`}>
        <div className={question.length > 100 ? 'Question__container Question__container--large' : 'Question__container'}>
          <div className="Question__count">
            <b>{`Вопрос № ${count} `}</b>
            {`из ${total}`}
          </div>
          <div className="Question__progress">
            <div className="Question__progress__bar" style={{ width: `${progress}%` }} />
          </div>
          {image && (
            <div
              className={`Question__image__container ${showImage ? 'Question__image__container--fullscreen' : ''}`}
              ref={(container) => {
                this.imageContainer = container;
              }}
              tabIndex="-1"
              role="button"
              onKeyDown={this.handleKeyDown}
              onClick={() => {
                if (showImage) this.setState({ showImage: false });
                else this.setState({ showImage: true });
              }}
              onMouseMove={this.imageMouseMove}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
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
          )}
          <div
            className="Question__title"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: question }}
          />
        </div>
        {answers && this.switchRender()}
        {!answers && (
          <TextAnswer
            handleAnswer={handleAnswer}
            hideQuestion={this.hideQuestion}
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
