import * as types from "../../constants/ActionTypes";

const initialState = {
  data: {},
  isLoading: false,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LAST_TEACHER_GAME_START:
      return {
        ...state,
        data: {},
        isLoading: true,
      }
    case types.FETCH_LAST_TEACHER_GAME_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      }
    default:
      return state
  }
}
