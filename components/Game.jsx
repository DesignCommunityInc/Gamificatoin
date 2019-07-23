import React from 'react'
// import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

// const propTypes = {
    
// }
// const defaultTypes = {
    
// }

const Game = ({ gameID, picture, results, name, difficulty, questions, time, experience, creator, isLoading }) => {
  picture = "https://blog.schoolspecialty.com/wp-content/uploads/2017/04/How-to-Help-Your-Students-Overcome-Math-Anxiety-1200x624.jpg";
  if(isLoading) {
    return (
      <div className="game">
        <div to="games/AhjaSLHDasda*)8970!@J" className="game__tile game__tile-loading" />
        <div to="/teacher" className="game__author game__author-loading">
        </div>
      </div>
    )
  }
  return (
    <div className="game">
      <Link to={`games/${gameID}`} className="game__tile">
        <img className="game__image" src={picture} alt="geography" />
        {results != null && 
          <div className="game__results">{results} балла</div>
        }
        <div className="game__name">{name}</div>
        <div className="game__difficulty">{difficulty} уровень сложности</div>
        <div className="game__questions">{questions} плитка</div>
        <div className="game__time">{time} минут</div>
        <div className="game__reward">
            <div className="game__reward__exp">+ {experience} xp</div>
        </div>
      </Link>
      {creator != null &&
        <Link to="/teacher" className="game__author">
          {/* style={{backgroundImage: `url('${creator.image}')`}} */}
          <div className="game__author__image" />
          <div className="game__author__info">
            <h5>{creator.second_name}</h5>
            <h6>{creator.name} {creator.middle_name}</h6>
          </div>
        </Link>
      }
    </div>
  )
}


// Games.propTypes = propTypes;
// Games.defaultTypes = defaultTypes;

export default Game;