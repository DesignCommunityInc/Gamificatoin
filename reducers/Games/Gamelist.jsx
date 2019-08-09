import * as types from "../../constants/ActionTypes";

const initialData = {
  completed: {
    data: [],
  },
  recommendation: {
    data: [],
  },
  invites: {
    data: [],
  }
}
const initialState = {
  data: initialData,
  shortData: [],
  isDataLoading: true,
  isShortDataLoading: true,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_GAMES_START:
      return {
        ...state,
        data: initialData,
        isDataLoading: true,
      }
    case types.FETCH_USER_GAMES_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isDataLoading: false,
      }
    case types.FETCH_USER_GAMES_SHORT_START:
      return {
        ...state,
        shortData: [],
        isShortDataLoading: true,
      }
    case types.FETCH_USER_GAMES_SHORT_SUCCESS:
      return {
        ...state,
        shortData: action.payload.data,
        isShortDataLoading: false,
      }
    case types.FETCH_TEACHER_GAMES_SHORT_START:
        return {
          ...state,
          shortData: [],
          isShortDataLoading: true,
        }
    case types.FETCH_TEACHER_GAMES_SHORT_SUCCESS:
      return {
        ...state,
        shortData: action.payload.data,
        isShortDataLoading: false,
      }
    default:
      return state
  }
}
