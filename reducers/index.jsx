import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './Session';
import settings from './Settings';
import gamelist from './Games/Gamelist';
import gamepreview from './Games/GamePreview';
import gameInside from './Games/GameInside';
import answers from './Games/Answer';
import lastGame from './Teacher/LastGame';
import achievements, { specialAchievements } from './Achievements';

export default history => combineReducers({
  router: connectRouter(history),
  specialAchievements,
  achievements,
  gamepreview,
  gameInside,
  gamelist,
  settings,
  answers,
  session,
  lastGame,
});
