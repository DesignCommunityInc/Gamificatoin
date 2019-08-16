/* eslint-disable camelcase */
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
  error: PropTypes.bool.isRequired,
  desc: PropTypes.bool.isRequired,
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  sort: PropTypes.string.isRequired,
  fetchAchievements: PropTypes.func.isRequired,
  clearAchievements: PropTypes.func.isRequired,
  filterToggler: PropTypes.func.isRequired,
  sortChooser: PropTypes.func.isRequired,
  toggleSortDirection: PropTypes.func.isRequired,
};
const defaultProps = {
};

class AchievementsContainer extends React.Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    const { sortChooser, filterToggler, filter } = this.props;
    filterToggler('with exp', filter);
    sortChooser('id', true);
    this.applyFilter();
  }

  handleScroll() {
    const {
      fetchAchievements,
      error,
      filter,
      sort,
      page,
      desc,
    } = this.props;
    const elementInView = Utils.isElementInView(this.preloader.container, this.scroller, false);
    if (this.scroller && elementInView && !this.processing && !error) {
      this.processing = true;
      fetchAchievements({
        page,
        filter,
        sort,
        desc,
      }).then(() => {
        this.processing = false;
      });
    }
    return elementInView || error;
  }

  applyFilter() {
    const { clearAchievements } = this.props;
    clearAchievements();
    this.handleScroll();
  }

  render() {
    const {
      achievements,
      isLoading,
      filter,
      sort,
      desc,
      filterToggler,
      sortChooser,
      toggleSortDirection,
    } = this.props;
    return (
      <section className="Achievements Container">
        <div className="Container__title">Все достижения</div>
        <Filter
          sort={sort}
          sortAction={sortChooser}
          sortFields={[
            { id: 'Порядок' },
            { exp_add: 'Опыт' },
            { progress: 'Прогресс' },
          ]}
          filter={filter}
          filterAction={filterToggler}
          filterFields={[
            { performed: 'Полученные' },
            { 'with exp': 'С прогрессом' },
            { 'without exp': 'Без прогресса' },
          ]}
          desc={desc}
          descToggler={toggleSortDirection}
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
