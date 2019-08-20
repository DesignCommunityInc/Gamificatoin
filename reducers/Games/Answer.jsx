import * as types from '../../constants/ActionTypes';

const initialState = {
  passedAnswers: [],
  isItPossibleToAnswer: false,
  isItPossibleToReplace: false,
  isOptionFocused: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.THROW_ANSWER_OPTION:
      return {
        ...state,
        passedAnswers:
        state.passedAnswers.concat(action.payload.data),
      };
    case types.REMOVE_ANSWER_OPTION:
      return {
        ...state,
        passedAnswers: [],
      };
    case types.SET_OPTION_FOCUSED:
      return {
        ...state,
        isOptionFocused: action.payload.data,
      };
    case types.SET_ANSWER_POSSIBILITY:
      return {
        ...state,
        isItPossibleToAnswer: action.payload.data,
      };
    case types.SET_REPLACE_POSSIBILITY:
      return {
        ...state,
        isItPossibleToReplace: action.payload.data,
      };
    default: return state;
  }
};
