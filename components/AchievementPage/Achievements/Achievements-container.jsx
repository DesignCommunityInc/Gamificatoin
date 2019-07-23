import React from 'react'
// import { PropTypes } from "prop-types";
import Achievement from '../../Achievement';
import Filter from '../../Filter';
import Preloader from '../../Preloader';
import Utils from '../../../utils/Utils';


class AchievementsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      isPreloaderActive: true,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    this.props.fetchAchievements();
  }
  handleScroll() {
    let processed = false;
    const scroll = () => {
      if(processed) return false;
        let elementInView = Utils.isElementInView(this.preloader.container, this.scroller, false);
      if(this.scroller && elementInView) {
        processed = true;
        this.props.fetchAchievements()
        .then((stop) => {
          if(stop) {
            this.setState({ isPreloaderActive: false });
          }
        })
      };
    }
    scroll();
  }
  render() {
    const { achievements, isLoading, error } = this.props; 
    if(isLoading) return (
      <div>Loading...</div>
    );
    if(error) return (
      <div>Error: {`${error}`}</div>
    );
    return (
      <section className="Achievements Container">
        <div className="Container__title">Все достижения</div>
        <Filter />
        <div 
          className="Achievements__container Achievements__container-scroller"
          onScroll={this.handleScroll}
          ref={(scroller) => {
            this.scroller = scroller;
          }}
        >
          {achievements.map((item, idx) =>
            <Achievement
              key={idx}
              title={item.name}
              description={item.description}
              reward={item.reward}
              progress={item.progress}
            />
          )}
          <Preloader 
            isActive={this.state.isPreloaderActive}
            ref={(preloader) => {
              this.preloader = preloader;
            }}
          />
        </div>
      </section>
    )
  }
}


// AchievementsContainer.propTypes = propTypes;
// AchievementsContainer.defaultTypes = defaultTypes;

export default AchievementsContainer;
