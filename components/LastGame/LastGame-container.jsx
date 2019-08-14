import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uid from 'uid';
import Utils from '../../utils/Utils';
import Stat from './Stat';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  fetchLastGame: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
const defaultTypes = {
};

class LastGame extends React.Component {
  constructor() {
    super();
    this.moveForward = this.moveForward.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollVisibility = this.scrollVisibility.bind(this);
  }

  componentDidMount() {
    // if(this.backward) this.backward.classList.add('hidden');
    const { fetchLastGame } = this.props;
    fetchLastGame();
    if (this.wrapper) this.wrapper.addEventListener('DOMNodeInserted', this.scrollVisibility);
  }

  scrollVisibility() {
    if (this.wrapper.offsetWidth <= this.gamesContainer.offsetWidth && this.forward) {
      this.forward.classList.add('hidden');
    }
  }

  handleScroll() {
    const container = this.gamesContainer;
    const limit = container.scrollWidth - container.clientWidth;
    switch (Math.floor(container.scrollLeft)) {
      case limit: this.forward.classList.add('hidden');
        break;
      case 0: this.backward.classList.add('hidden');
        break;
      default:
        this.backward.classList.remove('hidden');
        this.forward.classList.remove('hidden');
        break;
    }
  }

  moveForward() {
    Utils.forward(this.gamesContainer, -350);
  }

  moveBack() {
    Utils.backward(this.gamesContainer, 350);
  }

  render() {
    const {
      data: {
        id,
        image,
        name,
        time,
        status,
        start_date: startDate,
        finish_date: finishDate,
        statistic = [],
      } = {},
      isLoading,
    } = this.props;
    if (isLoading) {
      return (
        <div />
      );
    }
    return (
      <section className="Games Container Games__Last">
        <div className="game game__last">
          <Link
            to={`games/${id}`}
            className="game__tile"
            style={{ backgroundImage: `url('${image}')` }}
          >
            {/* <img className="game__image" src={`${image}`} alt="geography" /> */}
            <div className="game__name">{name}</div>
            <div className="game__questions">{`${time} минут`}</div>
            {/* <div className="game__time">{time} минут</div> */}
          </Link>
        </div>
        <span
          className="Games__scroller"
          type="backward"
          onClick={this.moveBack}
          tabIndex="0"
          role="button"
          onKeyDown={() => {}}
          ref={(button) => {
            this.backward = button;
          }}
        />
        <span
          className="Games__scroller"
          type="forward"
          onClick={this.moveForward}
          tabIndex="0"
          role="button"
          onKeyDown={() => {}}
          ref={(button) => {
            this.forward = button;
          }}
        />
        <div
          className="Games__Last__container Games__container Games__container-scroll"
          ref={(container) => {
            this.gamesContainer = container;
          }}
          onScroll={this.handleScroll}
        >
          <div
            className="Games__container__wrapper Games__container__wrapper__last"
            ref={(wrapper) => {
              this.wrapper = wrapper;
            }}
          >
            <div className="stat__ln">
              <div className="stat stat__main">
                <span className="stat__title">
                  <p>Статус</p>
                </span>
                <div className="stat__status">
                  <span className="stat__status__pointer" />
                  <p className="stat__status__name">{status}</p>
                </div>
                <div className="stat__date">
                  <p className="stat__date__start">{startDate}</p>
                  <span />
                  <p className="stat__date__finish">{finishDate}</p>
                </div>
              </div>
            </div>
            {statistic.map(statist => (
              <Stat
                key={uid()}
                title={statist.title}
                value={statist.count}
                info={statist.stat}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

LastGame.propTypes = propTypes;
LastGame.defaultTypes = defaultTypes;

export default LastGame;
