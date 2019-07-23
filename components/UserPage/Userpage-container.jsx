import React from 'react';
import Achievements from "./Achievements";
import Level from "./Level";
import Gamelist from "../Gamelist";
import Classmates from "../../containers/ClassmatesContainer";
import Rate from "../../containers/RateContainer";
import Header from '../../containers/HeaderContainer';
import Settings from '../../containers/SettingsContainer';
import Utils from "../../utils/Utils";
import PropTypes from "prop-types";

const propTypes = {
  shortGames: PropTypes.array.isRequired,
  IsGamesShortLoading: PropTypes.bool,
  userData: PropTypes.object.isRequired,
  isUserLoading: PropTypes.bool,
  toggleSettingsScreen: PropTypes.func,
}
const defaultProps = {
  shortGames: [],
  IsGamesShortLoading: true,
  isUserLoading: true,
}
class UserPage extends React.Component {
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
    this.props.fetchUserGamesShort();
    this.props.fetchUserProfile();
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
        <Level 
          data={userData}
          isLoading={isUserLoading}
        />
        <Gamelist 
          title="Мои игры"
          list={games}
          isLoading={IsGamesLoading}
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
    )
  }
}
UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default UserPage;