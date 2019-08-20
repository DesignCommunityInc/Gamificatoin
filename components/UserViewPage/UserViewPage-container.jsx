import React from 'react';
import PropTypes from 'prop-types';
import UserContainer from './UserContainer';
import Header from '../Header';
import Settings from '../Settings';
import Utils from '../../utils/Utils';
import Achievements from './Achievements';

const propTypes = {
  fetchUserView: PropTypes.func.isRequired,
};

const defaultProps = {
  gamesError: false,
};

class UserPage extends React.Component {
  componentDidMount() {
    const { 
      fetchUserView,
      match: {
        params: { id },
      } = {},
    } = this.props;
    fetchUserView(id);
    Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      data: {
        level,
        middle_name,
        name,
        nickname,
        second_name,
        hidden,
        achievements_count,
      } = {},
    } = this.props;
    console.log(hidden);
    if(!hidden){
      return (
        <main className="page">
          <Header
            title="Пользователь"
          />
          <Settings />
          <UserContainer
            level={level}
            middle_name={middle_name}
            name={name}
            second_name={second_name}
            achievements_count={achievements_count}
          />
          <Achievements />
        </main>
      );
    }
      return (
        <main className="page">
          <Header
            title="Пользователь"
          />
          <Settings />
          <UserContainer 
            level={level}
            middle_name={middle_name}
            name={name}
            second_name={second_name}
            achievements_count={achievements_count}
          />
        </main>
      );

  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
