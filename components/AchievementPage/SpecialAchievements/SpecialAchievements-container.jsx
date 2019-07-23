import React from 'react'
// import { PropTypes } from "prop-types";
import Achievement from './SpecialAchievements-view';
import { Link } from 'react-router-dom';

class SpecialAchievementsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchSpecialAchievements();
  }
  render() {
    const { data, isLoading, error } = this.props; 
    const { last, progress } = data;
    if(isLoading) return (
      <div>Loading...</div>
    );
    if(error) return (
      <div>Error: {`${error}`}</div>
    );
    return (
      <section className="Achievements Container">
        <Link to="/" className="Container__title Container__title-backward">Мои достижения</Link> 
        <div className="Achievements__container Achievements__container-last" data-attr="Последнее полученное достижение">
          <Achievement 
            key={last.id}
            title={last.name}
            description={last.description}
            reward={last.reward}
            progress={last.progress}
          />
        </div>
        <div className="Achievements__container Achievements__container-progress" data-attr="Достижения с прогрессом">
          {progress.map((item, idx) =>
            <Achievement
              key={idx}
              title={item.name}
              description={item.description}
              reward={item.reward}
              progress={item.progress}
            />
          )}
        </div>
      </section>
    )
  }
}


// AchievementContainer.propTypes = propTypes;
// AchievementContainer.defaultTypes = defaultTypes;

export default SpecialAchievementsContainer;
