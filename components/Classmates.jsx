import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Link } from 'react-router-dom';
import * as routes from '../constants/Routes';

const propTypes = {
  mateList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const Classmates = ({
  mateList,
  isLoading,
}) => (
  <section className="Classmates">
    <Link to={routes.CLASSMATES_PAGE} className="Container__title Container__title-forward">Мой класс</Link>
    <div className="Classmates__container">
      <div className="tag-list">
        <span className="tag-list__item">4Б</span>
      </div>
      <div className="Classmates__toggle">
        <span />
      </div>
      <div className="mates">
        {/* {console.log(mateList)} */}
        {mateList.map(({ id, photo }) => (
          <Link to={`/user/${id}`} key={uid()}>
            <span className="mates__image" style={{ backgroundImage: `url('${photo}')` }} />
          </Link>
        ))}
        <span className="mates__image" />
        <span className="mates__count">+ 25 человек</span>
      </div>
    </div>
  </section>
);

Classmates.propTypes = propTypes;

export default Classmates;
