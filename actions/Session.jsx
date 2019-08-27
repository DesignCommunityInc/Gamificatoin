import * as types from '../constants/ActionTypes';
import API, { handleErrors } from '../utils/API';

export default () => {};

export function fetchUserProfile() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_PROFILE_START,
  });
  const success = userData => dispatch => dispatch({
    type: types.FETCH_USER_PROFILE_SUCCESS,
    payload: { userData },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/user').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}

export function fetchUserClassmatesShort() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_CLASSMATES_SHORT_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_CLASSMATES_SHORT_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/user/students?info=short').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}

export function fetchUserClassmates() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_CLASSMATES_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_CLASSMATES_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/user/students').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}

export function fetchAchievementsShort() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_ACHIEVEMENTS_SHORT_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_ACHIEVEMENTS_SHORT_SUCCESS,
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

export const fetchUserRate = (type) => {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_RATE_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_RATE_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/user/rating?info=${type}`).then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};
