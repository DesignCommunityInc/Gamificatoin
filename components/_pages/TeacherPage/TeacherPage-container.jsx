import React from 'react';
import PropTypes from 'prop-types';
import Gamelist from '../../Gamelist';
import Classmates from '../../Classmates';
import Rate from '../../../containers/RateContainer';
import Header from '../../Header';
import Settings from '../../Settings';
import LastGame from '../../LastGame';
import Utils from '../../../utils/Utils';
// import API from '../../utils/API';

const propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  IsGamesLoading: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  fetchTeacherGamesShort: PropTypes.func.isRequired,
};

class UserPage extends React.Component {
  componentDidMount() {
    const {
      fetchTeacherGamesShort,
    } = this.props;
    fetchTeacherGamesShort();
    // Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      games,
      IsGamesLoading,
      userData,
      isUserLoading,
      classmates,
      isClassmatesLoading,
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
          <Classmates
            mateList={classmates}
            isLoading={isClassmatesLoading}
          />
        </section>
      </main>
    );
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
