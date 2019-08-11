import * as types from '../../constants/ActionTypes';

const initialState = {
  data: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GAME_PREVIEW_START:
      return {
        ...state,
        data: {},
        isLoading: true,
      };
    case types.FETCH_GAME_PREVIEW_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    default:
      return state;
  }
};
