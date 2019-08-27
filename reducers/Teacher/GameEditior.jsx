import * as types from '../../constants/ActionTypes';

const initialData = {
  questions: [],
  participants: [],
};
const initialQuestions = {
  questions: [],
};

const initialState = {
  data: initialData,
  isLoading: true,
  questionList: initialQuestions,
  selectedQuestions: [],
  users: {},
  currentPage: 1,
  filterList: {},
  filter: {},
  isQuestionListLoading: true,
  questionListVisibility: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case types.FETCH_TEACHER_GAME_PREVIEW_START:
    //   return {
    //     ...state,
    //     data: initialData,
    //     isLoading: true,
    //   };
    case types.QUESTION_LIST_VISIBILITY_TOGGLE:
      return {
        ...state,
        questionListVisibility: !state.questionListVisibility,
      };
    case types.FETCH_QUESTION_LIST_START:
      return {
        ...state,
        questionList: initialQuestions,
        selectedQuestions: [],
        isQuestionListLoading: true,
        currentPage: action.payload.data,
      };
    case types.FETCH_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        questionList: action.payload.data,
        isQuestionListLoading: false,
      };
    case types.QUESTION_LIST_ADD:
      return {
        ...state,
        selectedQuestions: [...state.selectedQuestions, action.payload.data],
      };
    case types.QUESTION_LIST_REMOVE:
      return {
        ...state,
        selectedQuestions: [
          ...state.selectedQuestions.slice(0, action.payload.data),
          ...state.selectedQuestions.slice(action.payload.data + 1),
        ],
      };
    case types.FETCH_QUESTION_LIST_FILTERS_START:
      return {
        ...state,
        filterList: {},
      };
    case types.FETCH_QUESTION_LIST_FILTERS_SUCCESS:
      return {
        ...state,
        filterList: action.payload.data,
      };
    case types.QUESTION_LIST_FILTER_PASS:
      return {
        ...state,
        filter: action.payload.data,
      };
    case types.FETCH_INVITE_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
      };
    default:
      return state;
  }
};
