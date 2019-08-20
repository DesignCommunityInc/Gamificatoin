import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './Session';
import settings from './Settings';
import gamelist from './Games/Gamelist';
import gamepreview from './Games/GamePreview';
import gameInside from './Games/GameInside';
import answers from './Games/Answer';
import lastGame from './Teacher/LastGame';
import timer from './Games/Timer';
import achievements from './Achievements';
import gameEditor from './Teacher/GameEditior';
import userView from './UserView';

export default history => combineReducers({
  router: connectRouter(history),
  achievements,
  gamepreview,
  gameEditor,
  gameInside,
  lastGame,
  gamelist,
  settings,
  answers,
  session,
  timer,
  userView,
});
