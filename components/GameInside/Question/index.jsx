import React from 'react';
import PropTypes from 'prop-types';
import GME from '../../../utils/GamingMouseEvents';

const propTypes = {
  answer: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  question: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

class Question extends React.Component {
  constructor() {
    super();
    this.imageMoving = this.imageMoving.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.dropAnswerTile = this.dropAnswerTile.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.answerMouseEnter = this.answerMouseEnter.bind(this);
    this.setTargetDefaultPlace = this.setTargetDefaultPlace.bind(this);
    this.state = {
      showQuestion: true,
    };
  }

  componentDidMount() {
    this.imageMoving();
    document.addEventListener('mousemove', this.handleMove, false);
    document.addEventListener('mouseup', this.handleEnd, false);
  }

  componentDidUpdate(previousProps) {
    const { question } = this.props;
    if (previousProps.question === question) return false;
    this.showQuestion();
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.movingTimer);
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
  }

  setTargetDefaultPlace() {
    // if (this.answered)
    // this.currentTarget.classList.add('Question__answer--hidden');
    this.cloneTarget.parentNode.removeChild(this.cloneTarget);
    // this.answerContainer.classList.remove('Question__drag--passing-answer');
    // this.currentTarget.classList.remove('Question__answer--grabbing');
    this.currentTarget.style = null;
    this.cloneTarget = null;
    this.currentTarget = null;
  }

  handleStart(e) {
    if ((e.buttons && e.buttons !== 1) || this.currentTarget) return;
    GME.clearWindowSelections();
    this.currentTarget = e.currentTarget;
    this.cloneTarget = this.currentTarget.cloneNode(true);
    this.cloneTarget.classList.add('Question__answer--hidden');
    this.currentTarget.classList.add('Question__answer--grabbing');
    this.currentTarget.parentNode.insertBefore(this.cloneTarget, this.currentTarget.nextSibling);
    GME.move(e, this.currentTarget);
  }

  handleEnd() {
    if (!this.currentTarget || !this.cloneTarget) return;
    if (this.canAnswer) {
      this.dropAnswerTile();
      return;
    }
    this.setTargetDefaultPlace();
  }

  handleAnswerClick(e) {
    e.preventDefault();
    const { handleAnswer } = this.props;
    if (!this.answered) return;
    if (e.type === 'click') {
      this.hideQuestion();
      setTimeout(() => {
        this.handleCancel();
        handleAnswer();
      }, 1000);
    }
    if (e.type === 'contextmenu') {
      this.handleCancel();
    }
  }

  handleCancel() {
    this.currentTarget.classList.remove('Question__answer--hidden');
    this.answerContainer.classList.remove('Question__drag--answered');
    this.currentTarget = null;
    this.answered = false;
    this.canAnswer = false;
  }

  // handleMove(e) {
  //   GME.move(e, e.target);
  // }

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

  answerMouseEnter() {
    if (!this.answerContainer) return;
    GME.elementMouseEnter(this.currentTarget, this.answerContainer);
  }

  dropAnswerTile() {
    this.answered = true;
    this.answerContainer.classList.add('Question__drag--answered');
    this.setTargetDefaultPlace();
  }

  showQuestion() {
    this.setState({ showQuestion: true });
  }

  hideQuestion() {
    this.setState({ showQuestion: false });
  }

  render() {
    const {
      answer,
      // difficulty,
      // id,
      question,
      question_image,
      // isLoading,
      endGame,
    } = this.props;
    const { showQuestion } = this.state;
    console.log(this.props);
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section 
        className={endGame || !showQuestion ? "Question Question--fadeout" : "Question"}>
        <div className={question.length > 100
              ? 'Question__container Question__container--large'
              : 'Question__container'}>
          <div 
            className="Question__image__container" 
            ref={(container) => {
              this.imageContainer = container;
            }}>
            <img 
              src={question_image}
              alt=""
              className="Question__image" 
              ref={(image) => {
                this.image = image;
              }}
              />
          </div>
          <div className="Question__count">
            <b>{`Вопрос № ${count}`}</b>{` из ${total}`}
          </div>
          <div className="Question__progress">
            <div className="Question__progress__bar" style={{ width: `${progress}%`}}/>
          </div>
          <div 
            className='Question__title'
            dangerouslySetInnerHTML={{ __html: question }}
          />
        </div>
        {answer && (
          <div className="Question__list">
            {answer.map((awr, idx) => 
              <div 
              className="Question__answer" 
              key={idx}
                data-attr={JSON.stringify(awr)}
                onTouchStart={this.handleStart}
                onMouseDown={this.handleStart}
                onTouchEnd={this.handleEnd}
                onTouchMove={this.handleMove}
                onTouchCancel={this.handleCancel}
              />
            )}
          </div>
        )}
        {answer && (
          <div className="Question__drag__container">
            <div 
              className="Question__drag"
              ref={(ref) => {
                this.answerContainer = ref;
              }}
              data-attr={this.state.answer}
              onClick={this.handleAnswerClick}
              onContextMenu={this.handleAnswerClick}
            />
          </div>
        )}
      </section>
    );
  }
}


Question.propTypes = propTypes;
// Question.defaultProps = defaultProps;

export default Question;
