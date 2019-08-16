import * as types from '../../constants/ActionTypes';
import API, { handleErrors } from '../../utils/API';

export const toggleLockSettings = () => dispatch => dispatch({
  type: types.SETTINGS_LOCK_TOGGLE,
});

export const toggleHelpersSettings = () => dispatch => dispatch({
  type: types.SETTINGS_HELPERS_TOGGLE,
});

export const saveUserSettigs = (params) => {
  const toggleScreen = () => dispatch => dispatch({
    type: types.SETTINGS_SCREEN_TOGGLE,
  });
  return async (dispatch) => {
    try {
      await API.put('/user/settings', params).then(() => {
        dispatch(toggleScreen());
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};

export const getUserSettigs = () => {
  const setHelpers = enabled => dispatch => dispatch({
    type: types.SETTINGS_HELPERS_TOGGLE,
    payload: { data: enabled === 1 },
  });
  const setLock = locked => dispatch => dispatch({
    type: types.SETTINGS_LOCK_TOGGLE,
    payload: { data: locked === 1 },
  });
  return async (dispatch) => {
    try {
      await API.get('/user/settings').then((response) => {
        const {
          S_hints: hints,
          S_hidden: hidden,
        } = response.data;
        dispatch(setHelpers(hints));
        dispatch(setLock(hidden));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};
