import React from 'react';
import PropTypes from 'prop-types';
import Achievements from './Achievements';
import Level from './Level';
import Gamelist from '../Gamelist';
import Classmates from '../../containers/ClassmatesContainer';
import Rate from '../../containers/RateContainer';
import Header from '../Header';
import Settings from '../Settings';
import Utils from '../../utils/Utils';

const propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  IsGamesLoading: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  gamesError: PropTypes.bool,
  fetchUserProfile: PropTypes.func.isRequired,
  fetchUserGamesShort: PropTypes.func.isRequired,
};

const defaultProps = {
  gamesError: false,
};

class UserPage extends React.Component {
  componentDidMount() {
    const {
      fetchUserGamesShort,
      fetchUserProfile,
    } = this.props;
    fetchUserGamesShort();
    fetchUserProfile();
    Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      games,
      IsGamesLoading,
      userData,
      isUserLoading,
      gamesError,
    } = this.props;
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
        <Achievements />
        <section className="Container">
          <Rate
            isLoading={isUserLoading}
            data={userData}
          />
          <Classmates />
        </section>
      </main>
    );
  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
