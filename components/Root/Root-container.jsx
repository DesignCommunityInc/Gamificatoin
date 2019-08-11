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
import AchievementsPage from '../AchievementPage';
import GamePreview from '../GamePreview';
import GamePage from '../GamePage';
import * as routes from '../../constants/Routes';
import GameInside from '../GameInside';
import CreatingPage from '../CreatingPage';

const propTypes = {
  restore: PropTypes.func.isRequired,
};

class Root extends React.Component {
  constructor() {
    super();
    this.role = 6;
  }

  componentDidMount() {
    if (this.role !== 5) return;
    const { restore } = this.props;
    const game = JSON.parse(localStorage.getItem('game'));
    if (game) {
      restore(game);
    }
  }

  switchRender() {
    switch (this.role) {
      case 6: return (
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location}>
                <Route exact path={routes.ROOT} component={TeacherPage} />
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
      <>{this.switchRender()}</>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
