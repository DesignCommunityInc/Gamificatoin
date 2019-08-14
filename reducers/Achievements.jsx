import * as types from '../constants/ActionTypes';

const initialState = {
  achievements: [],
  page: 1,
  filter: [],
  sort: {},
  shortAchievements: {
    data: [],
  },
  mainAchievements: {
    last: {},
    progress: [],
  },
  isLoading: true,
  isShortAchievementsLoading: true,
  isMainAchievementsLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case types.FETCH_ACHIEVEMENTS_START:
    //   return {
    //     ...state,
    //     // data: [],
    //     // isLoading: true,
    //   };
    case types.FETCH_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        achievements: state.achievements.concat(action.payload.data),
        page: state.page + 1,
        isLoading: true,
      };
    case types.FETCH_ACHIEVEMENTS_FAILURE:
      return {
        ...state,
        achievements: state.achievements.concat(action.payload.data),
        isLoading: false,
      };
    case types.SORT_ACHIEVEMENTS:
      return {
        ...state,
        sort: action.payload.sort,
      };
    case types.FILTER_ACHIEVEMENTS:
      // console.log(action.payload.filter);
      return {
        ...state,
        filter: action.payload.filter,
      };
    case types.FETCH_ACHIEVEMENTS_SHORT_START:
      return {
        ...state,
        shortAchievements: {
          data: [],
        },
        isShortAchievementsLoading: true,
      };
    case types.FETCH_ACHIEVEMENTS_SHORT_SUCCESS:
      return {
        ...state,
        shortAchievements: action.payload.data,
        isShortAchievementsLoading: false,
      };
    case types.FETCH_SPECIAL_ACHIEVEMENTS_START:
      return {
        ...state,
        mainAchievements: {
          last: {},
          progress: [],
        },
        isMainAchievementsLoading: true,
      };
    case types.FETCH_SPECIAL_ACHIEVEMENTS_SUCCESS:
      return {
        ...state,
        mainAchievements: action.payload.data,
        isMainAchievementsLoading: false,
      };
    default:
      return state;
  }
};
