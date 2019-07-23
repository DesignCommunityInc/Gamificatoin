import React from 'react';
// import { PropTypes } from "prop-types";
import Achievement from '../../Achievement';
import { Link } from 'react-router-dom';


class AchievementContainer extends React.Component {
  componentDidMount() {
    this.props.fetchAchievementsShort();
  }
  render() {
    const { achievements, count, isLoading } = this.props;
    if(isLoading) return (
      <section className="Achievements Container">
        <Link to="/achievements" className="Container__title Container__title-forward Container__title-loading"></Link>
        <div className="Achievements__container">
          {[...Array(8)].map((_, idx) =>
            <Achievement 
              isLoading
              key={idx} 
            />
          )}
          <div role="button" className="button button-info button-forward">
            Эти и еще {count} достижений, которые Вы можете открыть, ждут Вас!
          </div>
        </div>
      </section>
    );
    return(
      <section className="Achievements Container">
      <Link to="/achievements" className="Container__title Container__title-forward">Мои достижения</Link>
        <div className="Achievements__container">
          {achievements.map((achievement, idx) =>
            <Achievement
              key={idx} 
              title={achievement.name}
              description={achievement.description}
              reward={achievement.reward}
              progress={achievement.progress}
            />
          )}
          <div role="button" className="button button-info button-forward">
            Эти и еще {count} достижений, которые Вы можете открыть, ждут Вас!
          </div>
        </div>
      </section>
    )
  }
}


// AchievementContainer.propTypes = propTypes;
// AchievementContainer.defaultTypes = defaultTypes;

export default AchievementContainer;