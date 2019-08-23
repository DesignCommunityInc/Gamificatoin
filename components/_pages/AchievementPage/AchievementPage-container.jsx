import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header';
import MainAchievements from './MainAchievements';
import Settings from '../../Settings';
import Achievements from './Achievements';
import Utils from '../../../utils/Utils';

const propTypes = {
  mainAchievements: PropTypes.shape({}).isRequired,
  isMainAchievementsLoading: PropTypes.bool.isRequired,
  fetchMainAchievements: PropTypes.func.isRequired,
};

class AchievementPage extends React.Component {
  componentDidMount() {
    const {
      fetchMainAchievements,
    } = this.props;
    fetchMainAchievements();
    // Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      mainAchievements,
      isMainAchievementsLoading,
    } = this.props;
    return (
      <main className="page">
        <Settings />
        <Header title="Достижения" />
        <MainAchievements
          data={mainAchievements}
          isLoading={isMainAchievementsLoading}
        />
        <Achievements />
      </main>
    );
  }
}

AchievementPage.propTypes = propTypes;

export default AchievementPage;
