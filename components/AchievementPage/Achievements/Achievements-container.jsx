import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Achievement from '../../Achievement';
import Filter from '../../Filter';
import Preloader from '../../Preloader';
import Utils from '../../../utils/Utils';

const propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  sort: PropTypes.shape({}).isRequired,
  fetchAchievements: PropTypes.func.isRequired,
  filterToggler: PropTypes.func.isRequired,
  sortChooser: PropTypes.func.isRequired,
};
const defaultProps = {
  // achievements: [],
};

class AchievementsContainer extends React.Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    this.applyFilter();
    this.handleScroll();
  }

  // componentDidUpdate(previousProps) {
  //   const { achievements } = this.props;
  //   if (previousProps.achievements !== achievements) {
  //     this.processing = false;
  //     console.log(achievements);
  //   }
  // }

  handleScroll() {
    const {
      fetchAchievements,
      filter,
      sort,
      page,
    } = this.props;
    const scroll = () => {
      const elementInView = Utils.isElementInView(this.preloader.container, this.scroller, false);
      if (this.scroller && elementInView && !this.processing) {
        this.processing = true;
        fetchAchievements({ page, filter, sort }).then(() => {
          this.processing = false;
        });
      }
    };
    scroll();
  }

  applyFilter() {
    const {
      fetchAchievements,
      filter,
      sort,
      page,
    } = this.props;
    fetchAchievements({ page, filter, sort });
  }

  render() {
    const {
      achievements,
      isLoading,
      filter,
      sort,
      filterToggler,
      sortChooser,
    } = this.props;
    return (
      <section className="Achievements Container">
        <div className="Container__title">Все достижения</div>
        <Filter
          sort={sort}
          sortAction={sortChooser}
          sortFields={['id', 'exp_add', 'progress']}
          filter={filter}
          filterAction={filterToggler}
          filterFields={['performed', 'with exp', 'without exp']}
          apply={this.applyFilter}
        />
        <div
          className="Achievements__container Achievements__container-scroller"
          onScroll={this.handleScroll}
          ref={(scroller) => {
            this.scroller = scroller;
          }}
        >
          {achievements.map(achievement => (
            <Achievement
              key={uid()}
              {...achievement}
            />
          ))}
          <Preloader
            isActive={isLoading}
            ref={(preloader) => {
              this.preloader = preloader;
            }}
          />
        </div>
      </section>
    );
  }
}


AchievementsContainer.propTypes = propTypes;
AchievementsContainer.defaultProps = defaultProps;

export default AchievementsContainer;
