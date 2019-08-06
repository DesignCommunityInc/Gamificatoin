import React from 'react';
import PropTypes from 'prop-types';
import GME from '../../../../utils/GamingMouseEvents';
import * as types from '../../../../constants/QuestionTypes';

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
  passedAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  isItPossibleToAnswer: PropTypes.bool.isRequired,
  isItPossibleToReplace: PropTypes.bool.isRequired,
  throwAnswer: PropTypes.func.isRequired,
  setOptionfocused: PropTypes.func.isRequired,
  setReplacePossibility: PropTypes.func.isRequired,
  replaceOption: PropTypes.func.isRequired,
  removeAnswers: PropTypes.func.isRequired,
};

class Option extends React.Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.dropAnswerTile = this.dropAnswerTile.bind(this);
    this.replaceAnswerTile = this.replaceAnswerTile.bind(this);
    this.setTargetDefaultPlace = this.setTargetDefaultPlace.bind(this);
    this.state = {
      draggable: false,
      passed: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMove, false);
    document.addEventListener('mouseup', this.handleEnd, false);
  }

  componentDidUpdate(previousProps) {
    const { passedAnswers } = this.props;
    if (previousProps.passedAnswers.length === passedAnswers.length) return;
    if (!this.isThrowable()) {
      this.setTargetDefaultPlace();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMove, false);
    document.removeEventListener('mouseup', this.handleEnd, false);
  }

  setTargetDefaultPlace() {
    this.setState({
      draggable: false,
      passed: false,
      onReplace: false,
    });
    this.currentTarget.style = null;
  }

  isThrowable() {
    const { passedAnswers } = this.props;
    for (let i = passedAnswers.length - 1; i >= 0; i -= 1) {
      if (passedAnswers[i].id === this.currentTarget.id) {
        return true;
      }
    }
    return false;
  }

  handleStart(e) {
    if ((e.buttons && e.buttons !== 1) || this.isThrowable()) return;
    const { setOptionfocused } = this.props;
    setOptionfocused(true);
    this.setState({ draggable: true });
    GME.clearWindowSelections();
    this.boundings = GME.getBoundingClientXY(e, this.currentTarget);
    GME.move(e, this.currentTarget, this.boundings);
  }

  handleEnd() {
    const { draggable } = this.state;
    if (!draggable) return;
    const {
      setOptionfocused,
      isItPossibleToAnswer,
      isItPossibleToReplace,
      type,
    } = this.props;
    switch (type) {
      case types.SELECT_ONE: case types.SELECT_EACH:
        setOptionfocused(false);
        if (isItPossibleToAnswer) {
          this.dropAnswerTile();
          return;
        }
        break;
      case types.SEQUENCE:
        if (isItPossibleToReplace) this.replaceAnswerTile();
        break;
      default: break;
    }
    this.setTargetDefaultPlace();
  }

  handleMove(e) {
    const { draggable } = this.state;
    if (!draggable) return;
    GME.move(e, this.currentTarget, this.boundings);
  }

  handleMouseEnter(e) {
    const { draggable } = this.state;
    const { type, setReplacePossibility } = this.props;
    if (type !== types.SEQUENCE || draggable) return;
    console.log(e.currentTarget);
    this.enterOption = e.currentTarget;
    setReplacePossibility(true);
  }

  handleMouseLeave() {
    const { draggable } = this.state;
    const { type, setReplacePossibility } = this.props;
    if (type !== types.SEQUENCE || draggable) return;
    this.enterOption = null;
    setReplacePossibility(false);
  }

  replaceAnswerTile() {
    const { answers, title, replaceOption } = this.props;
    const elementIndex = answers.indexOf(title);
    const footholdIndex = answers.indexOf(this.enterOption.getAttribute('data-attr'));
    // console.log(this.enterOption);
    // replaceOption(answers, elementIndex, footholdIndex, true);
  }

  dropAnswerTile() {
    const {
      throwAnswer,
      removeAnswers,
      type,
      title,
    } = this.props;
    if (type === types.SELECT_ONE) removeAnswers();
    throwAnswer({
      id: this.currentTarget.id,
      title,
    });
    this.setState({
      draggable: false,
      passed: true,
    });
    this.currentTarget.style = null;
  }

  render() {
    const { title, id } = this.props;
    const { draggable, passed, onReplace } = this.state;
    return (
      <>
        <div
          ref={(ref) => {
            this.currentTarget = ref;
          }}
          id={id}
          className={`Question__answer ${draggable ? 'Question__answer--grabbing' : ''} ${passed ? 'hidden' : ''} ${onReplace ? 'Question__answer--on-replace' : ''}`}
          data-attr={title}
          role="button"
          tabIndex="0"
          onMouseDown={this.handleStart}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchStart={this.handleStart}
          onTouchMove={this.handleMove}
          onTouchEnd={this.handleEnd}
        />
        <div
          ref={(ref) => {
            this.clone = ref;
          }}
          data-attr={title}
          className={`Question__answer Question__answer--hidden ${!draggable && !passed ? 'hidden' : ''}`}
        />
      </>
    );
  }
}

Option.propTypes = propTypes;

export default Option;
