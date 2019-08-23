import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import GME from '../../../../../utils/GamingMouseEvents';
import * as types from '../../../../../constants/QuestionTypes';

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // subTitle: PropTypes.string,
  titleList: PropTypes.arrayOf(PropTypes.string),
  answerList: PropTypes.arrayOf(PropTypes.any),
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
const defaultProps = {
  answerList: [],
  titleList: [],
  // subTitle: null,
};

class Option extends React.Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.dropAnswerTile = this.dropAnswerTile.bind(this);
    this.replaceAnswerTile = this.replaceAnswerTile.bind(this);
    this.setTargetDefaultPlace = this.setTargetDefaultPlace.bind(this);
    this.state = {
      draggable: false,
      passed: false,
      onReplace: false,
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
    const {
      setOptionfocused,
      type,
      throwAnswer,
      removeAnswers,
      title,
    } = this.props;
    setOptionfocused(true);
    this.setState({ draggable: true });
    GME.clearWindowSelections();
    this.boundings = GME.getBoundingClientXY(e, this.currentTarget);
    GME.move(e, this.currentTarget, this.boundings);
    switch (type) {
      case types.SEQUENCE: case types.MATCH:
        removeAnswers();
        throwAnswer({
          id: this.currentTarget.id,
          title,
        });
        break;
      default: break;
    }
  }

  handleEnd() {
    const { draggable } = this.state;
    if (!draggable) return;
    const {
      setOptionfocused,
      isItPossibleToAnswer,
      removeAnswers,
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
      case types.SEQUENCE: case types.MATCH:
        removeAnswers();
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

  handleMouseEnter() {
    const {
      type,
      setReplacePossibility,
      passedAnswers,
    } = this.props;
    if (!type.match(new RegExp(`${types.SEQUENCE}|${types.MATCH}`)) || passedAnswers.length === 0) return;
    this.setState({ onReplace: true });
    setReplacePossibility(true);
  }

  handleMouseLeave() {
    const {
      type,
      setReplacePossibility,
      passedAnswers,
    } = this.props;
    if (!type.match(new RegExp(`${types.SEQUENCE}|${types.MATCH}`)) || passedAnswers.length === 0) return;

    this.setState({ onReplace: false });
    setReplacePossibility(false);
  }

  handleMouseUp() {
    const { draggable } = this.state;
    const {
      type,
      setReplacePossibility,
      removeAnswers,
      isItPossibleToReplace,
      setOptionfocused,
    } = this.props;
    if (!type.match(new RegExp(`${types.SEQUENCE}|${types.MATCH}`)) || draggable) return;
    if (isItPossibleToReplace) {
      this.replaceAnswerTile();
    }
    setReplacePossibility(false);
    setOptionfocused(false);
    removeAnswers();
  }

  replaceAnswerTile() {
    const {
      titleList,
      title,
      type,
      replaceOption,
      removeAnswers,
      passedAnswers: [
        mouseOverTarget,
      ],
      answerList,
    } = this.props;
    const elementIndex = titleList.indexOf(mouseOverTarget.title);
    const footholdIndex = titleList.indexOf(title);
    removeAnswers();
    if (elementIndex === footholdIndex) return;
    replaceOption(answerList, titleList, elementIndex, footholdIndex, type);
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
    // eslint-disable-next-line react/prop-types
    const { title, id, subTitle } = this.props;
    const {
      draggable,
      passed,
      onReplace,
    } = this.state;
    return (
      <>
        <div
          data-attr={title}
          data-attr-before={DOMPurify.sanitize(subTitle)}
          className={`Question__answer Question__answer--hidden Question__answer--matches ${draggable ? 'Question__answer--empty-space' : ''} ${onReplace ? 'Question__answer--on-empty-space' : ''}`}
        />
        <div
          ref={(ref) => {
            this.clone = ref;
          }}
          data-attr={DOMPurify.sanitize(title)}
          className={`Question__answer Question__answer--hidden ${!draggable && !passed ? 'hidden' : ''}`}
        />
        <div
          ref={(ref) => {
            this.currentTarget = ref;
          }}
          id={id}
          className={`Question__answer ${draggable ? 'Question__answer--grabbing' : ''} ${passed ? 'hidden' : ''} ${onReplace ? 'Question__answer--on-replace' : ''}`}
          data-attr={DOMPurify.sanitize(title)}
          role="button"
          tabIndex="0"
          onMouseDown={this.handleStart}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleStart}
          onTouchMove={this.handleMove}
          onTouchEnd={this.handleEnd}
        />
      </>
    );
  }
}

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;
