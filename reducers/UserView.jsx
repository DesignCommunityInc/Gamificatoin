// import * as types from '../../constants/ActionTypes';

const initialState = {
  data: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_VIEW_START":
      return {
        ...state,
        data: {},
        isLoading: true,
      };
    case "USER_VIEW_SUCCESS":
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    default:
      return state;
  }
};