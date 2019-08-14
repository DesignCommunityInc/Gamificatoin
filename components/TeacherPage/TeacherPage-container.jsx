import React from 'react';
import PropTypes from 'prop-types';
import Gamelist from '../Gamelist';
import Classmates from '../../containers/ClassmatesContainer';
import Rate from '../../containers/RateContainer';
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import LastGame from '../LastGame';
import Utils from '../../utils/Utils';
// import API from '../../utils/API';

const propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  IsGamesLoading: PropTypes.bool.isRequired,
  // shortGames: PropTypes.arrayOf(PropTypes.any),
  // IsGamesShortLoading: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  fetchTeacherGamesShort: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
};
const defaultProps = {
  // shortGames: [],
  // IsGamesShortLoading: true,
  // isUserLoading: true,
};

class UserPage extends React.Component {
  componentDidMount() {
    // API.post('/games', {
    //   name: 'test',
    //   class: 2,
    //   description: 'test123',
    //   publicity: 1,
    //   randomize: 1,
    //   type: 1,
    // });
    const {
      fetchTeacherGamesShort,
      fetchUserProfile,
    } = this.props;
    fetchUserProfile();
    fetchTeacherGamesShort();
    Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      games,
      IsGamesLoading,
      userData,
      isUserLoading,
    } = this.props;
    return (
      <main className="page">
        <Header />
        <Settings />
        <LastGame />
        <Gamelist
          title="Мои игры"
          list={games}
          isLoading={IsGamesLoading}
        />
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
UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default UserPage;
