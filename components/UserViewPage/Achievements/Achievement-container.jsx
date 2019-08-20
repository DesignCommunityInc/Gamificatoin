import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import { Link, withRouter } from 'react-router-dom';
import Achievement from '../../Achievement';

const propTypes = {
  achievements: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchAchievementsShort: PropTypes.func.isRequired,
};

class AchievementContainer extends React.Component {
  componentDidMount() {
    const { 
      fetchAchievementsShort, 
      match: {
        params: { id },
      } = {},
    } = this.props; 
    fetchAchievementsShort(id);
  }

  // render (){
  //   return <></>
  // }

  render() {
    const {
      achievements = {},
      isLoading,
    } = this.props;
    if (isLoading) {
      return (
        <section className="Achievements Container">
          <div to="/" className="Container__title Container__title-forward Container__title-loading" />
          <div className="Achievements__container">
            {[...Array(8)].map(() => (
              <Achievement
                isLoading
                key={uid()}
              />
            ))}
          </div>
        </section>
      );
    }
    return (
      <section className="Achievements Container">
        <Link to="/" className="Container__title Container__title-forward">Достижения пользователя</Link>
        <div className="Achievements__container">
          {achievements.map(achievement => (
            <Achievement
              key={uid()}
              {...achievement}
              isLoading={isLoading}
            />
          ))}
        </div>
      </section>
    );
  }
}


AchievementContainer.propTypes = propTypes;
// AchievementContainer.defaultProps = defaultProps;

export default withRouter(props => <AchievementContainer {...props} />) ;
