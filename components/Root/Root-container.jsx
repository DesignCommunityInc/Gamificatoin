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
import UserPage from '../UserPage';
import TeacherPage from '../TeacherPage';
import TeacherGamePage from '../TeacherGamePage';
import TeacherGameSettingsPage from '../TeacherGameSettingsPage';
import TeacherCreatingPage from '../TeacherCreatingPage';
import AchievementsPage from '../AchievementPage';
import GamePreview from '../GamePreview';
import GamePage from '../GamePage';
import * as routes from '../../constants/Routes';
import GameInside from '../GameInside';
import CreatingPage from '../CreatingPage';
import UserViewPage from '../UserViewPage';

const propTypes = {
  restore: PropTypes.func.isRequired,
};

class Root extends React.Component {
  constructor() {
    super();
    // this.role = JSON.parse(localStorage.getItem('User')).role;
    this.role = '6';
  }

  componentDidMount() {
    if (this.role !== 5) return;
    const { restore } = this.props;
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
                <Route exact path={routes.GAME_CREATING_PAGE} component={TeacherCreatingPage} />
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
