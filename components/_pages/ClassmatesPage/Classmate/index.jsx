import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  middle_name: PropTypes.string,
  second_name: PropTypes.string,
  nickname: PropTypes.string,
  photo: PropTypes.string,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  id: '',
  name: '',
  middle_name: '',
  second_name: '',
  nickname: '',
  photo: '',
  isLoading: false,
};

const Classmate = ({
  id,
  name,
  middle_name,
  second_name,
  nickname,
  photo,
  isLoading,
}) => (isLoading ? (
  <div className="achievement">
    <div className="achievement__icon__container">
      <span className="achievement__icon" />
    </div>
    <div className="achievement__info achievement__info-loading">
      <h4> </h4>
      <h5> </h5>
    </div>
  </div>
) : (
  <div className="achievement">
    <div className="achievement__icon__container">
      <Link to={`/user/${id}`}>
        <span className="achievement__icon" style={{ backgroundImage: `url('${photo}')` }} />
      </Link>
    </div>
    <div className="achievement__info">
      <Link to={`/user/${id}`}>
        <div className="achievement__reward">{`@${nickname}`}</div>
      </Link>
      <h4>{name}</h4>
      <h5>{`${second_name} ${middle_name}`}</h5>
    </div>
  </div>
));

Classmate.propTypes = propTypes;
Classmate.defaultProps = defaultProps;

export default Classmate;
