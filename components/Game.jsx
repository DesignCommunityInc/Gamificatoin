import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Link } from 'react-router-dom';

const propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  difficulty: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // eslint-disable-next-line camelcase
  questions_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  time: PropTypes.string,
  experience: PropTypes.number,
  creator: PropTypes.shape({}),
  participants: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  // eslint-disable-next-line camelcase
  available_until: PropTypes.string,
  completed: PropTypes.bool,
};
const defaultProps = {
  id: 0,
  image: '',
  name: '',
  difficulty: '',
  // eslint-disable-next-line camelcase
  questions_count: '',
  time: '',
  experience: 0,
  creator: {},
  participants: null,
  // eslint-disable-next-line camelcase
  available_until: '',
  completed: false,
  isLoading: false,
};

const Game = ({
  id,
  image,
  name,
  difficulty,
  questions_count: questions,
  time,
  experience,
  creator: {
    second_name: secondName,
    name: creatorName,
    middle_name: middleName,
    photo,
  } = {},
  participants,
  isLoading,
  available_until: availableUntil,
  completed,
}) => {
  const picture = image || 'https://blog.schoolspecialty.com/wp-content/uploads/2017/04/How-to-Help-Your-Students-Overcome-Math-Anxiety-1200x624.jpg';
  if (isLoading) {
    return (
      <div className="game">
        <div to="games/AhjaSLHDasda*)8970!@J" className="game__tile game__tile-loading" />
        <div className="game__author game__author-loading" />
      </div>
    );
  }
  return (
    <div className="game">
      <Link
        to={`games/${id}`}
        className="game__tile"
        style={{ backgroundImage: `url('${picture}')` }}
      >
        {/* {results != null &&
          <div className="game__results">{results} балла</div>
        } */}
        <div className="game__name">{name}</div>
        {difficulty && <div className="game__difficulty">{`${difficulty} уровень сложности`}</div>}
        {questions && <div className="game__questions">{`${questions} плиток`}</div>}
        {time && <div className="game__time">{`${time} минут`}</div>}
        <div className="game__reward">
          <div className="game__reward__exp">{`+ ${experience} xp`}</div>
        </div>
      </Link>
      {creatorName && (
        <div className="game__author">
          <div className="game__author__image" style={{ backgroundImage: `url('${photo && photo}')` }} />
          <div className="game__author__info">
            <h5>{secondName}</h5>
            <h6>{`${creatorName} ${middleName}`}</h6>
          </div>
        </div>
      )}
      {participants && participants.map(({
        name: partName,
        second_name,
        middle_name,
        photo: partPhoto,
      }) => (
        <div key={uid()} className="game__author">
          <div className="game__author__image" style={{ backgroundImage: `url('${partPhoto && partPhoto}')` }} />
          <div className="game__author__info">
            <h5>{second_name}</h5>
            <h6>{`${partName} ${middle_name}`}</h6>
          </div>
        </div>
      ))}
      {(!completed && availableUntil) && (
        <div className="game__author">
          <div className="game__author__info">
            <h6>Доступно до</h6>
            <h5>{availableUntil}</h5>
          </div>
        </div>
      )}
      <div className="game__author" style={{ opacity: 0 }}>
        <div className="game__author__info">
          <h6> </h6>
          <h5> </h5>
        </div>
      </div>
    </div>
  );
};

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

export default Game;
