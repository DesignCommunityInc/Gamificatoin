import * as types from '../../constants/ActionTypes';

const initialState = {
  timer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TIMER:
      return {
        ...state,
        timer: action.payload.timer,
      };
    default:
      return state;
  }
};
