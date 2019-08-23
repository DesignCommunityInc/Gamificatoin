import * as types from '../constants/ActionTypes';

const initialState = {
  data: {},
  isLoading: true,
  achievements: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_VIEW_START:
      return {
        ...state,
        data: {},
        isLoading: true,
      };
    case types.FETCH_USER_VIEW_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case types.FETCH_USER_VIEW_ACHIEVEMENTS_START:
      return {
        ...state,
        achievements: [],
      };
    case types.FETCH_USER_VIEW_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        achievements: action.payload.data,
      };
    default:
      return state;
  }
};
