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
    this.movingTimer = null;
    this.currentTarget = null;
    this.cloneTarget = null;
    this.boundingXY = null;
  }
  componentDidMount() {
    this.imageMoving();
    document.addEventListener('mousemove', this.handleMove, false);
    document.addEventListener('mouseup', this.handleEnd, false);
  }
  componentWillUnmount() {
    clearInterval(this.movingTimer);
  }
  handleStart(e) {
    this.currentTarget = e.currentTarget;
    let target = this.currentTarget;
    this.boundingXY = this.getBoundingClientXY(e);
    this.cloneTarget = target.cloneNode(true);
    this.cloneTarget.classList.add('Question__answer-hidden');
    target.classList.add('Question__answer-grabbing');
    target.parentNode.insertBefore(this.cloneTarget, target.nextSibling);
    this.handleMove(e);
  }
  handleEnd() {
    let target = this.currentTarget;
    if(!target || !this.cloneTarget) return false;
    this.cloneTarget.parentNode.removeChild(this.cloneTarget);
    target.classList.remove('Question__answer-grabbing');
    target.style = {};
    this.cloneTarget = null;
    this.currentTarget = null;
  }
  handleCancel() {
    // console.log(e.target);
  }
  handleMove(e) {
    let target = this.currentTarget;
    let boundings = this.boundingXY;
    if(!target || !boundings) return false;
    let offsetX = this.questionContainer.offsetLeft;
    let offsetY = this.questionContainer.offsetTop;
    if(e.touches){
      target.style.left = `${e.touches[0].clientX - target.offsetWidth * 0.5 - offsetX}px`;
      target.style.top = `${e.touches[0].clientY - target.offsetHeight * 0.5 - offsetY}px`;
      return;
    }
    target.style.left = `${e.pageX - boundings.x - offsetX}px`;
    target.style.top = `${e.pageY - boundings.y - offsetY}px`;
  }
  getBoundingClientXY(e) {
    let rect = e.currentTarget.getBoundingClientRect();
    return e.clientX ? {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    } : {};
  }
  imageMoving() {
    let direction = true;
    let translate = 0;
    const moving = () => {
      let limit = this.container.scrollHeight - this.container.clientHeight;
      if(limit <= 30) return false;
      translate += direction ? 1 : -1;
      if(translate <= 0 || translate >= limit) {
        translate = translate > limit - translate ? limit : 0;
        direction = !direction;
      }
      this.container.scrollTop = translate;
    }
    this.movingTimer = setInterval(
      moving,
      10,
    )
  }
  render() {
    const { data, isLoading } = this.props;
    const title = "Что было первым?";
    const questions = [
      "Ложка", 'Курица', 'Яйцо', 'Собака' ,
    ];
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section className="Question">
        <div className="Question__container">
          <div className="Question__count">
            <b>{`Вопрос № ${count}`}</b>{` из ${total}`}
          </div>
          <div className="Question__progress">
            <div className="Question__progress__bar" style={{ width: `${progress}%`}}/>
          </div>
          <div 
            className="Question__image__container" 
            ref={(container) => {
              this.container = container;
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
          <div className="Question__title">{title}</div>
        </div>
        
        <div 
          className="Question__list"
          ref={(questionContainer) => {
            this.questionContainer = questionContainer;
          }}
        >
          {questions.map((question, idx) => 
            <div 
              className="Question__answer" 
              key={idx}
              data-attr={question}
              onTouchStart={this.handleStart}
              onTouchEnd={this.handleEnd}
              onTouchCancel={this.handleCancel}
              onTouchMove={this.handleMove}
              onMouseDown={this.handleStart}
            />
          )}
        </div>
        <div className="Question__drag" />
      </section>
    );
  }
}


Question.propTypes = propTypes;
Question.defaultTypes = defaultTypes;

export default Question;