import React from 'react'
import { PropTypes } from "prop-types";
import Game from './Game';
import { Link } from 'react-router-dom';
import Utils from '../utils/Utils';

const propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
}
const defaultProps = {
}

class GameList extends React.Component {     
  constructor() {
    super();
    this.moveForward = this.moveForward.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollVisibility = this.scrollVisibility.bind(this);
  }
  componentDidMount() {
    if(this.backward) this.backward.classList.add('hidden');
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
    const { title, list, isLoading } = this.props;
    if(isLoading) {
      return (
        <section className="Games Container">
        <div to="/my/games" className="Container__title Container__title-forward Container__title-loading" />
        <div className="Games__container Games__container-scroll">
          <div className="Games__container__wrapper">
            {[...Array(2)].map((_, idx) =>
              <Game 
                isLoading
                key={idx}
              />
            )}
          </div>
        </div>
      </section>
      )
    }
    return (
      <section className="Games Container">
        <Link to="/games" className="Container__title Container__title-forward">{title}</Link>
        <span
          className="Games__scroller hidden" type="backward"
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
          className="Games__container Games__container-scroll"
          ref={(container) => {
            this.gamesContainer = container;
          }}
          onScroll={this.handleScroll}
        >
          <div 
            className="Games__container__wrapper"
            ref={(wrapper) => {
              this.wrapper = wrapper;
            }}
          >
            {list.map((game) =>
              <Game 
                key={game.id}
                gameID={game.id}
                picture={game.image}
                // results={game.results}
                name={game.name}
                difficulty={game.difficulty}
                questions={game.all_questions}
                time={game.time}
                creator={game.creator}
                // experience={game.experience}
              />
            )}
          </div>
        </div>
      </section>
    )
  }
}


GameList.propTypes = propTypes;
GameList.defaultProps = defaultProps;

export default GameList;