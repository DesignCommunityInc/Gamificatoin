import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const ExtraContent = ({
  isLoading,
  title,
  value,
}) => (isLoading ? (
  <div />
) : (
  <div className="ViewPage__main__extra__content__line">
    <p className="ViewPage__main__extra__content__line__title">{title}</p>
    <p className="ViewPage__main__extra__content__line__value">{value}</p>
  </div>
));


ExtraContent.propTypes = propTypes;

export default ExtraContent;
