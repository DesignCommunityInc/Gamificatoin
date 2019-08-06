import * as types from '../../constants/ActionTypes';
import API, { handleErrors } from '../../utils/API';

export const toggleLockSettings = () => dispatch => dispatch({
  type: types.SETTINGS_LOCK_TOGGLE,
});

export const toggleHelpersSettings = hintsEnabled => async (dispatch) => {
  try {
    await API.put('/user/settings', {
      S_hints: !hintsEnabled,
    }).then((response) => {
      console.log(response);
      dispatch({ type: types.SETTINGS_HELPERS_TOGGLE });
    });
  } catch (e) {
    handleErrors(e);
  }
};
