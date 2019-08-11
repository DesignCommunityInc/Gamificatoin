import * as types from '../../constants/ActionTypes';
import API, { handleErrors } from '../../utils/API';

export default () => {
  const start = () => dispatch => dispatch({
    type: types.FETCH_LAST_TEACHER_GAME_START,
  });
  const success = data => dispatch => dispatch({
    type: types.FETCH_LAST_TEACHER_GAME_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    try {
      dispatch(start());
      await API.get('/games/teacher?info=last').then((response) => {
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};
