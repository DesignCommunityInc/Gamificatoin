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
  white: PropTypes.bool,
  setTimer: PropTypes.func.isRequired,
  endTheGame: PropTypes.func.isRequired,
};
const defaultProps = {
  game: {},
  timer: null,
  white: false,
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
    const { game: { test: { time } = {} } = {}, setTimer } = this.props;
    if (!time) return;
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
    const finalTime = 59;
    if (hour > 0 && min - 1 < 0 && sec - 1 < 0) {
      hour -= 1;
    }
    if (min >= 0 && sec - 1 < 0) {
      min = min - 1 < 0 ? finalTime : min - 1;
    }
    sec = sec >= 0 && sec - 1 < 0 ? finalTime : sec - 1;

    localStorage.setItem('timer', JSON.stringify({ hours: hour, minutes: min, seconds: sec }));
    setTimer({ hours: hour, minutes: min, seconds: sec });
    if (hour === 0 && min === 0 && sec === 0) {
      clearInterval(this.timerInterval);
      setTimer(null);
      endTheGame();
    }
  }

  render() {
    const { timer, white } = this.props;
    if (!timer) return false;
    const { hours, minutes, seconds } = timer;
    return (
      <div className={`Timer ${white ? 'Timer--white' : ''}`}>
        {`${hours}:${minutes}:${seconds}`}
      </div>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
