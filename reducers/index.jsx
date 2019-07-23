import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './Session';
import settings from './Settings';
import gamelist from './Games/Gamelist';
import gamepreview from './Games/GamePreview';
import gameInside from './Games/GameInside';
import achievements, { specialAchievements } from './Achievements';

export default (history) => combineReducers({
    router: connectRouter(history),
    session,
    settings,
    achievements,
    specialAchievements,
    gamelist,
    gamepreview,
    gameInside,
});
