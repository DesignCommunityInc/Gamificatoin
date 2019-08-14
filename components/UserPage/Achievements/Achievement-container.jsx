import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Link } from 'react-router-dom';
import Achievement from '../../Achievement';

const propTypes = {
  achievements: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchAchievementsShort: PropTypes.func.isRequired,
};

class AchievementContainer extends React.Component {
  componentDidMount() {
    const { fetchAchievementsShort } = this.props;
    fetchAchievementsShort();
  }

  render() {
    const {
      achievements: {
        data,
        count,
      } = {},
      isLoading,
    } = this.props;
    console.log(data);
    if (isLoading) {
      return (
        <section className="Achievements Container">
          <div to="/achievements" className="Container__title Container__title-forward Container__title-loading" />
          <div className="Achievements__container">
            {[...Array(8)].map(() => (
              <Achievement
                isLoading
                key={uid()}
              />
            ))}
            <div role="button" className="button button-info button-forward">
              Эти и еще много достижений, которые Вы можете открыть, ждут Вас!
            </div>
          </div>
        </section>
      );
    }
    return (
      <section className="Achievements Container">
        <Link to="/achievements" className="Container__title Container__title-forward">Мои достижения</Link>
        <div className="Achievements__container">
          {data.map(achievement => (
            <Achievement
              key={uid()}
              {...achievement}
              isLoading={isLoading}
            />
          ))}
          <Link
            to="/achievements"
            role="button"
            className="button button-info button-forward"
          >
            {`Эти и еще ${count} достижений, которые Вы можете открыть, ждут Вас!`}
          </Link>
        </div>
      </section>
    );
  }
}


AchievementContainer.propTypes = propTypes;
// AchievementContainer.defaultProps = defaultProps;

export default AchievementContainer;
