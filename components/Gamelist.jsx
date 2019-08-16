import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import uid from 'uid';
import Game from './Game';
import Utils from '../utils/Utils';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  pathname: PropTypes.string,
  error: PropTypes.bool,
  emptyTitle: PropTypes.string,
};
const defaultProps = {
  title: '',
  pathname: null,
  error: false,
  list: [],
  emptyTitle: 'Вы уже прошли все игры :(',
};

class GameList extends React.Component {
  constructor() {
    super();
    this.moveForward = this.moveForward.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollVisibility = this.scrollVisibility.bind(this);
  }

  componentDidMount() {
    if (this.backward) this.backward.classList.add('hidden');
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
    Utils.forward(this.gamesContainer, -600);
  }

  moveBack() {
    Utils.backward(this.gamesContainer, 600);
  }

  render() {
    const {
      title,
      list,
      isLoading,
      pathname,
      error,
      emptyTitle,
    } = this.props;
    if (error) {
      return (
        <section className="Games Container">
          {pathname ? (
            <div className="Container__title Container__title">{title}</div>
          ) : (
            <Link to="/games" className="Container__title Container__title-forward">{title}</Link>
          )}
          <div className="Games__container Games__container-scroll">
            <div className="Games__container__wrapper--empty">
              <span className="empty-title">{emptyTitle}</span>
            </div>
          </div>
        </section>
      );
    }
    if (isLoading) {
      return (
        <section className="Games Container">
          <div className="Container__title Container__title-forward Container__title-loading" />
          <div className="Games__container Games__container-scroll">
            <div className="Games__container__wrapper">
              {[...Array(2)].map(() => (
                <Game
                  isLoading
                  key={uid()}
                />
              ))}
            </div>
          </div>
        </section>
      );
    }
    return (
      <section className="Games Container">
        {pathname ? (
          <div className="Container__title Container__title">{title}</div>
        ) : (
          <Link to="/games" className="Container__title Container__title-forward">{title}</Link>
        )}
        <span
          className="Games__scroller hidden"
          type="backward"
          onClick={this.moveBack}
          tabIndex="0"
          onKeyDown={() => {}}
          role="button"
          ref={(button) => {
            this.backward = button;
          }}
        />
        <span
          className="Games__scroller"
          type="forward"
          onClick={this.moveForward}
          tabIndex="0"
          onKeyDown={() => {}}
          role="button"
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
            {list.map(game => (
              <Game
                key={game.id}
                {...game}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}


GameList.propTypes = propTypes;
GameList.defaultProps = defaultProps;

export default GameList;
