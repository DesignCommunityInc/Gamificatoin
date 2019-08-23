/* eslint-disable camelcase */
import * as types from '../../constants/ActionTypes';
import API, { handleErrors } from '../../utils/API';

export async function saveUserSettigs({
  S_hidden,
  S_hints,
  nickname = null,
  S_favorite_subject = null,
}) {
  try {
    console.log(
      S_hidden,
      S_hints,
      nickname,
    );
    await API.put('/user/settings', {
      S_hidden,
      S_hints,
      S_favorite_subject,
      nickname,
    }).then((res) => {
      console.log(res);
    });
  } catch (e) {
    handleErrors(e);
  }
}

export const toggleLockSettings = params => (dispatch) => {
  saveUserSettigs(params).then(() => dispatch({
    type: types.SETTINGS_LOCK_TOGGLE,
  }));
};

export const toggleHelpersSettings = params => (dispatch) => {
  saveUserSettigs(params).then(() => dispatch({
    type: types.SETTINGS_HELPERS_TOGGLE,
  }));
};

export const setUserNickName = data => dispatch => dispatch({
  type: types.SET_SETTINGS_NICKNAME,
  payload: { data },
});

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
          nickname,
        } = response.data;
        dispatch(setHelpers(hints));
        dispatch(setLock(hidden));
        dispatch(setUserNickName(nickname));
      });
    } catch (e) {
      handleErrors(e);
    }
  };
};
