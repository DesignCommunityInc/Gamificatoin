import * as types from '../../../../constants/ActionTypes';
import API, { handleErrors } from '../../../../utils/API';

export default () => {
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
        dispatch(success(response.data));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};
