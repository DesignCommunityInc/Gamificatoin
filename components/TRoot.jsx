import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import UserPage from './UserPage';
import * as routes from '../constants/Routes';


const TRoot = () => (
  <Route render={({ location }) => (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={450}
        classNames="fade"
      >
        <Switch location={location}>
          <Route exact path={routes.ROOT} component={UserPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )}
  />
);

export default TRoot;
