import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  patronymic: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const Participans = ({
  name,
  patronymic,
  surname,
  type,
}) => (
  <div className="participant">
    <div className="participant__info">
      <p className="participant__info__middlename">{surname}</p>
      <p className="participant__info__name__secondname">{`${name} ${patronymic}`}</p>
    </div>
    <div type={type} className="participant__status">
      {type === 'complete' ? 'прошел' : 'не приступал'}
    </div>
  </div>
);

Participans.propTypes = propTypes;

export default Participans;
