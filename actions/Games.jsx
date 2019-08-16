import * as types from '../constants/ActionTypes';
import API, { handleErrors } from '../utils/API';
// USER'S GAME LIST
export function fetchUserGames() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/games').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}
// USER'S SHORT GAME LIST
export function fetchUserGamesShort() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_SHORT_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_SHORT_SUCCESS,
    payload: { data },
  });
  const error = () => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_SHORT_FAILURE,
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/games?info=short').then((response) => {
        if (response.status === 200) {
          dispatch(success(response.data));
          return;
        }
        dispatch(error());
      });
    } catch (e) {
      handleErrors(e);
    }
  };
}
// TEACHER`s SHORT GAME LIST
export function fetchTeacherGamesShort() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_TEACHER_GAMES_SHORT_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_TEACHER_GAMES_SHORT_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/games/teacher?info=short').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}
// TEACHER'S GAME LIST
export function fetchTeacherGames() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_TEACHER_GAMES_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_TEACHER_GAMES_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/games/teacher').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}
// TEACHER GAME PREVIEW
export function fetchTeacherGamePreview(id) {
  const start = () => dispatch => dispatch({
    type: types.FETCH_TEACHER_GAME_PREVIEW_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_TEACHER_GAME_PREVIEW_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/game/${id}/view`).then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}
// PREVIEW
export function fetchGamePreview(id) {
  const start = () => dispatch => dispatch({
    type: types.FETCH_GAME_PREVIEW_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_GAME_PREVIEW_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get(`/game/${id}`).then(response => dispatch(success(response.data)));
      const img = 'https://blog.schoolspecialty.com/wp-content/uploads/2017/04/How-to-Help-Your-Students-Overcome-Math-Anxiety-1200x624.jpg';
      const game = {
        img,
        results: 43,
        name: 'География',
        difficulty: 2,
        questions: 21,
        time: 45,
        experience: 1200,
      };
      dispatch(success(game));
    } catch (e) {
      handleErrors(e);
    }
  };
}
// GAME LIST
export function fetchGameList() {
  const start = () => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_USER_GAMES_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    dispatch(start());
    try {
      await API.get('/games').then(response => dispatch(success(response.data)));
    } catch (e) {
      handleErrors(e);
    }
  };
}
