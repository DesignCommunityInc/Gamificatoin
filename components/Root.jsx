import React from 'react';
import { 
  Route, 
  Switch 
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import UserPage from './UserPage';
import AchievementsPage from './AchievementPage';
import GamePreview from './GamePreview';
import GamePage from './GamePage';
import * as routes from '../constants/Routes';
import GameInside from './GameInside';
import CreatingPage from './CreatingPage';

const Root = () => (
  <Route render={({location}) => (
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
  )} />
)

export default Root;