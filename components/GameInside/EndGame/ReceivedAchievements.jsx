import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  achievementList: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    // eslint-disable-next-line camelcase
    exp_add: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
};
const defaultProps = {
  achievementList: null,
};

class Achievements extends React.Component {
  constructor() {
    super();
    this.animateHandle = this.animateHandle.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.state = {
      translateOutUp: false,
      increaseWidth: false,
      swipeTitles: false,
    };
    this.timers = [];
  }

  componentDidMount() {
    this.animateHandle();
  }

  componentWillUnmount() {
    this.timers.forEach((timer) => {
      clearInterval(timer);
    });
  }

  animateHandle() {
    this.timeOut({ translateOutUp: true }, 2000);
    this.timeOut({ increaseWidth: true }, 2600); // animation 1s + 2s timeout
    this.timeOut({ swipeTitles: true }, 3000); // animation 1s + 3s timeout
    this.timeOut({ increaseWidth: false }, 7500); // animation 1s + 6s timeout
    this.timeOut({ translateOutUp: false }, 7800); // animation 1s + 10s timeout
  }

  timeOut(state, time) {
    this.timers.push(setTimeout(() => {
      this.setState(state);
    }, time));
  }

  render() {
    const {
      achievementList,
    } = this.props;
    if (!achievementList) return null;
    const mainAchievement = achievementList[0];
    const {
      description,
      exp_add: experience,
      image,
      name,
    } = mainAchievement;
    const { translateOutUp, increaseWidth, swipeTitles } = this.state;
    console.log(achievementList);
    return (
      <div className={`received-achievements ${translateOutUp ? 'received-achievements--animate' : ''}`}>
        <div className={`received-achievements__main ${increaseWidth ? 'received-achievements__main--animate' : ''}`}>
          <span className="main-achievement__icon" style={{ backgroundImage: `url('${image}')` }} />
          <div className={`main-achievement__swap-container ${swipeTitles ? 'main-achievement__swap-container--animate' : ''}`}>
            <span className="main-achievement__name">{name}</span>
            <span className="main-achievement__description">{description}</span>
          </div>
          <span className="main-achievement__experience">{`${experience}xp`}</span>
        </div>
      </div>
    );
  }
}

Achievements.propTypes = propTypes;
Achievements.defaultProps = defaultProps;

export default Achievements;
