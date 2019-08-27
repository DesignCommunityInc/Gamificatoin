import * as types from '../../../constants/ActionTypes';
import API, { handleErrors } from '../../../utils/API';

export default (id) => {
  const success = data => dispatch => dispatch({
    type: types.FETCH_INVITE_USERS_SUCCESS,
    payload: { data },
  });
  return async (dispatch) => {
    try {
      await API.get(`/games/${id}/invite`).then(response => dispatch(success(response.data)))
    } catch (e) {
      handleErrors(e);
    }
  };
};

export async function invite(gameId, users) {
  try {
    await API.post(`/games/${gameId}/invite`, { users });
  } catch (e) {
    handleErrors(e);
  }
}
