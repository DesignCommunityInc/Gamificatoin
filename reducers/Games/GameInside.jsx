import * as types from "../../constants/ActionTypes";

const initialState = {
  // game data
  data: {},
  isDataLoading: true,
  // categories
  categories: [],
  choosenCategory: null,
  isCategoriesLoading: true,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GAME_CATEGORIES_START:
      return {
        ...state,
        categories: [],
        isCategoriesLoading: true,
        choosenCategory: null,
      }
    case types.FETCH_GAME_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.data,
        isCategoriesLoading: false,
      }

    case types.CHOOSE_GAME_CATEGORY:
      return {
        ...state,
        choosenCategory: action.payload.category,
      }
    default:
      return state
  }
}
