import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import uid from 'uid';
import Game from './Game';
import ScrollWrapper from './ScrollWrapper';

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
  emptyTitle: 'На данный момент нет доступных игр :(',
};

const GameList = ({
  title,
  list,
  isLoading,
  pathname,
  error,
  emptyTitle,
}) => {
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
        <ScrollWrapper>
          {[...Array(2)].map(() => (
            <Game
              isLoading
              key={uid()}
            />
          ))}
        </ScrollWrapper>
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
      <ScrollWrapper>
        {list.map(game => (
          <Game
            key={uid()}
            {...game}
          />
        ))}
      </ScrollWrapper>
    </section>
  );
};

GameList.propTypes = propTypes;
GameList.defaultProps = defaultProps;

export default GameList;
