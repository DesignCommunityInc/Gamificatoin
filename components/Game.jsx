import React from 'react';
import { PropTypes } from 'prop-types';
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
  creator: null,
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
  creator,
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
      {creator != null && (
        <Link to="/teacher" className="game__author" >
          <div className="game__author__image" />
          {/* style={{ backgroundImage: `url('${creator.image}')` }} */}
          <div className="game__author__info">
            {/* eslint-disable-next-line react/prop-types */}
            <h5>{creator.second_name}</h5>
            {/* eslint-disable-next-line react/prop-types */}
            <h6>{`${creator.name} ${creator.middle_name}`}</h6>
          </div>
        </Link>
      )}
      {!completed && (
        <Link to="/teacher" className="game__author">
          <div className="game__author__info">
            <h6>Доступно до</h6>
            <h5>{availableUntil}</h5>
          </div>
        </Link>
      )}
    </div>
  );
};


Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

export default Game;
