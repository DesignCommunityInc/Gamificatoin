import * as types from '../constants/ActionTypes'
import API, { handleErrors } from "../utils/API";

export function fetchUserProfile() {
  const start = () => {
    return dispatch => {
      dispatch({ type: types.FETCH_USER_PROFILE_START })
    }
  }
  const success = userData => {
    return dispatch => {
      dispatch({
        type: types.FETCH_USER_PROFILE_SUCCESS,
        payload: { userData },
      });
    }
  }
  return async dispatch => {
    dispatch(start());
    try {
      await API.get('/user')
      .then(response => 
        dispatch(success(response.data))
      )
    }
    catch (e) {
      handleErrors(e);
    };
  };
};
