import * as types from '../constants/ActionTypes';
import API, { handleErrors } from '../utils/API';

// ACHIEVEMENTS SHORT
export function fetchAchievementsShort() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_SHORT_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_ACHIEVEMENTS_SHORT_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/achievements?info=short').then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}
// ACHIEVEMENTS

// ACHIEVEMENTS SPECIAL
export function fetchMainAchievements() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_SPECIAL_ACHIEVEMENTS_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_SPECIAL_ACHIEVEMENTS_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/achievements?info=main').then((response) => {
        console.log(response);
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}
