import React from 'react';
import PropTypes from 'prop-types';
import Achievements from '../../AchievementList';
import Level from './Level';
import Gamelist from '../../Gamelist';
import Classmates from '../../Classmates';
import Rate from '../../Rate';
import Header from '../../Header';
import Settings from '../../Settings';
// import Utils from '../../../utils/Utils';

const propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  classmates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isClassmatesLoading: PropTypes.bool.isRequired,
  achievements: PropTypes.PropTypes.shape({}).isRequired,
  isAchievementsLoading: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  IsGamesLoading: PropTypes.bool.isRequired,
  gamesError: PropTypes.bool,
  fetchUserProfile: PropTypes.func.isRequired,
  fetchAchievementsShort: PropTypes.func.isRequired,
  fetchUserGamesShort: PropTypes.func.isRequired,
};

const defaultProps = {
  gamesError: false,
};

class UserPage extends React.Component {
  componentDidMount() {
    const {
      fetchUserProfile,
      fetchUserGamesShort,
      fetchAchievementsShort,
    } = this.props;
    fetchUserProfile();
    fetchUserGamesShort();
    fetchAchievementsShort();
    // Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      userData,
      isUserLoading,
      classmates,
      isClassmatesLoading,
      achievements,
      isAchievementsLoading,
      games,
      IsGamesLoading,
      gamesError,
    } = this.props;
    const { class_letter, class_number } = userData;
    return (
      <main className="page">
        <Header />
        <Settings />
        <Level
          data={userData}
          isLoading={isUserLoading}
        />
        <Gamelist
          title="Мои игры"
          list={games}
          isLoading={IsGamesLoading}
          error={gamesError}
        />
        <Achievements
          achievements={achievements}
          isLoading={isAchievementsLoading}
        />
        <section className="Container">
          <Rate
            isLoading={isUserLoading}
            data={userData}
          />
          <Classmates
            mateList={classmates}
            isLoading={isClassmatesLoading}
            tagList={isClassmatesLoading ? [''] : [`${class_number}${class_letter}`]}
          />
        </section>
      </main>
    );
  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
