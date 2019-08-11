import * as types from '../../constants/ActionTypes';

export default timer => dispatch => dispatch({
  type: types.SET_TIMER,
  payload: { timer },
});
