import React from 'react';
import PropTypes from 'prop-types';
import UserContainer from './UserContainer';
import Header from '../../Header';
import Settings from '../../Settings';
import Achievements from '../../AchievementList';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape({}).isRequired,
  achievements: PropTypes.arrayOf(PropTypes.shape({})),
  fetchUserView: PropTypes.func.isRequired,
  fetchUserAchievements: PropTypes.func.isRequired,
};
const defaultProps = {
  achievements: [],
};

class UserPage extends React.Component {
  componentDidMount() {
    const {
      fetchUserView,
      fetchUserAchievements,
      match: {
        params: { id },
      } = {},
    } = this.props;
    fetchUserView(id);
    fetchUserAchievements(id);
    // Utils.scrollTo(document.documentElement, 0, 0);
  }

  render() {
    const {
      data,
      isLoading,
      data: {
        hidden,
        nickname,
      } = {},
      achievements,
    } = this.props;
    if (!hidden) {
      return (
        <main className="page">
          <Header
            title={nickname}
          />
          <Settings />
          <UserContainer
            isLoading={isLoading}
            {...data}
          />
          <Achievements
            achievements={{ data: achievements }}
            isLoading={isLoading}
            details={false}
          />
        </main>
      );
    }
    return (
      <main className="page">
        <Header
          title={nickname}
        />
        <Settings />
        <UserContainer
          isLoading={isLoading}
          {...data}
        />
        <div
          className="Games Container"
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Этот профиль закрыт!
        </div>
        <div
          className="Games Container"
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Вы не можете посмотреть подробную информацию об этом пользователе
        </div>
      </main>
    );
  }
}

UserPage.propTypes = propTypes;
UserPage.defaultProps = defaultProps;

export default UserPage;
