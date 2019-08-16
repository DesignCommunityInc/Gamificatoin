import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  game: PropTypes.shape({}),
  timer: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }),
  currentQuestion: PropTypes.shape({}),
  endGame: PropTypes.bool.isRequired,
  setTimer: PropTypes.func.isRequired,
  endTheGame: PropTypes.func.isRequired,
};
const defaultProps = {
  game: {},
  timer: null,
  currentQuestion: null,
};

class Timer extends React.Component {
  constructor() {
    super();
    this.start = this.start.bind(this);
    this.timerTick = this.timerTick.bind(this);
  }

  componentDidMount() {
    const { timer } = this.props;
    if (timer) {
      this.timerInterval = setInterval(() => {
        this.timerTick();
      }, 1000);
    }
  }

  componentDidUpdate() {
    const { currentQuestion, timer, endGame } = this.props;
    if (currentQuestion && !timer && !endGame) {
      this.start();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  start() {
    const { game: { test: { time } } = {}, setTimer } = this.props;
    const t = {
      seconds: 0,
      minutes: parseInt(time.split(/:/)[1], 10),
      hours: parseInt(time.split(/:/)[0], 10),
    };
    setTimer(t);
    this.timerInterval = setInterval(() => {
      this.timerTick();
    }, 1000);
  }

  timerTick() {
    const {
      timer: {
        hours,
        minutes,
        seconds,
      } = {},
      setTimer,
      endTheGame,
    } = this.props;
    let hour = hours;
    let min = minutes;
    let sec = seconds;

    hour = hours > 0 && minutes - 1 < 0 ? hours - 1 : hours;
    min = min > 0 && seconds - 1 < 0 ? minutes - 1 : minutes;
    sec = sec >= 0 && seconds - 1 < 0 ? 59 : seconds - 1;

    localStorage.setItem('timer', JSON.stringify({ hours: hour, minutes: min, seconds: sec }));
    setTimer({ hours: hour, minutes: min, seconds: sec });
    if (hour === 0 && min === 0 && sec === 0) {
      clearInterval(this.timerInterval);
      setTimer(null);
      endTheGame();
    }
    // endGame
  }

  render() {
    const { timer } = this.props;
    if (!timer) return false;
    const { hours, minutes, seconds } = timer;
    return (
      <div className="Timer">
        {`${hours}:${minutes}:${seconds}`}
      </div>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
