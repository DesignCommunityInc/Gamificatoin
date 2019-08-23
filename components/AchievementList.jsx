import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Link } from 'react-router-dom';
import Achievement from './Achievement';

const propTypes = {
  achievements: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  details: PropTypes.bool,
};
const defaultProps = {
  details: true,
};

const AchievementList = ({
  achievements: {
    data,
    count,
  } = {},
  isLoading,
  details,
}) => (isLoading ? (
  <section className="Achievements Container">
    <div to="/achievements" className="Container__title Container__title-forward Container__title-loading" />
    <div className="Achievements__container">
      {[...Array(8)].map(() => (
        <Achievement
          isLoading
          key={uid()}
        />
      ))}
      {details && (
        <div role="button" className="button button-info button-forward">
          Эти и еще много достижений, которые Вы можете открыть, ждут Вас!
        </div>
      )}
    </div>
  </section>
) : (
  <section className="Achievements Container">
    {details && <Link to="/achievements" className="Container__title Container__title-forward">Мои достижения</Link>}
    {!details && <div className="Container__title Container__title-forward">Достижения</div>}
    <div className="Achievements__container">
      {data.map(achievement => (
        <Achievement
          key={uid()}
          {...achievement}
          isLoading={isLoading}
        />
      ))}
      {(details && count) && (
        <Link
          to="/achievements"
          role="button"
          className="button button-info button-forward"
        >
          {`Эти и еще ${count} достижений, которые Вы можете открыть, ждут Вас!`}
        </Link>
      )}
    </div>
  </section>
));


AchievementList.propTypes = propTypes;
AchievementList.defaultProps = defaultProps;

export default AchievementList;
