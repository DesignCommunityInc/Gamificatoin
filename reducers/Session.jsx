import * as types from "../constants/ActionTypes";

const initialState = {
  data: {},
  isLoading: true,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE_START:
      return {
        ...state,
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
