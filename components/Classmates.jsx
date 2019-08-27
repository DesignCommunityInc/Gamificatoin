import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Link } from 'react-router-dom';
import * as routes from '../constants/Routes';

const propTypes = {
  mateList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  tagList: null,
};

const Classmates = ({
  mateList,
  tagList,
}) => (
  <section className="Classmates Classmates--inline">
    <Link to={routes.CLASSMATES_PAGE} className="Container__title Container__title-forward">Мой класс</Link>
    <div className="Classmates__container">
      <div className="tag-list">
        {tagList && tagList.map(tag => (
          <span key={uid()} className="tag-list__item">{tag}</span>
        ))}
      </div>
      <div className="Classmates__toggle">
        <span />
      </div>
      <div className="mates">
        {mateList.map(({ id, photo }) => (
          <Link
            key={uid()}
            to={`/user/${id}`}
            className="mates__image"
            style={{ backgroundImage: `url('${photo}')` }}
          />
        ))}
        {/* <span className="mates__count">+ 25 человек</span> */}
      </div>
    </div>
  </section>
);

Classmates.propTypes = propTypes;
Classmates.defaultProps = defaultProps;

export default Classmates;
