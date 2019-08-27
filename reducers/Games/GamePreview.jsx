import * as types from '../../constants/ActionTypes';

const initialData = {
  questions: [],
  participants: [],
};

const initialState = {
  data: {},
  teacherData: initialData,
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
    case types.FETCH_TEACHER_GAME_PREVIEW_START:
      return {
        ...state,
        // teacherData: initialData,
        isLoading: true,
      };
    case types.FETCH_TEACHER_GAME_PREVIEW_SUCCESS:
      return {
        ...state,
        teacherData: action.payload.data,
        isLoading: false,
      };
    default:
      return state;
  }
};
