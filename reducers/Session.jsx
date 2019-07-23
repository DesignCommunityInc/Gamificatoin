import * as types from "../constants/ActionTypes";

const initialState = {
  data: {},
  isLoading: false,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE_START:
      return {
        ...state,
        data: {},
        isLoading: true,
      }
    case types.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload.userData,
        isLoading: false,
      }
      
    default:
      return state
  }
}
