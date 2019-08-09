import React from 'react';
import Achievements from "./Achievements";
import Level from "./Level";
import Gamelist from "../Gamelist";
import Classmates from "../../containers/ClassmatesContainer";
import Rate from "../../containers/RateContainer";
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Utils from "../../utils/Utils";
import PropTypes from "prop-types";
import LastGame from '../LastGame';

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
    // const{ userData: {roles} = {}} = this.props;     // <--
    let roles = 6;                                      //    | НЕ ПОЛУЧАЕТСЯ РОЛЬ
    Utils.scrollTo(document.documentElement, 0, 0);
    switch(roles){
      case 5: 
        this.props.fetchUserGamesShort();
        this.props.fetchUserProfile();  
        break;
      case 6:
        this.props.fetchTeacherGamesShort();
        this.props.fetchUserProfile();  
        break;
    }
  }
  render() {
    const { 
      games,
      IsGamesLoading,
      userData,
      isUserLoading,
    } = this.props;
    const{roles} = userData;
    let role = null;
    if(roles)
    role = parseInt(Object.keys(roles)[0]);
    return (
      <main className="page">
        <Header />
        <Settings />
        {role === 5 ? (
          <Level 
            data={userData}
            isLoading={isUserLoading}
          />
        ) : (
          <LastGame />
        )}
        <Gamelist 
          title="Мои игры"
          list={games}
          isLoading={IsGamesLoading}
        />
        {role === 5 && (
          <Achievements />
        )}
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