import * as types from '../constants/ActionTypes';

const initialState = {
  data: {},
  isLoading: true,
  classmates: [],
  isClassmatesLoading: true,
  shortAchievements: {
    data: [],
  },
  isShortAchievementsLoading: true,
  rate: 0,
  isRateLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE_START:
      return {
        ...state,
      };
    case types.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload.userData,
        isLoading: false,
      };
    case types.FETCH_USER_CLASSMATES_SHORT_START:
      return {
        ...state,
        classmates: [],
        isClassmatesLoading: true,
      };
    case types.FETCH_USER_CLASSMATES_SHORT_SUCCESS:
      return {
        ...state,
        classmates: action.payload.data,
        isClassmatesLoading: false,
      };
    case types.FETCH_USER_ACHIEVEMENTS_SHORT_START:
      return {
        ...state,
        shortAchievements: {
          data: [],
        },
        isShortAchievementsLoading: true,
      };
    case types.FETCH_USER_ACHIEVEMENTS_SHORT_SUCCESS:
      return {
        ...state,
        shortAchievements: action.payload.data,
        isShortAchievementsLoading: false,
      };
    case types.FETCH_USER_RATE_START:
      return {
        ...state,
        rate: 0,
        isRateLoading: true,
      };
    case types.FETCH_USER_RATE_SUCCESS:
      return {
        ...state,
        rate: action.payload.data,
        isRateLoading: false,
      };
    default:
      return state;
  }
};
