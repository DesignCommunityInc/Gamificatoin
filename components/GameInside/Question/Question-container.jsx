import React from 'react'
import { PropTypes } from "prop-types";
import egg from './egg-2.jpg';

const propTypes = {
  // request: PropTypes.object.isRequired,
};
const defaultTypes = {
    // request: {},
};


class Question extends React.Component {
  constructor() {
    super();
    this.imageMoving = this.imageMoving.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.answerMouseEnter = this.answerMouseEnter.bind(this);
    this.answerMouseEnter = this.answerMouseEnter.bind(this);
    this.answered = false;
    this.defaultState = {
      answer: 'Pass answer here',
    };
    this.state = this.defaultState;
    this.canAnswer = false;
    this.answered = false;
  }
  // movingTimer = null;
  // currentTarget = null;
  // cloneTarget = null;
  // boundingXY = null;
  componentDidMount() {
    this.imageMoving();
    document.addEventListener('mousemove', this.handleMove, false);
    document.addEventListener('mouseup', this.handleEnd, false);
  }
  componentWillUnmount() {
    clearInterval(this.movingTimer);
  }
  handleStart(e) {
    if(this.answered) return false;
    this.clearWindowSelections();
    this.currentTarget = e.currentTarget;
    let target = this.currentTarget;
    this.boundingXY = this.getBoundingClientXY(e, e.currentTarget);
    this.cloneTarget = target.cloneNode(true);
    this.cloneTarget.classList.add('Question__answer--hidden');
    target.classList.add('Question__answer--grabbing');
    target.parentNode.insertBefore(this.cloneTarget, target.nextSibling);
    this.handleMove(e);
  }
  handleEnd() {
    let target = this.currentTarget;
    if(!target || !this.cloneTarget) return false;
    if(this.canAnswer) {
      this.answerTheQuestion();
    }
    if(this.answered) 
      this.currentTarget.classList.add('Question__answer--hidden');
    this.cloneTarget.parentNode.removeChild(this.cloneTarget);
    this.answerContainer.classList.remove('Question__drag--passing-answer');
    target.classList.remove('Question__answer--grabbing');
    target.style = {};
    this.cloneTarget = null;
    if(!this.answered)
      this.currentTarget = null;
  }
  handleCancel() {
    if(!this.answered) return false;
    this.currentTarget.classList.remove('Question__answer--hidden');
    this.answerContainer.classList.remove('Question__drag--answered');
    this.setState(this.defaultState);
    this.answered = false;
    this.canAnswer = false;
  }
  handleMove(e) {
    let target = this.currentTarget;
    let boundings = this.boundingXY;
    if(!target || !boundings || this.answered) return false;
    if(e.touches){
      let pageXOffset = document.documentElement.scrollLeft;
      let pageYOffset = document.documentElement.scrollTop;
      target.style.left = `${e.touches[0].clientX - target.offsetWidth * 0.5 + pageXOffset}px`;
      target.style.top = `${e.touches[0].clientY - target.offsetHeight * 0.5 + pageYOffset}px`;
      this.answerMouseEnter();
      return;
    }
    target.style.left = `${e.pageX - boundings.x}px`;
    target.style.top = `${e.pageY - boundings.y}px`;
    this.answerMouseEnter()
  }
  answerMouseEnter() {
    let target = this.currentTarget;
    let containerBoundaries = this.getBoundingClientXY(target, this.answerContainer);
    if(containerBoundaries.x + target.offsetWidth * 0.4 > 0 && containerBoundaries.y + target.offsetHeight * 0.4 > 0) {
      this.answerContainer.classList.add('Question__drag--passing-answer');
      this.canAnswer = true;
      return;
    }
    this.answerContainer.classList.remove('Question__drag--passing-answer');
    this.canAnswer = false;
  }
  answerTheQuestion() {
    this.setState({ 
      answer: this.cloneTarget.getAttribute('data-attr'), 
    });
    this.answered = true;
    this.answerContainer.classList.add('Question__drag--answered');
  }
  getBoundingClientXY(e, target) {
    let { left, top} = target.getBoundingClientRect();
    return e.clientX ? {
      x: e.clientX - left,
      y: e.clientY - top,
    } : {
      x: e.offsetLeft - left,
      y: e.offsetTop - top,
    };
  }
  clearWindowSelections() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
  }
  imageMoving() {
    if(!this.imageContainer) return;
    let direction = true;
    let translate = 0;
    const moving = () => {
      let limit = this.imageContainer.scrollHeight - this.imageContainer.clientHeight;
      if(limit <= 30) return false;
      translate += direction ? 1 : -1;
      if(translate <= 0 || translate >= limit) {
        translate = translate > limit - translate ? limit : 0;
        direction = !direction;
      }
      this.imageContainer.scrollTop = translate;
    }
    this.movingTimer = setInterval(
      moving,
      10,
    )
  }
  render() {
    const { data, isLoading } = this.props;
    const title = "Что было первым?";
    const questions = ["Ложка", 'Курица', 'Яйцо', 'Собака', "Кактус"];
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section className="Question">
        <div className="Question__container">
          <div 
            className="Question__image__container" 
            ref={(container) => {
              this.imageContainer = container;
            }}>
            <img 
              src={egg} 
              alt="mountains" 
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
          <div className="Question__title">{title}</div>
        </div>
        
        <div className="Question__list">
          {questions.map((question, idx) => 
            <div 
              className="Question__answer" 
              key={idx}
              data-attr={question}
              onTouchStart={this.handleStart}
              onMouseDown={this.handleStart}
              onTouchEnd={this.handleEnd}
              // onTouchCancel={this.handleCancel}
              onTouchMove={this.handleMove}
            />
          )}
        </div>
        <div className="Question__drag__container">
          <div 
            className="Question__drag"
            ref={container => this.answerContainer = container}
            data-attr={this.state.answer}
            onClick={this.handleCancel}
          />
        </div>
      </section>
    );
  }
}


Question.propTypes = propTypes;
Question.defaultTypes = defaultTypes;

export default Question;