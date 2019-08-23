import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import UserPage from '../_pages/UserPage';
import TeacherPage from '../_pages/TeacherPage';
import TeacherGamePage from '../_pages/TeacherGamePage';
import TeacherGameSettingsPage from '../_pages/TeacherGameSettingsPage';
import AchievementsPage from '../_pages/AchievementPage';
import GamePreview from '../_pages/GamePreview';
import GamePage from '../_pages/GamePage';
import GameInside from '../_pages/GameInside';
import CreatingPage from '../_pages/CreatingPage';
import UserViewPage from '../_pages/UserViewPage';
import Classmates from '../_pages/ClassmatesPage';
import * as routes from '../../constants/Routes';

const propTypes = {
  restore: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  fetchClassmates: PropTypes.func.isRequired,
};

class Root extends React.Component {
  constructor() {
    super();
    this.role = JSON.parse(localStorage.getItem('User')).role;
    // this.role = '6';
  }

  componentDidMount() {
    const {
      restore,
      fetchUserProfile,
      fetchClassmates,
    } = this.props;
    fetchUserProfile();
    fetchClassmates();
    if (this.role !== '5') return; // 5 === ученик
    const game = JSON.parse(localStorage.getItem('game'));
    const timer = JSON.parse(localStorage.getItem('timer'));
    if (game) {
      restore(game, timer);
    }
  }

  switchRender() {
    switch (this.role) {
      case '6': return (
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location}>
                <Route exact path={routes.ROOT} component={TeacherPage} />
                <Route exact path={routes.GAME_LIST_PAGE} component={TeacherGamePage} />
                <Route exact path={routes.GAME_PREVIEW_PAGE} component={TeacherGameSettingsPage} />
                <Route exact path={routes.GAME_CREATING_PAGE} component={CreatingPage} />
                <Route exact path={routes.USER_VIEW_PAGE} component={UserViewPage} />
                <Route exact path={routes.CLASSMATES_PAGE} component={Classmates} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
        />
      );
      default: return (
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location}>
                <Route exact path={routes.ROOT} component={UserPage} />
                <Route exact path={routes.ACHIEVEMENT_PAGE} component={AchievementsPage} />
                <Route exact path={routes.GAME_PREVIEW_PAGE} component={GamePreview} />
                <Route exact path={routes.GAME_PLAYING_PAGE} component={GameInside} />
                <Route exact path={routes.GAME_LIST_PAGE} component={GamePage} />
                <Route exact path={routes.GAME_CREATING_PAGE} component={CreatingPage} />
                <Route exact path={routes.USER_VIEW_PAGE} component={UserViewPage} />
                <Route exact path={routes.CLASSMATES_PAGE} component={Classmates} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
        />
      );
    }
  }

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" />
        {this.switchRender()}
      </>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
