import * as types from "../../constants/ActionTypes";

const initialState = {
  data: {
    subjects: [],
    questions: [],
  },
  isDataLoading: true,
}
export default (state = initialState, action) => {
  switch (action.type) {
    // case types.GAME_UNMOUNT:
    //   return {
    //     ...state,
    //     data: {},
    //     isLoading: true,
    //   }
    case types.FETCH_GAME_PLAY_START:
      return {
        ...state,
        data: {},
        isLoading: true,
      }
    case types.FETCH_GAME_PLAY_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      }
    case types.CHOOSE_GAME_CATEGORY:
      return {
        ...state,
        choosenCategory: action.payload.category,
      }
    default: {
      return state
    }
  }
}
