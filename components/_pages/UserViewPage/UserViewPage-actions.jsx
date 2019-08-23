import * as types from '../../../constants/ActionTypes';
import API, { handleErrors } from '../../../utils/API';


export function fetchUserView(id) {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_VIEW_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_VIEW_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/user/${id}`).then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}

export function fetchUserAchievements(id) {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_VIEW_ACHIEVEMENTS_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_VIEW_ACHIEVEMENTS_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/user/${id}/achievements`).then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}
