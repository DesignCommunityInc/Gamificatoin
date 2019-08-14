import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Achievement from './view';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const SpecialAchievementsContainer = ({
  data: {
    last,
    progress,
  } = {},
  isLoading,
}) => (isLoading ? (
  <section className="Achievements Container">
    <div className="Achievements__container Achievements__container-last" data-attr="Последнее полученное достижение">
      <Achievement
        key={uid()}
        isLoading={isLoading}
      />
    </div>
    <div className="Achievements__container Achievements__container-progress" data-attr="Достижения с прогрессом">
      {[...Array(2)].map(() => (
        <Achievement
          key={uid()}
          isLoading={isLoading}
        />
      ))}
    </div>
  </section>
) : (
  <section className="Achievements Container">
    <div className="Achievements__container Achievements__container-last" data-attr="Последнее полученное достижение">
      <Achievement
        key={uid()}
        {...last}
      />
    </div>
    <div className="Achievements__container Achievements__container-progress" data-attr="Достижения с прогрессом">
      {progress.map(item => (
        <Achievement
          key={uid()}
          {...item}
        />
      ))}
    </div>
  </section>
));


SpecialAchievementsContainer.propTypes = propTypes;

export default SpecialAchievementsContainer;
