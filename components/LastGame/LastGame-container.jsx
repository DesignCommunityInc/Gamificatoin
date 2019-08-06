import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';
import Utils from '../../utils/Utils';
import Stat from './Stat';


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
    if(this.wrapper) this.wrapper.addEventListener('DOMNodeInserted', this.scrollVisibility);
  }
  scrollVisibility() {
    if(this.wrapper.offsetWidth <= this.gamesContainer.offsetWidth && this.forward) {
      this.forward.classList.add('hidden');
    }
  }
  handleScroll() {
    const container = this.gamesContainer;
    const limit = container.scrollWidth - container.clientWidth;
    switch(Math.floor(container.scrollLeft)) {
      case limit:
        this.forward.classList.add('hidden'); 
        break;
      case 0: 
        this.backward.classList.add('hidden');
        break;
      default: 
        this.backward.classList.remove('hidden');
        this.forward.classList.remove('hidden');
        break;
    }
  }
  moveForward() {
    Utils.forward(this.gamesContainer, -365);
  }
  moveBack() {
    Utils.backward(this.gamesContainer, 365);
  }

  render() {
    // const Game = ({ gameID = 1, picture = 1, results = 1, name = 1, difficulty = 1, questions = 1, time = 1, experience = 1, creator = 1, isLoading = 1 });
    const {
      Game: {
        name = 'Первая игра',
        gameID = '1',
        picture = 'https://i.ytimg.com/vi/2uiU9Cx3uDM/maxresdefault.jpg',
        questions = 20,
        time = 1,
        // value = 41,
      } = {},
    } = this.props;
    return (
      <section className="Games Container Games__Last Games__container__wrapper">
        <div className="game game__last">
          <Link to={`games/${gameID}`} className="game__tile">
            <img className="game__image" src={picture} alt="geography" />
            <div className="game__name">{name}</div>
            <div className="game__questions">{questions} вопрос( a / ов )</div>
            <div className="game__time">{time} минут</div>
          </Link>
        </div>
        <span
          className="Games__scroller" type="backward"
          onClick={this.moveBack}
          ref={(button) => {
            this.backward = button;
          }}
        />
        <span
          className="Games__scroller" type="forward"
          onClick={this.moveForward}
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
              <Stat
                title = "Заявлено участников"
                value = '42'
              />
            </div>
            <div className="stat__ln">
              <Stat
                title = "Закончили игру"
                value = '24'
              />
            </div>
            <div className="stat__ln">
              <Stat
                title = "Не преступали"
                value = '18'
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

LastGame.defaultTypes = defaultTypes;

export default LastGame;
