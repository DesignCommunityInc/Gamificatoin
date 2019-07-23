import * as types from "../constants/ActionTypes";

const initialState = {
  data: [],
  shortData: {
    data: [],
  },
  isLoading: false,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACHIEVEMENTS_START:
      return {
        ...state,
        data: [],
        isLoading: true,
      }
    case types.FETCH_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        isLoading: false,
      }
    case types.FETCH_ACHIEVEMENTS_SHORT_START:
      return {
        ...state,
        shortData: {
          data: []
        },
        isLoading: true,
      }
    case types.FETCH_ACHIEVEMENTS_SHORT_SUCCESS:
      return {
        ...state,
        shortData: action.payload.data,
        isLoading: false,
      }
    default:
      return state
  }
}

const specialInitialState = {
  data: {
    last: {},
    progress: [],
  },
  isLoading: false,
}
export function specialAchievements(state = specialInitialState, action) {
  switch(action.type) {
    case types.FETCH_SPECIAL_ACHIEVEMENTS_START:
      return {
        ...state,
          data: {
            last: {},
            progress: [],
          },
          isLoading: true,
      }
    case types.FETCH_SPECIAL_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      }
    default:
      return state
  }
}