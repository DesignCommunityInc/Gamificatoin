import * as types from '../../../../constants/ActionTypes';

export const removeAnswers = () => dispatch => dispatch({
  type: types.REMOVE_ANSWER_OPTION,
});

export const setAnswerPossibility = possibility => dispatch => dispatch({
  type: types.SET_ANSWER_POSSIBILITY,
  payload: { data: possibility },
});
