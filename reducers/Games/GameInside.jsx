import * as types from '../../constants/ActionTypes';
import * as questionTypes from '../../constants/QuestionTypes';

const initialState = {
  data: {
    questions: [],
    subjects: [],
    answer: [],
  },
  animatedSubjects: 0,
  subjectsIsAnimated: false,
  isLoading: true,
  currentQuestion: null,
  currentCategory: null,
  totalQuestions: null,
  categoriesVisible: true,
  endGame: false,
  choosenCategory: null,
  passList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GAME_PLAY_START:
      return state;
    case types.FETCH_GAME_PLAY_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case types.ANIMATE_GAME_CATEGORIES:
      return {
        ...state,
        animatedSubjects: state.animatedSubjects + 1,
      };
    case types.ANIMATE_GAME_CATEGORIES_END:
      return {
        ...state,
        subjectsIsAnimated: true,
      };
    case types.CHOOSE_GAME_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload.category,
      };
    case types.TOGGLE_CATEGORIES_VISIBILITY:
      return {
        ...state,
        categoriesVisible: !state.categoriesVisible,
      };
    case types.SEND_NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload.data,
      };
    case types.REPLACE_ANSWER_OPTION:
      return {
        ...state,
        data: {
          questions: state.data.questions,
          subjects: state.data.subjects,
          answer: action.payload.data,
        },
      };
    default: {
      return state;
    }
  }
};
